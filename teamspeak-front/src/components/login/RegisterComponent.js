import React, { useState } from 'react';
import { MenuItem, Grid, Button, FormGroup, FormHelperText } from '@material-ui/core';
import {Link} from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import LoginModel from '../../models/LoginModel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Form, Field} from 'react-final-form';
import {TextField} from 'final-form-material-ui';
import { Select } from 'final-form-material-ui';
import AuthenticationService from '../../services/AuthenticationService';
import ClientModel from '../../models/ClientModel';
import regiones from '../../utils/RegionesService.json';
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

function RegisterComponent(){
    const classes = useStyles();
    const [success, setSuccess] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [regionSelected, setRegionSelected] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    
    const onSubmit = async form => {
        setIsSubmitting(true);
        const login = new LoginModel(null, form.email.toLowerCase(), form.password, null, null, null, null);
        const client = new ClientModel(null, null, form.name, form.nickname? form.nickname: null , form.region, form.city, form.birthdate, null);
        const model = {...login, ...client};
        const resp = await authenticationService.register(model);
        if(resp.status === 'ERROR' || resp.status === 'FATAL' ){
          setSuccess(resp.error);
        }else if(resp.status === 'OK'){
          setSuccess(resp.data);
        }else{
          setSuccess(false);
        }
        setIsSubmitting(false);

    }

    const required = value => (value ? undefined : 'Este campo es requerido');
    const email = value => ( value.match(/[a-zA-Z0-9]@/) ? undefined: 'El correo ingresado no es válido' );
    const alphanumeric = value => ( value.match(/^[a-z\d\-_\s]+$/i) ? undefined: 'Debe ingresar sólo números y letras');
    const minLength = min => value => value.length < min ? `Debe ingresar al menos ${min} caracteres`: undefined;
    const maxLength = max => value => value.length > max ? `El límite de caracteres es de ${max}`: undefined;
    const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);
    const setFormPassword = value => setPassword(value);
    const passwordMatch = pass => pass === password ? undefined : 'Las contraseñas no coinciden';
    const validateDate = date => (date <= '1960-12-01') ? 'Debe indicar una fecha válida' : undefined;
    
    const selectRegion = region => {
        regiones.regiones.forEach( reg => {
            if(reg.region === region){
                setRegionSelected(reg.comunas);
            }
        });
    };

    return(
        <div className={classes.root}>
            <Form    
                onSubmit={onSubmit}
                render={({ handleSubmit, onChange, reset, submitting, pristine, invalid, value, values }) => (
                <form onSubmit={handleSubmit} >      
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, email, minLength(10), maxLength(40))}
                                            name="email"
                                            type="text"
                                            component={TextField}
                                            label="Ingrese su correo electronico"
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
                        <Grid item xs={12} sm={4}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, alphanumeric, minLength(3), maxLength(20))}
                                            name="name"
                                            type="text"
                                            component={TextField}
                                            label="Nombre"
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
                        <Grid item xs={6} sm={4}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            name="nickname"
                                            type="text"
                                            component={TextField}
                                            label="Alias"
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
                        <Grid item xs={6} sm={4}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, validateDate)}
                                            name="birthdate"
                                            type="date"
                                            component={TextField}
                                            label="Fecha de nacimiento"
                                            defaultValue="1960-12-01"
                                            margin="dense"
                                            fullWidth
                                        />   
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                    )}
                                </Field>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Field
                                    validate={composeValidators(required, selectRegion)}
                                    name="region"
                                    label="Seleccione región"
                                    component={Select}
                                >
                                {regiones.regiones.map( (region, index) => (
                                    <MenuItem key={index} value={region.region}>{region.region}</MenuItem>
                                ))}                                
                                </Field>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Field
                                    validate={required}
                                    name="city"
                                    label="Seleccione comuna"
                                    component={Select}
                                >
                                {regionSelected?regionSelected.map( (comuna, index) => (
                                    <MenuItem key={index} value={comuna}>{comuna}</MenuItem>
                                )):<MenuItem value=''>Seleccione una región...</MenuItem>}                        
                                </Field>
                            </FormGroup>
                        </Grid>   
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Field>
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, alphanumeric, setFormPassword, minLength(6), maxLength(12))}
                                            name="password"
                                            type="password"
                                            component={TextField}
                                            label="Ingrese su contraseña"
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
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Field >
                                    {({ meta }) => (
                                    <div>
                                        <Field
                                            validate={composeValidators(required, alphanumeric, passwordMatch, minLength(6), maxLength(12))}
                                            name="repeatPassword"
                                            type="password"
                                            component={TextField}
                                            label="Repita su contraseña"
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
                        <Grid style={{textAlign: "left" }} item xs={12} sm={12}>
                        <label style={{color: "#000"}}>
                            <Field  name="acceptTerms" component="input" validate={required} type="checkbox" value={value} />
                            Acepto los <Link  to={'/terminos'} target="_blank">términos y condiciones.</Link>
                        </label>
                        
                            
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                {success?<FormHelperText style={{ fontSize: 14 ,textAlign: "center", margin: 10, color: "red"}}>{success}</FormHelperText>:''}
                                <Button disabled={submitting || invalid} type="submit" variant="contained" size="large" color="primary">
                                    Registrarse
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
export default RegisterComponent;