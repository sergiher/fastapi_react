import { useState } from "react";
import "./App.css";
import { Grid2, TextField, Typography } from "@mui/material";
import InputSlider from "./components/slider";

function App() {
  const [subjectToLearnAbout, setSubjectToLearnAbout] = useState("");
  const [timeToExplain, setTimeToExplain] = useState(1);
  return (
    <div className="App">
      <header className="App-header">
        <p>Explain to me about</p>
        <TextField
          name="subjectToLearnAbout"
          label="write some subject"
          value={subjectToLearnAbout}
          onChange={(e: { target: { value: any } }) =>
            setSubjectToLearnAbout(e.target.value)
          }
        />
        <Grid2 style={{ display: "inline-flex" }}>
          <Typography style={{ paddingRight: "29px" }}>in</Typography>{" "}
          <InputSlider
            timeToExplain={timeToExplain}
            setTimeToExplain={setTimeToExplain}
          />
        </Grid2>
      </header>
    </div>
  );
}

export default App;
