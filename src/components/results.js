import React, { Fragment } from "react";
import "./results.css";
import Typography from "@material-ui/core/Typography";
import { Grid, Box } from "@material-ui/core";
import firebase from "../firebase";
import { CANDIDATE_NAME, HAPPINESS_LABEL, PROVINCES } from "../constants";
import TextField from "@material-ui/core/TextField";

function ResultsPage() {
  const [candidatesFireBase, setCandidatesFireBase] = React.useState([]);
  const [birthdayFireBase, setBirthdayFireBase] = React.useState([]);
  const [hapinessFireBase, setHapinessFireBase] = React.useState([]);
  const [provinceFireBase, setProvinceFireBase] = React.useState([]);
  const [temperatureFireBase, setTemperatureFireBase] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("Results")
      .onSnapshot(snapshot => {
        let votesFirebase = snapshot.docs.map(doc => ({
          ...doc.data()
        }));
        console.log("Results from firebase:", votesFirebase);
        setCandidatesFireBase(votesFirebase[0]);
        setBirthdayFireBase(votesFirebase[1]);
        setHapinessFireBase(votesFirebase[2]);
        setProvinceFireBase(votesFirebase[3]);
        setTemperatureFireBase(votesFirebase[4]);
        console.log(votesFirebase[1]);
      });
  }, []);

  return (
    <div>
      <Typography variant="body1" display="block" gutterBottom>
        Cast Your Vote
      </Typography>
      <Typography variant="h4" display="block" gutterBottom>
        Results
      </Typography>
      <div>
        <Candidates />
        <Box m={1} />
      </div>
      <div>
        <Progress />
        <Box m={1} />
      </div>
      <div>
        <AgeGroups />
        <Box m={1} />
      </div>
      <Provinces />
      <Box m={1} />

      <Temperature />
      <Box m={1} />
    </div>
  );

  function Progress() {
    return (
      <div>
        Progress:
        <div className="results-answers-text ">
          {Object.keys(hapinessFireBase).map(key => (
            <div key={key}>
              {[key]}: {hapinessFireBase[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Candidates() {
    return (
      <div>
        Favorite candidate:
        <div className="results-answers-text ">
          {Object.keys(candidatesFireBase).map(key => (
            <div key={key}>
              {CANDIDATE_NAME[key]}: {candidatesFireBase[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }
  function AgeGroups() {
    return (
      <div>
        Age groups:
        <div className="results-answers-text ">
          {Object.keys(birthdayFireBase).map(key => (
            <div key={key}>
              {[key]}: {birthdayFireBase[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Provinces() {
    return (
      <div>
        Province:
        <div className="results-answers-text ">
          {Object.keys(provinceFireBase).map(key => (
            <div key={key}>
              {[key]}: {provinceFireBase[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }
  function Temperature() {
    return (
      <div>
        Ideal room temperature:
        <div className="results-answers-text ">
          {Object.keys(temperatureFireBase).map(key => (
            <div key={key}>
              {[key]}ºC : {temperatureFireBase[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ResultsPage;
