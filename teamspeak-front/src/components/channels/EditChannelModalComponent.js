import React, { useState } from 'react';
import {  Button, FormGroup, Typography } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {Form, Field} from 'react-final-form';
import {TextField} from 'final-form-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
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
    hide:{
        display: "none"
    },
    circular: {
        padding: 0,
        fontSize: 0,
    },
    
    buttonIcon:{
        marginRight: 10 
    }
    
}));


function EditChannelModalComponent(props) {
    const [show, setShow] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const classes = useStyles();

    const required = value => (value ? undefined : 'Este campo es requerido');
    const alphanumeric = value => ( value.match(/^[a-z\d\-_\s]+$/i) ? undefined: 'Debe ingresar sólo números y letras');
    const minLength = min => value => value.length < min ? `Debe ingresar al menos ${min} caracteres`: undefined;
    const maxLength = max => value => value.length > max ? `El límite de caracteres es de ${max}`: undefined;
    
    const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

    const handleChange = (event) => {
        setHasChanged(true);
    };



  
    return (
      <>
         <Tooltip className={classes.buttonIcon} title="Editar">
            <IconButton disabled={props.submitting.state && props.submitting.index === props.index ? true : false} onClick={handleShow} edge="end">
            { props.submitting.state && props.submitting.index === props.index ? <CircularProgress color="primary" className={classes.circular} size={22} /> : <EditIcon />}
            </IconButton>
        </Tooltip> 
  
        <Modal className={classes.modal}  show={show} onHide={handleClose}>
          <Modal.Header className={classes.modalheader} closeButton>
            <Typography variant="h5">
                Editar canal
            </Typography>
          </Modal.Header>
          <Modal.Body className={classes.modalbody}>
          <Typography style={{paddingBottom: 15}} variant="body1">
              Aquí puedes editar los datos de tu canal.
          </Typography>
          <Form
            className={classes.form}
        
            onSubmit={props.handleEdit}
            render={({ handleSubmit, reset, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit} onChange={handleChange} >
                <FormGroup className={classes.hide}>
                    <Field>
                        {({ meta }) => (
                        <div>
                            <Field
                                name="index"
                                type="text"
                                component={TextField}
                                
                                defaultValue={props.index}
                            />   
                        </div>
                        )}
                    </Field>
                </FormGroup>
                <FormGroup className={classes.hide}>
                    <Field>
                        {({ meta }) => (
                        <div>
                            <Field
                                name="can_id"
                                type="text"
                                component={TextField}
                                
                                defaultValue={props.channel.can_id}
                            />   
                        </div>
                        )}
                    </Field>
                </FormGroup>
                <FormGroup>
                    <Field>
                        {({ meta }) => (
                        <div>
                            <Field
                                validate={composeValidators(required, alphanumeric, minLength(3), maxLength(20))}
                                name="name"
                                type="text"
                                component={TextField}
                                label="Nombre del canal"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                
                                defaultValue={props.channel.can_nombre}
                            />   
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                </FormGroup>
                <FormGroup className={classes.formControl}>
                    <Field>
                        {({ meta }) => (
                        <div>
                            <Field
                                validate={composeValidators(required, minLength(4), maxLength(12))}
                                name="password"
                                type="password"
                                component={TextField}
                                label="Contraseña del canal"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                defaultValue={props.channel.can_contrasena}
                            />   
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                </FormGroup>
            
                <Button disabled={submitting || pristine || invalid || !hasChanged} type="submit" variant="contained" size="large" color="primary"
                onClick={() => {handleClose(); props.setSubmitting({state: true, index: props.index});}}
                >
                    Guardar cambios
                </Button>
            </form>
            )}
        />

        
          </Modal.Body>
          
          
          <Modal.Footer className={classes.modalfooter}>
            
            <Button onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default EditChannelModalComponent;