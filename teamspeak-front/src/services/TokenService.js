import jwt from 'jsonwebtoken';

export default class TokenService{
    validateTokenTime(){
        if( localStorage.getItem('logueado') ){
            var user = jwt.decode(localStorage.getItem('token'));
            var time = Math.floor(new Date().getTime() / 1000);
            /*console.log("Son las         "+time);
            console.log("Creado a las    "+user.iat);
            console.log("Expira a las    "+user.exp);
            console.log("Tiempo de token "+(user.exp-user.iat));*/
            if(time >= user.exp){
                console.log('el token expiró');
                localStorage.clear();
                document.location.href='/';
                document.location.reload();
            }
        }
    }
}