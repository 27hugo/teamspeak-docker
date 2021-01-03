import React, {useEffect} from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QueueIcon from '@material-ui/icons/Queue';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ClientChannelsComponent from '../clients/ClientChannelsComponent';
import ChannelCreateComponent from '../channels/ChannelCreateComponent';
import UpdateClientComponent from '../clients/UpdateClientComponent';
import ChangePasswordComponent from '../clients/ChangePasswordComponent';
import DashboardComponent from './DashboardComponent';
import GridList from '@material-ui/core/GridList';
import Box from '@material-ui/core/Box';
import AuthenticationService from '../../services/AuthenticationService';
const authenticationService = new AuthenticationService();

const useStyles = makeStyles(theme => ({
    gridList: {
      minWidth:"100%",
      flexWrap: 'nowrap',
      position: "fixed",
      bottom: 0,
      backgroundColor: "black",
      zIndex: 999,
        textAlign: "center",
        justifyContent: "center"
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      //transform: 'translateZ(0)',
    },
    
  }));


function AdminComponent(props){    
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const classes = useStyles();

    useEffect( () => {
        if ( !authenticationService.isLogged() ) { 
            document.location.href='/';
            return null;
        }
    
    });
    const logout = () => {
        authenticationService.logout();
      };
    function handleListItemClick(event, index) {
      setSelectedIndex(index);
    }
    return(
        <Grid style={{minHeight: "80vh"}} container>
            <Grid style={{backgroundColor: "#000020", color: "white", borderTop: "1px solid #333", borderBottom: "1px solid #333"}} item sm={false} md={4} lg={2}>
            <Box display={{ xs: 'none', md: 'block' }}>    
            <List component="nav" aria-label="main mailbox folders">
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={event => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <DashboardIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <QueueIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Crear canal" />
                </ListItem>
                
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={event => handleListItemClick(event, 3)}
                >
                    <ListItemIcon>
                        <FormatListBulletedIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Revisar canales" />
                </ListItem>
                
                <ListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={event => handleListItemClick(event, 4)}
                >
                    <ListItemIcon>
                        <PersonIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Actualizar mis datos" />
                </ListItem>

                <ListItem
                    button
                    selected={selectedIndex === 5}
                    onClick={event => handleListItemClick(event, 5)}
                >
                    <ListItemIcon>
                        <VpnKeyIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Cambiar contraseña" />
                </ListItem>

                <ListItem
                    button
                    selected={selectedIndex === 6}
                    onClick={event => handleListItemClick(event, 6)}
                >
                    <ListItemIcon>
                        <ExitToAppIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText onClick={logout} primary="Cerrar sesión" />
                </ListItem>

                </List>
                </Box>


                <Box display={{ xs: 'block', sm: 'block' , md: 'none' }}>
                <GridList className={classes.gridList} >
                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 1}
                    onClick={event => handleListItemClick(event, 1)}
                >
                        <DashboardIcon color="secondary" />
                </ListItem>
                
                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}
                >
                        <QueueIcon color="secondary" />
                </ListItem>
                
                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 3}
                    onClick={event => handleListItemClick(event, 3)}
                >
                        <FormatListBulletedIcon color="secondary" />
                </ListItem>
                
                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 4}
                    onClick={event => handleListItemClick(event, 4)}
                >
                        <PersonIcon color="secondary" />
                </ListItem>

                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 5}
                    onClick={event => handleListItemClick(event, 5)}
                >
                        <VpnKeyIcon color="secondary" />
                   
                </ListItem>

                <ListItem
                    button
                    style={{justifyContent:"center", height: "100px"}}
                    selected={selectedIndex === 6}
                    onClick={logout}
                >
                        <ExitToAppIcon color="secondary" />
                  
                </ListItem>
      </GridList>

                </Box>


            </Grid>
            <Grid style={{backgroundColor: "#fff"}} item xs={12} sm={12} md={8} lg={10} >
                <div style={{ backgroundColor: "#fff", paddingTop: 15, paddingBottom: "90px"}}>
                {selectedIndex === 1 && (<DashboardComponent/>)}
                
                {selectedIndex === 2 && (
                    <div>
                    <Grid style={{padding:15}}>
                    <Typography variant="h6">
                <QueueIcon style={{fontSize: 55, marginRight: 15}} /> Crear canal teamspeak
            </Typography>
        <Typography variant="caption">
            El limite de canales que puedes tener activos es de 3 canales, puedes editarlos, o bien,
            eliminarlos y crearlos nuevamente. Es necesario que te encuentres conectado en el servidor.
        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                    <ChannelCreateComponent />
                    </Grid>
                    </div>
                )}
                
                {selectedIndex === 3 && (
                    <div>
                    <Grid style={{padding:15}}>
                    <Typography variant="h6">
                    <FormatListBulletedIcon style={{fontSize: 55, marginRight: 15}} />Canales creados
                </Typography>
            <Typography variant="caption">
                Aquí aparecerán los canales que tengas activos en el servidor. Recuerda que
                sólo puedes crear hasta 3 canales a la vez.
            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={6} lg={4}>
                    <ClientChannelsComponent/>
                    </Grid>
                    </div>
                )}
                
                {selectedIndex === 4 && (
                    <div>
                    <Grid style={{padding:15}}>
                    <Typography variant="h6">
                    <PersonIcon style={{fontSize: 55, marginRight: 15}}/>Actualizar datos personales
            </Typography>
        <Typography variant="caption">
            Aquí puedes actualizar información relacionada con tus datos personales
        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={7}>
                    <UpdateClientComponent/>
                    </Grid>
                    </div>
                )}
                
                {selectedIndex === 5 && (
                    <div>
                    <Grid style={{padding:15}}>
                    <Typography variant="h6">
                <VpnKeyIcon style={{fontSize: 55, marginRight: 15}}/>Cambiar contraseña de la cuenta
            </Typography>
        <Typography variant="caption">
            Ingresa la nueva contraseña que deseas. Una vez cambiada la contraseña, la sesión se cerrará
            automáticamente, por lo que deberás iniciar sesión nuevamente.
        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                    <ChangePasswordComponent/>
                    </Grid>
                    </div>
                )}
                </div>
            </Grid>
            
        </Grid>
   
    );
}
export default AdminComponent;