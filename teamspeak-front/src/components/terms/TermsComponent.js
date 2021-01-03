import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScrollAnimation from 'react-animate-on-scroll';
const useStyles = makeStyles(theme => ({
    section:{
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom:50
    },

  }));
function TermsComponent(){
    const classes = useStyles();
    return(          
           <Grid container style={{padding: 50, marginTop: 50, marginBottom: 50}} justify="center"> 
            <Grid id="faq" className={classes.section} item xs={11} sm={10} md={9} lg={7}>
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInRight">
               <Typography variant="h5"><b>Términos y Condiciones</b></Typography>
               </ScrollAnimation>
               <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                <div style={{marginTop: 30}}>
                    <Typography variant="h6">
                        Uso de la plataforma
                        </Typography>
                    <Typography style={{marginTop: 10}} variant="subtitle1">
                        El uso de esta plataforma está destinada solamente a la automatización de las cuentas y canales creados en el servidor de Teamspeak 3 de OneWeonConnection.
                        Es por esto que se deja en claro que operaciones como crear, editar y revisar canales son las acciones posibles a realizar por los disitntos usuarios, cualquier
                        otro uso que se le de a la plataforma, no será responsabilidad de OWC. Adicionalmente se pueden ir agregando funciones a la plataforma pero todo en función y gestión
                        automática del servidor de teamspeak, sin tener relación alguna con manipular los datos personales para otros usos.
                    </Typography>
                </div>
                </ScrollAnimation>
                
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                <div style={{marginTop: 30}}>
                    <Typography variant="h6">
                        Privacidad de los usuarios
                    </Typography>
                    <Typography style={{marginTop: 10}} variant="subtitle1">
                        OneWeonConnection almacenará sus datos personales para generar estadísticas respecto al uso de la plataforma, para luego poder entregar posibles mejoras a partir de esto.
                        Es por esto que sus datos como la contraseña se encuentran cifrados, para evitar el uso malintencionado de estos en caso de robo de los datos. Se deja en claro que OneWeonConnection,
                        no se hace responsable por uso malintencionado de sus datos en manos de terceros, es de su propia responsabilidad utilizar contraseñas seguras y mantener sus datos de seguridad actualizados.  
                    </Typography>
                </div>
                </ScrollAnimation>
                
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                <div style={{marginTop: 30}}>
                    <Typography variant="h6">
                        Cuentas y seguridad
                    </Typography>
                    <Typography style={{marginTop: 10}} variant="subtitle1">
                        Para una mejor experiencia, se recomienda utilizar datos verídicos al momento de la creación de su cuenta, ya que de esto dependerá el poder recuperar su cuenta más 
                        adelante en caso de olvidar la contraseña. Se recomienda además utilizar contraseñas fáciles de recordar, ya que de momento la opción de recuperar la contraseña
                        se encuentra deshabilitada.
                    </Typography>
                </div>
                </ScrollAnimation>
            </Grid>
            </Grid>
      
    );
}

export default TermsComponent;