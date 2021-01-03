import React, { useState, useEffect } from 'react';
import ChannelsService from '../../services/ChannelsService';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import LoadingComponent from '../loading/LoadingComponent';
import AuthenticationService from '../../services/AuthenticationService';
import EditChannelModalComponent from '../channels/EditChannelModalComponent';
import DeleteChannelModalComponent from '../channels/DeleteChannelModalComponent';
import ChannelModel from '../../models/ChannelModel';
const authenticationService = new AuthenticationService();
const channelsService = new ChannelsService();
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      //padding: 15
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(2, 2, 0),
    },
    progress: {
        margin: theme.spacing(2),
      },
    typography: {
        padding: theme.spacing(2),
    },
  }));


function ClientChannelsComponent(props){
    
    const classes = useStyles();
    const [canales, setCanales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState({state: false, index: null});
    const [submittingEdit, setSubmittingEdit] = useState({state: false, index: null});
    
    const [deleteError, setDeleteError] = useState({
        state: false,
        error: ''
    });
    const [editError, setEditError] = useState({
        state: false,
        error: ''
    });
  
    useEffect( () => {   
        if(authenticationService.isLogged()){  
                channelsService.getChannelsByCliId( authenticationService.getUserId() )
                .then( canales => {
                    setCanales(canales.data.data);
                    setLoading(false);
                });
        }else{
            setLoading(false);
        }
    }, []);



    const handleDelete = async (channel, index) => {
        setSubmitting(true);
        var resp = await channelsService.deleteChannel(channel.can_id);
        if(resp.status === 'OK'){
            canales.splice(index, 1);
            setCanales([...canales]);
        }
        if(resp.status === 'ERROR' || resp.status === 'FATAL'){
            setDeleteError({state:true, error: resp.error});
        }
        setSubmitting(false);
    };

    const handleEdit = async (values) => {
        setEditError({state:false, error: ''});
        const channel = new ChannelModel(values.can_id, null , null, values.name, values.password, null, null); 
        
        let respName = await channelsService.updateChannelName(channel);
        let respPass = await channelsService.updateChannelPassword(channel);

        if(respName.status === 'OK' || respPass.status === 'OK'){
            canales.splice(values.index, 1, channel);
        }else{
            setEditError({state:true, error: 'No se han realizado cambios'});
        }
        setSubmittingEdit(false);
        
    }

    return(
        <div className={classes.root}>

            {loading ? <LoadingComponent/> : (
            <List>
            {canales.length > 0 ?canales.map( (canal, index) => (       
                <ListItem key={canal.can_id}>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={canal.can_nombre}
                        secondary={'Contraseña: '+canal.can_contrasena}
                    />

                    <ListItemSecondaryAction>
                    
                    <EditChannelModalComponent 
                        setSubmitting={setSubmittingEdit} 
                        submitting={submittingEdit} 
                        handleEdit={handleEdit} 
                        index={index} 
                        channel={canal}
                    />

                    <DeleteChannelModalComponent 
                        setSubmitting={setSubmitting} 
                        submitting={submitting} 
                        onDelete={handleDelete} 
                        index={index} 
                        channel={canal}
                    />

                    </ListItemSecondaryAction>
                </ListItem>    
            )):
                <List>
                    <ListItem>
                        <ListItemText
                            
                            primary="No has creado ningún canal aún"
                        />
                    </ListItem>
                </List>
            }
            </List>
            )}
            {deleteError.state?
            <div className={classes.demo}>
            <List>
                <ListItem>

                    <ListItemText
                        primary={deleteError.error}
                    />
                </ListItem>
            </List>
            </div>
            :null}

            {editError.state?
            <div className={classes.demo}>
            <List>
                <ListItem>

                    <ListItemText
                        primary={editError.error}
                    />
                </ListItem>
            </List>
            </div>
            :null}
            
        </div>
    );
    
}

export default ClientChannelsComponent;