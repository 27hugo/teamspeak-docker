import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import ClientsService from '../../services/ClientsService';
import { Grid } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AuthenticationService from '../../services/AuthenticationService';
const authenticationService = new AuthenticationService();
const clientsService = new ClientsService();

const useStyles = makeStyles(theme => ({
  root: {
    padding: 15
  },
  gridcard:{
    margin: theme.spacing(0)
  },
  card: {
    margin: theme.spacing(1),
    marginBottom: 20,
    //maxWidth: 600
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    minHeight: 60,
    minWidth: 60,
    backgroundColor: "lightblue",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [lastConnections, setLastConnections] = useState(null);
  const [totalClients , setTotalClients] = useState(null);
  const [loginsPerMonth, setLoginsPerMonth] = useState(null);

  useEffect( () => {
    clientsService.getLastConnections(authenticationService.getUserId()).then( resp => {
      resp = resp.data;
      if( resp.status === 'ERROR' || resp.status === 'FATAL'){
        console.log(resp.error);
      }
      if( resp.status === 'OK'){
        const fechas = [];
        resp.data.forEach( f=> {
          const fecha = new Date(f.his_log_ultima_conexion);
          fechas.push(fecha.toLocaleString('es-CL'));
        });
        setLastConnections(fechas);
      }
    });

    clientsService.getLoginsPerMonth().then( resp => {
      console.log(resp);
      if(resp.data.status === 'OK'){
        setLoginsPerMonth(resp.data.data);
      }
    });

    clientsService.getTotalClients().then( resp => {
      if(resp.data.status === 'OK'){
        setTotalClients(resp.data.data);
      }
    });


  }, []);


  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item style={{marginBottom: 30}} lg={12}>
      <Typography variant="h6">
      <DashboardIcon style={{fontSize: 55, marginRight: 15}}/>Dashboard
      </Typography>
      <Typography variant="subtitle1">
        Bienvenido {authenticationService.getUser().alias ? authenticationService.getUser().alias : authenticationService.getUser().nombre},
        aquí podrás gestionar la información de tu cuenta y<br/>administrar tus canales en el servidor de teamspeak.
      </Typography>
    </Grid>
    <Grid className={classes.gridcard} item xs={11} sm={5} md={5} lg={3}>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AddToHomeScreenIcon />
          </Avatar>
        }
        title="Actividad reciente"
        subheader="5 últimos inicios de sesión"
      />
      <CardContent>

            {lastConnections && lastConnections.map( (lastConnection, i) => (
              <Typography key={i} align="center" variant="body2" color="textSecondary">
                {lastConnection}<br/>
              </Typography>
              
            ))}
      </CardContent>
      </Card>
              </Grid>
      <Grid className={classes.gridcard} item xs={11} sm={5} md={5} lg={3}>
      <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {totalClients ? totalClients : 0}
          </Avatar>
        }
        title="Clientes Registrados"
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Se han registrado {totalClients ? totalClients : 0} usuarios en la plataforma
        </Typography>
      </CardContent>
      </Card>
        </Grid>


        <Grid className={classes.gridcard} item xs={11} sm={5} md={5} lg={3}>
      <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {loginsPerMonth ? loginsPerMonth : 0}
          </Avatar>
        }
        title="Cantidad de logueos"
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Este mes se han registrado {loginsPerMonth ? loginsPerMonth : 0} inicios de sesión en la plataforma.
        </Typography>
      </CardContent>
      </Card>
        </Grid>

        
    </Grid>
  );
}