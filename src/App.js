import "./App.css";
import React from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ethers } from "ethers";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory
} from "react-router-dom";
import sendTransaction from "./sendTransaction";


import { FirebaseDatabaseProvider } from "@react-firebase/database";

import SummaryPage from "./components/summary";
import TemperaturePage from "./components/temperature";
import ResultsPage from "./components/results";
import VotingPage from "./components/candidates";
import BirthdayPage from "./components/birthday";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL
} from "./constants";

const NETWORK = "goerli";

export default function App() {
  return (

    <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Switch>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="App">
              <div className="App-Content">
                <AppBody />
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </Switch>
      </BrowserRouter>
    </FirebaseDatabaseProvider>
  );
}

function AppBody() {

  const [temperature, setTemperature] = React.useState(null);
  const [candidate, setCandidate] = React.useState("");
  const [happiness, setHappiness] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date([null]));
  const [province, setProvince] = React.useState(null);

  return (
    <Switch>
      <Route
        exact={true}
        path="/voting/1"
        render={() => (
          <VotingPage
            candidate={candidate}
            setCandidate={setCandidate}
            happiness={happiness}
            setHappiness={setHappiness}
          />
        )}
      />

      <Route exact={true} path="/voting/2" render={() => <BirthdayPage
      setSelectedDate={setSelectedDate}
      selectedDate={selectedDate}
      province ={province}
      setProvince={setProvince}
      />} />
      <Route
        exact={true}
        path="/voting/3"
        render={() => (
          <TemperaturePage
            temperature={temperature}
            setTemperature={setTemperature}
          />
        )}
      />
      <Route
        exact={true}
        path="/voting/summary"
        render={() => (
          <SummaryPage
            temperature={temperature}
            candidate={candidate}
            happiness={happiness}
          />
        )}
      />
      <Route
        exact={true}

        path="/voting/results"
        render={() => <ResultsPage />}
      />
    <Route
        exact={true}
        path="/voting/summary"
        render={() => <SummaryPage
          temperature={temperature}
          candidate={candidate}
          happiness={happiness}
          province ={province}
          selectedDate={selectedDate}
           />}
      />
      <Route exact={true} path="/" render={() => <LoginPage />} />
    </Switch>
  );
}

function Solution() {
  return (
    <div>
      <Grid container={true} justify="space-between">
        <Typography component="h1" gutterBottom={true}>
          Cast Your Vote
        </Typography>
        <Link to="/" component={RouterLink}>
          Back to start
        </Link>
      </Grid>
    </div>
  );
}

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const history = useHistory();

  const onClickLogIn = () => {

    window.localStorage.setItem("username", username);
    history.push("/voting/1");
  };
  return (
    <div>
      <Solution />
      <form noValidate autoComplete="off">
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
        variant="contained"
        color="primary"
        onClick={onClickLogIn}
      >
        Continue
      </Button>
    </div>
  );
}

function Temperature() {
  const [temperature, setTemperature] = React.useState();
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

  function valuetext(value) {
    setTemperature(value);
    return `${value}°C`;
  }

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
        Temperature
      </Typography>
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="on"
        marks={marks}
      />
    </div>
  );
}
function SummaryPage() {
  const [amountCandidate, setAmountCandidate] = React.useState("");
  const [amountCharity, setAmountCharity] = React.useState("");
  let addressCandidate = "0x5Dc6288b35E0807A3d6fEB89b3a2Ff4aB773168e";
  let addressCharity = null;
  const onClick = async () => {
    await sendTransaction({
      valueInEth: amountCandidate ? amountCandidate : amountCharity,
      gas: 4200000,
      destinationAddress: amountCandidate ? addressCandidate : addressCharity
    });
  };

  return (
    <div>
      <h1>Summary Page</h1>

      <Grid container={true} direction="column">
        <TextField
          label="Donate ETH to your candidate"
          value={amountCandidate}
          onChange={event => setAmountCandidate(event.target.value)}
        />
        <Box m={1} />
        <TextField
          label="Donate ETH to charity"
          value={amountCharity}
          onChange={event => setAmountCharity(event.target.value)}
        />
        <Box m={3} />
        <Button onClick={onClick} variant="contained" color="primary">
          Cast Votes
        </Button>
      </Grid>
    </div>
  );
}
