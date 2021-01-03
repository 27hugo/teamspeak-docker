import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
    justifyContent: "center",
    textAlign: "center"
  },
  container: {
    paddingTop: 30,
    paddingBottom: 30, 
    justifyContent: "center",
    textAlign: "center"
  }
}));

function FooterComponent() {
  const classes = useStyles();
  return (
    <Grid container style={{backgroundColor: "#000020", color: "white"}}>
        
      <Container className={classes.root} fixed>
          <Grid className={classes.container} container>
            <p>Desarrollado por Hugo Mancilla, Valparaíso, Chile<br/>
              &copy; derechos reservados<br/>
              2019
            </p>

          </Grid>
      </Container>
    </Grid>
  );
}

export default FooterComponent;
