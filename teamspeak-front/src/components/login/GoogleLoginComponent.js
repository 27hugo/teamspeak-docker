import React from 'react';
import { GoogleLogin } from 'react-google-login';
 
function GoogleLoginComponent(){
    
    const responseGoogle = (response) => {
        console.log(response);
    }
       
    return(
        <GoogleLogin
          clientId="810046074401-ec8umm710qasg0a2c3kvs9vp2dg8voa1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
    );
}
 export default GoogleLoginComponent;