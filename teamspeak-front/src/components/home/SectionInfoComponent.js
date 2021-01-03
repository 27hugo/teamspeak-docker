import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScrollAnimation from 'react-animate-on-scroll';
const useStyles = makeStyles(theme => ({
    section:{
        marginTop: 25,
        paddingTop: 20,
        paddingBottom: 20
    },

  }));
function SectionInfoComponent(){
    const classes = useStyles();
    return(

            <Grid id="info" className={classes.section} item xs={11} sm={10} md={9} lg={7}>
                <div>
                    <Typography variant="h6">Dirección IP TS3: owc.cl</Typography>                   
                    <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInRight">
                    <div style={{marginTop: 30}}>
                        <Typography variant="h4">Canales gratuitos para usuarios nuevos</Typography>
                        <Typography variant="subtitle1">* Para poder crear canales debes iniciar sesión, es <b>gratis</b>!.</Typography>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                    <div style={{marginTop: 10}}>                
                        <p className="lead">En nuestro servidor de <b>teamspeak 3</b> puedes crear tus canales sin ningún costo, sólo necesitas <b>registrarte</b> en nuestra página 
                        en el siguiente <i>enlace</i>. Cada usua    rio puede crear hasta 3 canales, si necesitas algún canal extra puedes solicitarlo
                        con algun admin o soporte que se encuente conectado en el servidor.</p>
                    </div>
                    </ScrollAnimation>
                </div>
            
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                <div style={{marginTop: 30}}>
                    <Typography variant="h5">Reglas para usuarios</Typography>
                    <div style={{marginTop: 10}}>
                        <p>
                            <i>Se prohibe spamear chat.</i><br/>
                            Cualquier spameo publicitando otros servidores en el chat privado o bien en el chat general, será motivo de ban.
                        </p>
                        <p style={{marginTop: 15}}>
                            <i>Uso indebido de privilegios.</i><br/>
                            Para los usuarios con permisos dentro del servidor, ante cualquier reporte se revisará el caso de un uso indebido y se procederá a banear al usuario.
                        </p>
                    </div>
                </div>
                </ScrollAnimation>
            
            </Grid>

    );
}

export default SectionInfoComponent;