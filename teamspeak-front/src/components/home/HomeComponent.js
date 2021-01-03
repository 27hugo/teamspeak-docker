import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionInfoComponent from './SectionInfoComponent';
import HeaderComponent from './HeaderComponent';
import AdminsComponent from './AdminsComponent';
import FaqComponent from './FaqComponent';
import divider from '../../assets/images/divider.png';
import MusicBotsComponent from './MusicBotsComponent';
import NewsModalComponent from '../news/NewsModalComponent';
const useStyles = makeStyles(theme => ({
    info:{
        justifyContent: "center",
        flexGrow: 1,
    },
    admins:{
        marginBottom: 20,
        backgroundSize: "cover",
        justifyContent: "center",
        flexGrow: 1,
    },
    musicbots:{
        justifyContent: "center",
        flexGrow: 1,
    },
    faq:{
        justifyContent: "center",
        flexGrow: 1,
    },
  }));
function HomeComponent(){
    const classes = useStyles();
    return(
        <div>
            <NewsModalComponent />
            <HeaderComponent/>
            <Grid className={classes.info} container>       
                <SectionInfoComponent/>
            </Grid>
            <Grid className={classes.admins} justify="center" align="center" container>
                <img width="100%" alt="wea" src={divider}/>
                <div style={{width: "100%", backgroundColor: "#000020", color: "#ffffff"}}>
                    <AdminsComponent/>
                </div>
            </Grid>
            <Grid className={classes.musicbots} container>
                <MusicBotsComponent/>
            </Grid>
            <Grid className={classes.faq} container>
                <FaqComponent/>
        </Grid>
        </div>
    );
}

export default HomeComponent;