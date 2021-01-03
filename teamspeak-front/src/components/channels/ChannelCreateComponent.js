import React, { useState } from 'react';
import {  Button, FormGroup, FormHelperText } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import ChannelModel from '../../models/ChannelModel';
import {Form, Field} from 'react-final-form';
import {TextField} from 'final-form-material-ui';
import ChannelsService from '../../services/ChannelsService';
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthenticationService from '../../services/AuthenticationService';
const authenticationService = new AuthenticationService();

const useStyles = makeStyles(theme => ({
    root:{
        padding:15
    },
    formControl: {
        padding: 0,
        marginTop: 5,
        marginBottom: 5
    },
}));

function ChannelCreateComponent(props){    
    const classes = useStyles();
    const channelsService = new ChannelsService(); 
    const [success, setSuccess] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = async (values) => {
        setIsSubmitting(true);
        const channel = new ChannelModel(null, authenticationService.getUserId() , null, values.name, values.password, null, null);    
        let resp = await channelsService.createChannel(channel);
        console.log('respuestaserver',resp);
        if(resp.status === 'OK'){
            setSuccess('Canal creado exitosamente');
        }
        if(resp.status === 'ERROR' || resp.status === 'FATAL'){
            setSuccess(resp.error);
        }
        setIsSubmitting(false);
    }
    const required = value => (value ? undefined : 'Este campo es requerido');
    const alphanumeric = value => ( value.match(/^[a-z\d\-_\s]+$/i) ? undefined: 'Debe ingresar sólo números y letras');
    const minLength = min => value => value.length < min ? `Debe ingresar al menos ${min} caracteres`: undefined;
    const maxLength = max => value => value.length > max ? `El límite de caracteres es de ${max}`: undefined;
    
    const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);


    return(
        <div className={classes.root}>
            
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
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
                            />   
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                </FormGroup>
                {success?<FormHelperText style={{ fontSize: 14 ,textAlign: "center", margin: 10, color: "red"}}>{success}</FormHelperText>:null}
                <Button disabled={submitting || pristine || invalid} type="submit" variant="contained" size="large" color="primary">
                    Crear canal
                    {isSubmitting ? <CircularProgress style={{marginLeft:10}} size={18} />  :  <ChevronRightIcon/>}     
                </Button>
            </form>
            )}
        />
        </div>
    );
}
export default ChannelCreateComponent;