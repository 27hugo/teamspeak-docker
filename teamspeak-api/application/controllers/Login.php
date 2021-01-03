<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';


class Login extends REST_Controller{

    private $connection_client_ip;
    
    public function __construct(){
        

        parent::__construct();
        $this->connection_client_ip = $_SERVER['REMOTE_ADDR'];
        $this->load->model('login_model');
        $this->load->model('clients_model');
        $this->load->library('AuthorizationToken');
        $this->load->library('encryption');
        $this->load->library('Reply');
        $this->encryption->initialize( array(
            'driver' => 'openssl',
            'cipher' => 'aes-256',
            'mode'   => 'ecb'
        ));
    }
    
    public function index_post(){
        
        $client = array(
            'log_correo' => $this->post('log_correo'),
            'log_contrasena' => $this->encryption->encrypt($this->post('log_contrasena')),
            'log_conexion_ip' => $this->connection_client_ip
        );
        if( $client['log_correo'] == null){
            $this->response( $this->reply->error('falta log_correo'), REST_Controller::HTTP_OK );

        }else if( $client['log_contrasena'] == null){
            $this->response( $this->reply->error('falta log_contrasena') , REST_Controller::HTTP_OK );
        
        }
        try{
            $client = $this->login_model->validateClient( $client );
            $this->CI =& get_instance();
            $this->CI->load->config('jwt');
            $this->token_expire_time = $this->CI->config->item('jwt_expire_time');
            $tokenpayload['id'] = $client->log_cli_id;
            $tokenpayload['nombre'] = $this->clients_model->get($client->log_cli_id)->cli_nombre;
            $tokenpayload['alias'] = $this->clients_model->get($client->log_cli_id)->cli_alias;
            $tokenpayload['email'] = $client->log_correo; 
            $tokenpayload['tipo'] = $client->log_tipo;
            $tokenpayload['exp'] = time() + $this->token_expire_time;
            $tokenpayload['iat'] = time();
            $token = $this->authorizationtoken->generateToken( $tokenpayload );
            $this->response( $this->reply->ok( $token ), REST_Controller::HTTP_OK);
        }catch(Exception $e){
            $this->response( $this->reply->error( $e->getMessage() ), REST_Controller::HTTP_OK);
        }
    }

    public function changePassword_put(){
        //cumple con todos lo necesario para cambiar la contraseña

        if( $this->put('log_cli_id') == null ){
            $this->response( $this->reply->error('falta log_cli_id') , REST_Controller::HTTP_OK);
        
        }else if( $this->put('log_contrasena') == null ){
            $this->response( $this->reply->error('falta log_contrasena'), REST_Controller::HTTP_OK);
        }
        
        $client = array(
            'log_cli_id' =>$this->put('log_cli_id'),
            'log_contrasena' => $this->encryption->encrypt($this->put('log_contrasena'))
        );
       
        
        try{
            $this->login_model->updatePassword( $client );
            $this->response( $this->reply->ok('Contraseña actualizada con éxito') , REST_Controller::HTTP_OK);
        }catch(Exception $e){
            log_message('error', $e->getMessage());
            $this->response( $this->reply->fatal($e->getMessage()) , REST_Controller::HTTP_OK);
        }
    }

    public function register_post(){

        //cumple con todos lo necesario para registrarse con los datos necesarios

        $client = array(
            'cli_nombre' => $this->post('cli_nombre'),
            'cli_alias'  => $this->post('cli_alias'),
            'cli_region' => $this->post('cli_region'),
            'cli_ciudad' => $this->post('cli_ciudad'),
            'cli_nacimiento' => $this->post('cli_nacimiento')
        );
        $login = array(
            'log_correo' => $this->post('log_correo'),
            'log_contrasena' => $this->encryption->encrypt($this->post('log_contrasena')),
            'log_conexion_ip' => $this->connection_client_ip,
            'log_tipo' => 'user'
        );

        if( $client['cli_nombre'] == null ){
            $this->response( $this->reply->error('falta cli_nombre') , REST_Controller::HTTP_OK);
        
        }else if( $client['cli_region'] == null ){
            $this->response( $this->reply->error('falta cli_region') , REST_Controller::HTTP_OK);
        
        }else if( $client['cli_ciudad'] == null ){
            $this->response( $this->reply->error('falta cli_ciudad') , REST_Controller::HTTP_OK);
        
        }else if( $client['cli_nacimiento'] == null ){
            $this->response( $this->reply->error('falta cli_nacimiento') , REST_Controller::HTTP_OK);
        
        }else if( $login['log_correo'] == null ){
            $this->response( $this->reply->error('falta log_correo') , REST_Controller::HTTP_OK);
        
        }else if( $this->post('log_contrasena') == null ){
            $this->response( $this->reply->error('falta log_contrasena') , REST_Controller::HTTP_OK);
        }

        try{
            $this->login_model->registerClient( $client, $login );
            $this->response( $this->reply->ok('Registro completado con éxito') , REST_Controller::HTTP_OK );
        }catch(Exception $e){
            log_message('error', $e->getMessage());
            $this->response( $this->reply->fatal($e->getMessage()) , REST_Controller::HTTP_OK);
        }
    }

}
