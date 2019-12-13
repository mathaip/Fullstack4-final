import "./App.css";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL
} from "./constants";

const NETWORK = "goerli";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

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
  return (
    <Switch>
      <Route exact={true} path="/voting/1" render={() => <VotingPage />} />
    </Switch>
  );
}

function VotingPage(props) {
  let [vote, setVote] = React.useState("");
  let [vote2, setVote2] = React.useState("");
  const history = useHistory();
  var ballot = null;
  var ballot2 = null;

  const onClickVote = event => {
    ballot = event.target.value;
    vote = ballot;
    setVote(vote);
    window.localStorage.setItem("vote", ballot);
    history.push("/voting/1");
  };
  const onClickVote2 = event => {
    ballot2 = event.target.value;
    vote2 = ballot2;
    setVote2(vote2);
    window.localStorage.setItem("vote2", ballot2);
    history.push("/voting/1");
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Who is your favorite candidate?
        </FormLabel>
        <RadioGroup
          defaultValue="jonnybravo"
          aria-label="candidate"
          name="customized-radios"
        >
          <FormControlLabel
            value="jonnybravo"
            name="candidate"
            control={<StyledRadio />}
            label="Jonny Bravo"
            checked={vote === "jonnybravo"}
            onChange={onClickVote}
          />
          <FormControlLabel
            value="satoshinakamoto"
            name="candidate"
            control={<StyledRadio />}
            label="Satoshi Nakamoto"
            checked={onClickVote}
          />
          <FormControlLabel
            value="thanos"
            name="candidate"
            control={<StyledRadio />}
            label="Thanos"
            checked={onClickVote}
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">
          How happy are you with the current progress?
        </FormLabel>
        <RadioGroup
          defaultValue="veryhappy"
          aria-label="moods"
          name="customized-radios"
        >
          <FormControlLabel
            value="veryhappy"
            name="moods"
            control={<StyledRadio />}
            label="Very happy"
            checked={onClickVote2}
          />
          <FormControlLabel
            value="somewhathappy"
            name="moods"
            control={<StyledRadio />}
            label="Somewhat happy"
            checked={onClickVote2}
          />
          <FormControlLabel
            value="neutral"
            name="moods"
            control={<StyledRadio />}
            label="Neutral"
            checked={onClickVote2}
          />
          <FormControlLabel
            value="somewhatunhappy"
            name="moods"
            control={<StyledRadio />}
            label="Somewhat unhappy"
            checked={onClickVote2}
          />
          <FormControlLabel
            value="veryunhappy"
            name="moods"
            control={<StyledRadio />}
            label="Very unhappy"
            checked={onClickVote2}
          />
        </RadioGroup>
      </FormControl>

      <Box m={1} />
      <Button
        disabled={!vote || !vote2}
        variant="contained"
        color="primary"
        //onClick={}
      >
        Next
      </Button>
      <Typography align="center" color="primary">
        <Link style={{ color: "inherit" }} to="/">
          Previous
        </Link>
      </Typography>
    </div>
  );
}
