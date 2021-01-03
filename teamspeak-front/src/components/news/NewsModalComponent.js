import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './NewsModalComponent.css';
const useStyles = makeStyles(theme => ({
    modal: {
      borderRadius: 0,
        background: 'rgba(0,0,0,0.7)'
    },
    header: {
      borderRadius: 0,
        color: "#fff",
        backgroundColor: "#120E29",
        border: 0,
    },
    body: {
      borderRadius: 0,
      color: "#fff",
      backgroundColor: "#120E29",
        padding: 20
    },
    footer: {
      borderRadius: 0,
      color: "#fff",
      backgroundColor: "#120E29",
        border: 0,
    }
}));

function LoginModalComponent(props){
  const [show, setShow] = useState(true);
  const classes = useStyles();
  const handleClose = () => setShow(false);
  return (
    <div>
      <Modal className={classes.modal} show={show} centered onHide={handleClose}>
        <Modal.Header className={classes.header} closeButton>
          <Modal.Title>Bienvenido a OWC</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.body}>
            <Typography variant="subtitle2">
                Puedes crear tus canales iniciando sesión. Si aún no tienes una cuenta puedes
                registrarte gratis.
            </Typography>
            <Typography style={{marginTop: 10}} variant="subtitle2">
                Si se presenta algún problema, agradecemos dejar un mensaje a algún admin disponible en el teamspeak
            </Typography>
        </Modal.Body>
        <Modal.Footer className={classes.footer}>
          <Button variant="primary" onClick={handleClose}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
      
    
}
export default LoginModalComponent;