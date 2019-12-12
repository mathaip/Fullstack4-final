import React, { Fragment } from "react";
import "./summary.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Button } from "@material-ui/core";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { typography } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import DoneAllIcon from "@material-ui/icons/DoneAll";

function SummaryPage() {
  const [metamaskAddr, setMetamaskAddr] = React.useState("");
  const [savedUsername, setSavedUsername] = React.useState("");

  let history = useHistory();

  const onClick = async () => {
    try {
      const accounts = await window.ethereum
        .enable()
        .then(data => console.log(data));
    } catch (error) {
      if (error.code === 4001) {
        console.log("Error msg: " + error.message);
        // setSavedUsername("");
      }
    }
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
        display props
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        How happy are you with the current candidate?
      </Typography>
      <div className="summary-answers-text" display="block">
        display props
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        When is your birthday?
      </Typography>
      <div className="summary-answers-text" display="block">
        display props
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        Which province do you reside in?
      </Typography>
      <div className="summary-answers-text" display="block">
        display props
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        What is your ideal room temperature?
      </Typography>
      <div className="summary-answers-text" display="block">
        display props
      </div>
      <Box m={1} />
      <TextField
        className="textfield-donate"
        id="outlined-basic"
        variant="outlined"
        label="Donate ETH to your candidate (optional)"
      />
      <Box m={1} />
      <TextField
        className="textfield-donate"
        id="outlined-basic"
        label="Donate ETH to charity (optional)"
        variant="outlined"
      />
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
            onClick={() => history.goBack()}
          >
            <Typography variant="button">back</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SummaryPage;
