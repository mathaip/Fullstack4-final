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

// ======== COMPONENTS ========= //
import SummaryPage from "./components/summary";
import ResultsPage from "./components/results";
import TemperaturePage from "./components/temperature";

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL
} from "./constants";

const NETWORK = "goerli";

export default function App() {
  return (
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
  );
}

function AppBody() {
  const [temperature, setTemperature] = React.useState(null);
  return (
    <Switch>
      <Route exact={true} path="/voting/3" render={() => <TemperaturePage />} />
      <Route
        exact={true}
        path="/voting/results"
        render={() => <ResultsPage />}
      />
      <Route
        exact={true}
        path="/voting/summary"
        render={() => <SummaryPage />}
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
    //     window.localStorage.setItem("username", username);
    //     history.push("/");
    //   };
    //   return (

    window.localStorage.setItem("username", username);
    history.push("/voting/3");
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
