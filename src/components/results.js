import React, { Fragment } from "react";
import "./results.css";
import Typography from "@material-ui/core/Typography";
import { Grid, Box } from "@material-ui/core";
import firebase from "firebase";

function ResultsPage() {
  const [firebaseData, setFirebaseData] = React.useState([]);

  React.useEffect(() => {
    //   firebase
    //     .firestore()
    //     .collection("id").onSnapshot(snapshot => {
    //         let newCats = snapshot.docs.map(doc => ({
    //           ...doc.data()
    //         }));
    //         setFirebaseData(###);
    //       });
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
      <Typography variant="body2" display="block" gutterBottom>
        Favorite candidate:
      </Typography>
      <div className="results-answers-text" display="block">
        display firebaseData
      </div>
      <Box m={1} />

      <Typography variant="body2" display="block" gutterBottom>
        Progress:
      </Typography>
      <div className="results-answers-text" display="block">
        display firebaseData
      </div>
      <Box m={1} />

      <Typography variant="body2" display="block" gutterBottom>
        Age groups:
      </Typography>
      <div className="results-answers-text" display="block">
        display firebaseData
      </div>
      <Box m={1} />

      <Typography variant="body2" display="block" gutterBottom>
        Province:
      </Typography>
      <div className="results-answers-text" display="block">
        display firebaseData
      </div>
      <Box m={1} />

      <Typography variant="body2" display="block" gutterBottom>
        Ideal room temperature:
      </Typography>
      <div className="results-answers-text" display="block">
        display firebaseData
      </div>
      <Box m={1} />
    </Grid>
  );
}

export default ResultsPage;
