import React from 'react';
import wp1 from '../../assets/images/wp1.jpg';
import { Parallax } from 'react-parallax';
import './style.css';
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
const insideStyles = {
    padding: 20,
    color: "#FFAA4B",
    fontSize: "8rem",
    textShadow: "2px 2px #ff0000",
    fontWeight: 700,
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };
function HeaderComponent(){
    return(    
        <div style={styles}>
    <Parallax bgImage={wp1} blur={{ min: -1, max: 3 }} strength={200}>
      <div style={{ height: "100vh" }}>
        <div style={insideStyles}>OWC</div>
      </div>
    </Parallax>
    
  </div>

    );
}

export default HeaderComponent;