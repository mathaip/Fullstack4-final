import './App.css'
import React from 'react'
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
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL,
} from './constants'

const NETWORK = 'goerli'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='App'>
          <div className='App-Content'>
            <AppBody/>
          </div>
        </div>
      </MuiPickersUtilsProvider>
      </Switch>
    </BrowserRouter>
  )
}

function AppBody(){
  const [temperature, setTemperature] = React.useState(null)
  return(
    <Switch>
      <Route exact={true} path='/' render={()=> <LoginPage /> }/>
      <Route exact ={true} path='/voting/3' render={()=> <Temperature/> }/>
      <Route exact ={true} path='/voting/summary'  render={()=> <SummaryPage/> }/>

      
    </Switch>
  )
}

function Solution() {
  return (
    <div>
      
        <Grid container={true} justify='space-between'>
          <Typography component='h1' gutterBottom={true}>
            Cast Your Vote
          </Typography>
          <Link to='/' component={RouterLink}>
            Back to start
          </Link>
        </Grid>
      </div>
     
  )
}

function LoginPage(){
  const [username, setUsername] = React.useState('');
  const history = useHistory()

  const onClickLogIn = () => {
    window.localStorage.setItem('username', username)
    history.push('/voting/3')

  }
  return(
    <div>
        <Solution/>
        <form  noValidate autoComplete="off">
          <TextField 
          id="standard-basic" 
          label="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          />
        </form>
        <Box m={1} />
          <Button
            disabled={!username}
            variant='contained'
            color='primary'
            onClick={onClickLogIn}
            
          >
            Continue
          </Button>

      </div>

  )
}


function Temperature(props){
  const [temperature, setTemperature] = React.useState(null)
  const history = useHistory()
  const useStyles = makeStyles(theme => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
  
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
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
  
  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }
  const classes = useStyles();
  return(
    <div className={classes.margin}>
      <Link to='/' component={RouterLink}>
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
      </Grid>
      </div>
    </div>
  )
}
function SummaryPage(props){
  const history = useHistory()
  const OnClickGoBack = ()=>{
    history.push('/')
  }

  return(
    
    <div>
      <Typography component='h1' gutterBottom={true}>
            Cast Your Vote
      </Typography>
      <h1>Summary Page</h1>
      <div>
             <h3>Who is your favorite Candidate?</h3>
      </div>
      <Box m={9} />
      <div>
             <h3>How happy are you with the Current Progess?</h3>
      </div>
      <Box m={9} />
      <div>
             <h3>When is your Birthday?</h3>
      </div>
      <Box m={9} />
      <div>
             <h3>Which province do you reside in?</h3>
      </div>
      <Box m={9} />
      <div>
             <h3>What is your ideal room temperature?</h3>
      </div>
      <Box m={9} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<DoneAllIcon />}
      >
        Cast your Votes
      </Button>
      <Box m={2} />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={OnClickGoBack}
      >
        goBack
      </Button>
    </div>

  )
}