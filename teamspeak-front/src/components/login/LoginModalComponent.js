import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
const useStyles = makeStyles(theme => ({
    modal:{
        backgroundColor: "#120E29",
    },
    header:{
        border: 0,
        justifyContent:"center",
        textAlign: "center",
        backgroundColor: "#fff"
    },
    button:{
        color: "#e00",
        padding: 15,
        backgroundColor: "#E79039"
    },
    buttonpressed: {
        fontWeight: 700,
        color: "#fff",
        padding: 15,
        backgroundColor: "#E3692C   "
    },
    body: {
        justifyContent:"center",
        textAlign: "center",
        border: 0,
        backgroundColor: "#fff"
    },
    footer: {
        border: 0,
        borderRadius: 0,
        backgroundColor: "#fff"
    }
}));



function LoginModalComponent(){
    const classes = useStyles();
    const [register, setRegister] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
    
    <div>
     <Button variant="primary" onClick={handleShow}>
        Iniciar sesión
      </Button>

      <Modal centered backdrop="static" size="lg" className={classes.modal} show={show} onHide={handleClose}>
        <Grid className={classes.header} container>
            <Grid className={!register? classes.buttonpressed: classes.button} onClick={() => setRegister(false)} item xs={6}>INICIAR SESION</Grid>
            <Grid className={register? classes.buttonpressed : classes.button} onClick={() => setRegister(true)} item xs={6}>REGISTRARSE</Grid>  
          </Grid>
        <Grid container className={classes.body} >
            <Grid item xs={12} sm={register ? 11 : 8} md={register ? 10 : 6} lg={register ? 11 : 6}>
            {register ? <RegisterComponent/> : <div style={{marginTop:30, marginBottom: 20}}><LoginComponent/></div>}
            </Grid>
        </Grid>
        <Modal.Footer className={classes.footer}>
          <Button style={{borderRadius: 0}} variant="danger" onClick={handleClose}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
    );
    
}
export default LoginModalComponent;