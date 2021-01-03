import axios from 'axios';
import { config } from './ConfigService';
import jwt from 'jsonwebtoken';
export default class AuthenticationService{

    constructor(){
        this.token = localStorage.getItem('token');
    }

    login(login){
        return ( new Promise( resolve => {
            axios.post(config.apiurl + '/login', login, config.axios)
            .then( resp => {
                if(resp.data.status === 'OK'){
                    localStorage.setItem('token', resp.data.data);
                }
                resolve(resp.data);
            })
            .catch( err => {
                resolve({status: 'ERROR', error: 'Error al conectar con el servidor'});
            });
        }));
    }

    register(user){
        return ( new Promise( resolve => {
            axios.post(config.apiurl + '/login/register', user, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                resolve({status: 'ERROR', error: 'Error al conectar con el servidor'});
            });
        }));
    }

    changePassword(user){
        return ( new Promise( resolve => {
            axios.put(config.apiurl + '/login/changepassword', user, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                resolve({status: 'ERROR', error: 'Error al conectar con el servidor'});
            });
        }));
    }

    logout(){
        localStorage.clear();
        document.location.href='/';
    }

    getUser(){
        return jwt.decode(this.token);
    }

    getUserId(){
        return jwt.decode(this.token).id;
    }

    getToken(){
        return this.token;
    }

    isLogged(){
        return (this.token && this.validateTokenTime());
    }

    validateTokenTime(){
        const user = jwt.decode(this.token);
        const time = Math.floor(new Date().getTime() / 1000);
        if( time >= user.exp ){
            localStorage.clear();
            return false;
        }
        return true;
    }
}