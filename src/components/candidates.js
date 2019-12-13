import "../App.css";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: 10,
    marginLeft: 10
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

export default function VotingPage(props) {
  function StyledRadio(props) {
    const classes = useStyles();
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  const classes = useStyles();

  const history = useHistory();
  var ballot = null;
  var ballot2 = null;

  const onClickVote = event => {
    ballot = event.target.value;
    props.setCandidate(ballot);
    window.localStorage.setItem("vote", ballot);
    history.push("/voting/1");
  };
  const onClickVote2 = event => {
    ballot2 = event.target.value;
    props.setHappiness(ballot2);
    window.localStorage.setItem("vote2", ballot2);
    history.push("/voting/1");
  };

  return (
    <div>
      <Typography variant="body1" display="block" gutterBottom>
        Cast Your Vote
      </Typography>
      <Typography variant="h4" display="block" gutterBottom>
        Part 1
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Who is your favorite candidate?
        </FormLabel>
        <RadioGroup
          value={props.candidate}
          aria-label="candidate"
          name="customized-radios"
          onChange={onClickVote}
        >
          <FormControlLabel
            value="jonnybravo"
            name="candidate"
            control={<StyledRadio />}
            label="Jonny Bravo"
            checked={props.candidate === "jonnybravo"}
          />
          <FormControlLabel
            value="satoshinakamoto"
            name="candidate"
            control={<StyledRadio />}
            label="Satoshi Nakamoto"
            checked={props.candidate === "satoshinakamoto"}
          />
          <FormControlLabel
            value="thanos"
            name="candidate"
            control={<StyledRadio />}
            label="Thanos"
            checked={props.candidate === "thanos"}
          />
        </RadioGroup>
      </FormControl>

      <Box m={3} />

      <FormControl component="fieldset">
        <FormLabel component="legend">
          How happy are you with the current progress?
        </FormLabel>
        <RadioGroup
          value={props.happiness}
          aria-label="moods"
          name="customized-radios"
          onChange={onClickVote2}
        >
          <FormControlLabel
            value="veryhappy"
            name="moods"
            control={<StyledRadio />}
            label="Very happy"
            checked={props.happiness === "veryhappy"}
          />
          <FormControlLabel
            value="somewhathappy"
            name="moods"
            control={<StyledRadio />}
            label="Somewhat happy"
            checked={props.happiness === "somewhathappy"}
          />
          <FormControlLabel
            value="neutral"
            name="moods"
            control={<StyledRadio />}
            label="Neutral"
            checked={props.happiness === "neutral"}
          />
          <FormControlLabel
            value="somewhatunhappy"
            name="moods"
            control={<StyledRadio />}
            label="Somewhat unhappy"
            checked={props.happiness === "somewhatunhappy"}
          />
          <FormControlLabel
            value="veryunhappy"
            name="moods"
            control={<StyledRadio />}
            label="Very unhappy"
            checked={props.happiness === "veryunhappy"}
          />
        </RadioGroup>
      </FormControl>

      <Box m={2} />

      <Divider />

      <Box m={1} />
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Previous
        </Button>
        <Button
          className={classes.button}
          disabled={!props.candidate || !props.happiness}
          variant="contained"
          color="primary"
          onClick={() => history.push("/voting/2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
