import React, { useState, useEffect } from 'react';
import { MenuItem, Grid, Button, FormGroup, FormHelperText } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Form, Field} from 'react-final-form';
import {TextField} from 'final-form-material-ui';
import { Select } from 'final-form-material-ui';
import ClientsService from '../../services/ClientsService';
import ClientModel from '../../models/ClientModel';
import regiones from '../../utils/RegionesService.json';
import LoadingComponent from '../loading/LoadingComponent';
import AuthenticationService from '../../services/AuthenticationService';

const clientsService = new ClientsService();
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

function UpdateClientComponent(props){
    const classes = useStyles();
    const [success, setSuccess] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [regionSelected, setRegionSelected] = useState(undefined);
    const [client, setClient] = useState();
    const [state, setState] = useState({
        isLoading: true,
        hasErrors: false,
        error: ''
    });

    useEffect( () => {
        clientsService.getClientById(authenticationService.getUserId())
            .then(resp => {
                resp = resp.data;
                if(resp.status === 'ERROR' || resp.status === 'FATAL'){
                    setState({isLoading: false, hasErrors: true, error: resp.error});
                }
                if(resp.status === 'OK'){
                    setClient(resp.data);
                    setState({isLoading: false, hasErrors: false});
                }
            })
            .catch(err => {
                setState({isLoading: false, hasErrors:true, error: 'Ocurrió un error al conectar con el servidor'});
            });
        
        
    }, []);
    
    const onSubmit = async form => {
        setIsSubmitting(true);
        if(form.name === client.cli_nombre && form.nickname === client.cli_alias && form.region === client.cli_region && form.city === client.cli_ciudad && client.cli_nacimiento === form.birthdate){
            const resp = await 0;
            setSuccess("No se han realizado cambios");
            setIsSubmitting(resp);
        }else{
            const client = new ClientModel(authenticationService.getUserId(), null, form.name, form.nickname? form.nickname: null , form.region, form.city, form.birthdate, null);
            const resp = await clientsService.updateClient(client);
            if( resp.status === 'ERROR' || resp.status === 'FATAL'){
                setSuccess(resp.error);
            }
            if( resp.status === 'OK'){
                setSuccess(resp.data);
            }
            setIsSubmitting(false);
        }
    }
    
    const required = value => (value ? undefined : 'Este campo es requerido');
    const email = value => ( value.match(/[a-zA-Z0-9]@/) ? undefined: 'El correo ingresado no es válido' );
    const alphanumeric = value => ( value.match(/^[a-z\d\-_\s]+$/i) ? undefined: 'Debe ingresar sólo números y letras');
    const minLength = min => value => value.length < min ? `Debe ingresar al menos ${min} caracteres`: undefined;
    const maxLength = max => value => value.length > max ? `El límite de caracteres es de ${max}`: undefined;
    const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);
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
            

            {state.isLoading ? <LoadingComponent/>:null}
            {state.isLoading || state.hasErrors ? <p>{state.error}</p>:
            
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
                                            validate={composeValidators(required, email, minLength(10), maxLength(40))}
                                            name="email"
                                            type="text"
                                            defaultValue={authenticationService.getUser().email}
                                            component={TextField}
                                            label="Correo electronico"
                                            margin="dense"
                                            fullWidth
                                            disabled
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
                                            defaultValue={client.cli_nombre}
                                            margin="dense"
                                            fullWidth
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
                                            name="nickname"
                                            type="text"
                                            defaultValue={client.cli_alias}
                                            component={TextField}
                                            label="Alias"
                                            margin="dense"
                                            fullWidth
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
                                            validate={composeValidators(required, validateDate)}
                                            name="birthdate"
                                            type="date"
                                            component={TextField}
                                            label="Fecha de nacimiento"
                                            defaultValue={client.cli_nacimiento}
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
                                    defaultValue={client.cli_region}
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
                                    defaultValue={client.cli_ciudad}
                                    label="Seleccione comuna"
                                    component={Select}
                                >
                                {regionSelected?regionSelected.map( (comuna, index) => (
                                    <MenuItem key={index} value={comuna}>{comuna}</MenuItem>
                                )):<MenuItem value=''>Seleccione una región...</MenuItem>}                        
                                </Field>
                            </FormGroup>
                        </Grid>   
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                {success?<FormHelperText style={{ fontSize: 14 ,textAlign: "center", margin: 10, color: "red"}}>{success}</FormHelperText>:''}
                                <Button disabled={submitting || invalid} type="submit" variant="contained" size="large" color="primary">
                                    Actualizar datos
                                    {isSubmitting ? <CircularProgress style={{marginLeft:10}} size={18} />  :  <ChevronRightIcon/>}    
                                </Button> 
                            </FormGroup>
                        </Grid>
                    </Grid>
                </form>)}
            />}
        </div>
    );
    


    
}
export default UpdateClientComponent;