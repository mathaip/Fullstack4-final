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
      });
  }, []);

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
        Results
      </Typography>

      <Candidates />
      <Box m={4} />

      <Progress />
      <Box m={1} />

      <AgeGroups />
      <Box m={1} />

      <Provinces />
      <Box m={1} />

      <Temperature />
      <Box m={1} />
    </Grid>
  );

  function Progress() {
    return (
      <div>
        <Typography variant="body2" display="block" gutterBottom>
          Progress:
        </Typography>
        <div className="results-answers-text" display="block">
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
        <Typography variant="body2" display="block" gutterBottom>
          Favorite candidate:
        </Typography>
        <div className="results-answers-text" display="block">
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
        <Typography variant="body2" display="block" gutterBottom>
          Age groups:
        </Typography>
        <div className="results-answers-text" display="block">
          display firebaseData
        </div>
      </div>
    );
  }

  function Provinces() {
    return (
      <div>
        <Typography variant="body2" display="block" gutterBottom>
          Province:
        </Typography>
        <div className="results-answers-text" display="block">
          display firebaseData
        </div>
      </div>
    );
  }
  function Temperature() {
    return (
      <div>
        <Typography variant="body2" display="block" gutterBottom>
          Ideal room temperature:
        </Typography>
        <div className="results-answers-text" display="block">
          display firebaseData
        </div>
      </div>
    );
  }
}
export default ResultsPage;
