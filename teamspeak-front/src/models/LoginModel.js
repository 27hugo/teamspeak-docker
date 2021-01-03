export default class LoginModel{
    constructor(log_cli_id, log_correo, log_contrasena, log_token, log_ultima_conexion, log_conexion_ip, log_tipo){
        this.log_cli_id = log_cli_id;
        this.log_correo = log_correo;
        this.log_contrasena = log_contrasena;
        this.log_token = log_token;
        this.log_ultima_conexion = log_ultima_conexion;
        this.log_conexion_ip = log_conexion_ip;
        this.log_tipo = log_tipo;
    }
}