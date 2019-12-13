import "./App.css";
import React from "react";
// import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
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
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import SummaryPage from "./components/summary";
import TemperaturePage from "./components/temperature";
import ResultsPage from "./components/results";
import VotingPage from "./components/candidates";

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
      <Route exact={true} path="/voting/2" render={() => <Part2 />} />
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
        render={() => <SummaryPage temperature={temperature} />}
      />
      <Route
        exact={true}
        path="/voting/results"
        render={() => <ResultsPage />}
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
