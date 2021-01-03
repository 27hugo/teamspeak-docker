import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SteamService from '../../services/SteamService';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ScrollAnimation from 'react-animate-on-scroll';
import './style.css';
const useStyles = makeStyles(theme => ({
    section:{
        paddingTop: 20,
        paddingBottom: 50
    },
    card: {
        margin: theme.spacing(1),
        //maxWidth: 345,
    },
    media: { 
        width: "90%",
        borderRadius: "100%"
    },
    cardContent: {
        textAlign: "center"
    }
}));
const adminsIDs = ['76561198057941343','76561198210474587','76561198356392862'];
const steamService = new SteamService();    
function AdminsComponent(){
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [admins, setAdmins] = useState([]);


    useEffect( () => {
        adminsIDs.forEach(adminID => {
            steamService.getProfile(adminID)
            .then(resp => {
                resp = resp.data;
                if(resp.status === 'OK'){
                    const admin = resp.data;
                    setAdmins(admins => [...admins, admin]);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
       
    }, []);


    return(
            <Grid id="admins" className={classes.section} style={{marginTop: 30}} item xs={11} sm={10} md={9} lg={7}>
                    <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInLeft">

                    <Typography style={{marginTop: 35, marginBottom: 35}} variant="h5">Administradores / Soporte</Typography>
                    <Typography variant="body2">Puedes contactarte con nosotros directamente desde steam ante cualquier problema contactandonos a los perfiles.</Typography>
                    </ScrollAnimation>                    
                    <Grid style={{marginTop:20}} container justify="center">
                        {( isLoading ? Array.from(new Array(3)) : admins).map( (admin, i) => (
                            <Grid key={i} item xs={6} sm={6} md={4}>
                                <div className={classes.card}>
                                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">

                                        <CardMedia className="card-image" style={{justifyContent:"center",justifyItems:"center", justifySelf:"center" ,textAlign:"center"}}>
                                       {admin ? (
                                        <Button href={'http://steamcommunity.com/profiles/'+admin.steamID64}>
                                            <img alt={i} className={classes.media} src={admin.avatarFull}/>
                                        </Button>                                        
                                        ) : (
                                            <div>
                                            <Skeleton width="100%" height={200} />
                                            <Skeleton width="100%" component="h2"/>
                                            </div>
                                        )}
                                        </CardMedia>
                                        <CardContent className={classes.cardContent} >
                                        {admin ? (
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {admin.steamID}
                                        </Typography>
                                        ) : null}
                                        
                                        {admin ? (
                                        <Typography style={{color: "white"}} variant="caption" color="textSecondary" component="p">
                                            {admin.stateMessage}<br/>
                                            {admin.location ? admin.location : 'No registra ciudad'}
                                        </Typography>
                                        ) : null}
                                        </CardContent>
                                    
                                    {!isLoading ? (
                                    <CardActions style={{justifyContent: "center"}}>
                                        <Button style={{color:"white"}} href={'http://steamcommunity.com/profiles/'+admin.steamID64} size="small" color="primary">
                                        Ver Perfil
                                        </Button>
                                    </CardActions>
                                    ):null}
                                    </ScrollAnimation>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
            </Grid>
    );
}

export default AdminsComponent;