import React, { useState } from 'react';
import { Grid, Button, FormGroup, FormHelperText } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import {Form, Field} from 'react-final-form';
import {TextField} from 'final-form-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginModel from '../../models/LoginModel';
import AuthenticationService from '../../services/AuthenticationService';
const authenticationService = new AuthenticationService();
const useStyles = makeStyles(theme => ({
    formControl: {
        padding: 0,
        marginTop: 5,
        marginBottom: 5
    },
    root: {
        padding:15,
        flexGrow: 1,
      }
}));

function ChangePasswordComponent(){

    const [password, setPassword] = useState(undefined);
    
    const classes = useStyles();
    const [success, setSuccess] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = async form => {
        setIsSubmitting(true);
        const login = new LoginModel(authenticationService.getUserId(), form.email, form.password, null, null, null);
        const resp = await authenticationService.changePassword(login);
        if(resp.status === 'ERROR' || resp.status === 'FATAL'){
            setSuccess(resp.error);
        }
        if(resp.status === 'OK'){
            //setSuccess(resp.data);
            authenticationService.logout();
        }
        setIsSubmitting(false);
    }
    
    const required = value => (value ? undefined : 'Este campo es requerido');
    const alphanumeric = value => ( value.match(/^[a-z\d\-_\s]+$/i) ? undefined: 'Debe ingresar sólo números y letras');
    const minLength = min => value => value.length < min ? `Debe ingresar al menos ${min} caracteres`: undefined;
    const maxLength = max => value => value.length > max ? `El límite de caracteres es de ${max}`: undefined;
    const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);
    const setFormPassword = value => setPassword(value);
    const passwordMatch = pass => pass === password ? undefined : 'Las contraseñas no coinciden';
    
    

    return(
        <div className={classes.root}>

            
            <Form    
                onSubmit={onSubmit}
                render={({ handleSubmit, onChange, reset, submitting, pristine, invalid, value, values }) => (
                <form onSubmit={handleSubmit}>      
                    <Grid container spacing={3}>  
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, alphanumeric, setFormPassword, minLength(6), maxLength(12))}
                                            name="password"
                                            type="password"
                                            component={TextField}
                                            label="Ingrese su nueva contraseña"
                                            margin="dense"
                                            fullWidth
                                            autoComplete="off"
                                        />   
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                    )}
                                </Field>                                
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Field >
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, alphanumeric, passwordMatch, minLength(6), maxLength(12))}
                                            name="repeatPassword"
                                            type="password"
                                            component={TextField}
                                            label="Ingrese nuevamente la contraseña"
                                            margin="dense"
                                            fullWidth
                                            autoComplete="off"
                                        />   
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                    )}
                                </Field>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                {success?<FormHelperText style={{ fontSize: 14 ,textAlign: "center", margin: 10, color: "red"}}>{success}</FormHelperText>:''}
                                <Button disabled={submitting || invalid} type="submit" variant="contained" size="large" color="primary">
                                    Cambiar contraseña
                                    {isSubmitting ? <CircularProgress style={{marginLeft:10}} size={18} />  :  <ChevronRightIcon/>}     
                                </Button> 
                            </FormGroup>
                        </Grid>
                    </Grid>
                </form>)}
            />
        </div>
    );
    


    
}
export default ChangePasswordComponent;