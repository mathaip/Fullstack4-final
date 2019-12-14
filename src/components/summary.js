import React, { Fragment } from "react";
import "./summary.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Button } from "@material-ui/core";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { typography } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FormControl from "@material-ui/core/FormControl";
import firebase from "../firebase";
import sendTransaction from "../sendTransaction";

export default function SummaryPage(props) {
  const [metamaskAddr, setMetamaskAddr] = React.useState("");
  const [savedUsername, setSavedUsername] = React.useState("");
  const [amountCandidate, setAmountCandidate] = React.useState("");
  const [amountCharity, setAmountCharity] = React.useState("");

  let temperature = props.temperature;
  let birthday = props.selectedDate;
  let candidate = props.candidate;
  let happiness = props.happiness;
  let province = props.province;
  let history = useHistory();

  function castVote() {
    let addressCandidate = "0x5Dc6288b35E0807A3d6fEB89b3a2Ff4aB773168e";
    let addressCharity = "0x02B4725a51FD375922a3797494E13F6b35ecBD9d";
    const cast = async () => {
      await sendTransaction({
        valueInEth: amountCandidate ? amountCandidate : amountCharity,
        gas: 4200000,
        destinationAddress: amountCandidate ? addressCandidate : addressCharity,
        sendMessage: amountCandidate ? "candidate" : "charity"
      });
    };
    cast();

    function ageGroup(age) {
      if (age < 20) {
        return "19 or less";
      } else if (age < 30) {
        return "20 to 29";
      } else if (age < 40) {
        return "30 to 39";
      } else if (age < 50) {
        return "40 to 49";
      } else return "50 or more";
    }

    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const batch = db.batch();
    let candidateRef = db.collection("Results").doc("Candidate");
    let birthdayRef = db.collection("Results").doc("birthday");
    let happinessRef = db.collection("Results").doc("happiness");
    let provinceRef = db.collection("Results").doc("province");
    let temperatureRef = db.collection("Results").doc("temperature");
    batch.set(
      candidateRef,
      { [window.localStorage.getItem("candidate")]: increment },
      { merge: true }
    );
    batch.set(
      birthdayRef,
      { [ageGroup(window.localStorage.getItem("birthday"))]: increment },
      { merge: true }
    );
    batch.set(
      happinessRef,
      { [window.localStorage.getItem("happiness")]: increment },
      { merge: true }
    );
    batch.set(
      provinceRef,
      { [window.localStorage.getItem("province")]: increment },
      { merge: true }
    );
    batch.set(
      temperatureRef,
      { [window.localStorage.getItem("temperature")]: increment },
      { merge: true }
    );
    batch.commit();
  }

  const onClick = async () => {
    castVote();
    history.push("/voting/results");
    window.localStorage.clear();
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Typography variant="body1" display="block" gutterBottom>
        Cast Your Vote
      </Typography>
      <Typography variant="h4" display="block" gutterBottom>
        Summary
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        Who is your favorite candidate?
      </Typography>
      <div className="summary-answers-text" display="block">
        {window.localStorage.getItem("candidate")}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        How happy are you with the current candidate?
      </Typography>
      <div className="summary-answers-text" display="block">
        {window.localStorage.getItem("happiness")}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        When is your birthday?
      </Typography>
      <div className="summary-answers-text" display="block">
        {window.localStorage.getItem("birthday") + " "}years old
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        Which province do you reside in?
      </Typography>
      <div className="summary-answers-text" display="block">
        {window.localStorage.getItem("province")}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        What is your ideal room temperature?
      </Typography>
      <div className="summary-answers-text" display="block">
        {temperature} °C
      </div>
      <Box m={1} />
      <Grid>
        <TextField
          className="textfield-donate"
          variant="outlined"
          label="Donate ETH to your candidate (optional)"
          value={amountCandidate}
          onChange={event => setAmountCandidate(event.target.value)}
        />
        <Box m={1} />
        <TextField
          className="textfield-donate"
          label="Donate ETH to charity (optional)"
          variant="outlined"
          value={amountCharity}
          onChange={event => setAmountCharity(event.target.value)}
        />
      </Grid>
      <Box m={1} />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={onClick}>
            {" "}
            <DoneAllIcon />
            <Typography variant="button"> Cast Votes</Typography>
          </Button>
        </Grid>
        <Box m={1} />
        <Grid item>
          <Button
            variant="outlined"
            type="button"
            onClick={() => history.push("/voting/3")}
          >
            <Typography variant="button">Previous </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
