import React, { useState } from 'react';
import {  Button, Typography, CircularProgress } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root:{
        padding:15
    },
    form: {
        margin: 20,
    },
    formControl: {
        padding: 0,
        marginTop: 5,
        marginBottom: 5
    },
    modal:{
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    
    modalheader:{
        border: 1,
        color: "#000",
        backgroundColor: "#fff",
    },
    modalbody:{
        padding: 20,
        color: "#000",
        backgroundColor: "#fff",
    },
    modalfooter:{
        border: 0,
        backgroundColor: "#fff",
    },
    circular: {
        padding: 0,
        fontSize: 0,
    }
}));


function DeleteChannelModalComponent(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const classes = useStyles();
      
    return (
      <>
        <Tooltip title="Eliminar">
            <IconButton disabled={props.submitting.state && props.submitting.index === props.index ? true : false} onClick={handleShow} edge="end">
            { props.submitting.state && props.submitting.index === props.index ? <CircularProgress color="secondary" className={classes.circular} size={22} /> : <DeleteIcon />}
            </IconButton>
        </Tooltip>   
  
        <Modal className={classes.modal}  show={show} onHide={handleClose}>
          <Modal.Header className={classes.modalheader} closeButton>
            <Typography variant="h5">
                Eliminar canal
            </Typography>
          </Modal.Header>
          <Modal.Body className={classes.modalbody}>
          <Typography style={{paddingBottom: 15}} variant="body1">
              ¿Estás seguro de que quieres eliminar el canal <i><b>{props.channel.can_nombre}</b></i>?
          </Typography>

        
          </Modal.Body>
          
          
          <Modal.Footer className={classes.modalfooter}>
          <Button variant="contained" color="secondary" onClick={() => {handleClose(); props.onDelete(props.channel, props.index); props.setSubmitting({state: true, index: props.index});}}>
              Eliminar
            </Button> 
            <Button onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default DeleteChannelModalComponent;