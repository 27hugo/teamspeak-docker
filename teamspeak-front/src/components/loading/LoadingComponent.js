import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles(theme => ({
  container: {
        justifyContent: "center",
        position: "absolute",
        top: "46vh",
        
    }
}));

export default function LoadingComponent(){
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <Grid style={{left: matches ? "46.5%": "43.8%"}}  className={classes.container}>
            <CircularProgress size={matches ? 80 : 60}/>
        </Grid>
    );
}