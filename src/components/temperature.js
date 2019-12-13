import "../App.css";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

import {
  Link as RouterLink,
  useHistory
} from "react-router-dom";

<<<<<<< HEAD
 function TemperaturePage(){
    const [temperature, setTemperature] = React.useState(null)
    const history = useHistory()
    const useStyles = makeStyles(theme => ({
      root: {
        width: 300
      },
      margin: {
        height: theme.spacing(3)
      }
    }));
  
    const marks = [
      {
        value: 0,
        label: "0°C"
      },
      {
        value: 20,
        label: "20°C"
      },
      {
        value: 37,
        label: "37°C"
      },
      {
        value: 100,
        label: "100°C"
      }
    ];
  
  
    const onClickNext = () =>{
      history.push('/voting/summary')
    }
    const onClickPrev = () =>{
      history.goBack();
    }
    
      function valuetext(value) {
      setTemperature(value);
      return `${value}°C`;
    }
  
    const classes = useStyles();
    return (
      <div className={classes.margin}>
        <Link to="/" component={RouterLink}>
          Back to start
        </Link>
        <Typography id="discrete-slider-always" gutterBottom>
          <h2>
            Temperature
          </h2>
        </Typography>
        <Box m={10} />
  
        <Slider
          defaultValue={null}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          marks={marks}
        />
        <div>
          <Grid containerspacing={1} alignContent='right'>
  
            <Box m={1} />
              <Button
                disabled={!temperature}
                variant='contained'
                color='primary'
                onClick={onClickNext}
                
              >
                Next
              </Button>
          </Grid>    
        </div>
       
  
        <div>
        <Grid alignItems='left'>
        <Box m={1} />
            <Button
              align
              disabled={temperature}
              variant='contained'
              color='primary'
              onClick={onClickPrev}
              
            >
              Previous
            </Button>
=======
function TemperaturePage(props) {
  const history = useHistory();
  const useStyles = makeStyles(theme => ({
    root: {
      width: 300
    },
    margin: {
      height: theme.spacing(3)
    }
  }));

  const marks = [
    {
      value: 0,
      label: "0°C"
    },
    {
      value: 20,
      label: "20°C"
    },
    {
      value: 37,
      label: "37°C"
    },
    {
      value: 100,
      label: "100°C"
    }
  ];

  const onClickNext = () => {
    history.push("/voting/summary");
  };
  const onClickPrev = () => {
    history.goBack();
  };

  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Link to="/" component={RouterLink}>
        Back to start
      </Link>
      <Typography id="discrete-slider-always" gutterBottom>
        <h2>Temperature</h2>
      </Typography>
      <Box m={10} />

      <Slider
        defaultValue={null}
        getAriaValueText={value => props.setTemperature(value)}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="on"
        marks={marks}
      />
      <div>
        <Grid containerspacing={1} alignContent="right">
          <Box m={1} />
          <Button
            disabled={!props.temperature}
            variant="contained"
            color="primary"
            onClick={onClickNext}
          >
            Next
          </Button>
>>>>>>> master
        </Grid>
      </div>

      <div>
        <Grid alignItems="left">
          <Box m={1} />
          <Button
            align
            disabled={props.temperature}
            variant="contained"
            color="primary"
            onClick={onClickPrev}
          >
            Previous
          </Button>
        </Grid>
      </div>
    </div>
  );
}

export default TemperaturePage;
