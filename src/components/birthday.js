import React from 'react'
import "./birthday.css"
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory
} from "react-router-dom";
import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL
} from "../constants";


function BirthdayPage(props){  
  const history = useHistory();
<<<<<<< HEAD

=======
>>>>>>> mathai
  
  const onClickNext = () => {
    history.push("/voting/3");
  };
  const onClickPrevious = () => {
    history.push("/voting/1");
  };
    const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));
    const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          onChange={e => props.setSelectedDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      </Grid>
      <div>
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Province</InputLabel>
        <Select
          native
          value ={props.province}
          onChange={e => props.setProvince(e.target.value) }
          className='Input'
        >
          {PROVINCES.map(provinces => (
          <option key={provinces.code}> {provinces.name}</option>
          ))}
        </Select>
        </FormControl>
        <Button
        variant="contained"
        color="primary"
        className="Next"
        onClick={onClickNext}
      >
        Next
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="Previous"
        onClick={onClickPrevious}
      >
        Previous
      </Button>
       </div>
        
    
    </MuiPickersUtilsProvider>
  );
}

export default BirthdayPage;