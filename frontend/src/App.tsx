import TextField from "@mui/material/TextField";
import "./App.css";
import InputSlider from "./components/slider";
import { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";

function App() {
  const [subjectToLearnAbout, setSubjectToLearnAbout] = useState("");
  const [timeToExplain, setTimeToExplain] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsPending(true);
    fetch(process.env.NEXT_PUBLIC_PROXY_HOST + "api/explain", {
      method: "POST",
      body: JSON.stringify({
        subjectToLearnAbout: subjectToLearnAbout,
        timeToExplain: timeToExplain,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setResponseText(res.responseText))
      .then(() => {
        setIsPending(false);
      })
      .catch(() => {
        setResponseText(
          "I cannot provide information about this subject right now."
        );
        setIsPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:center">
          Explain to me about
          <TextField
            name="subjectToLearnAbout"
            label="write some subject"
            value={subjectToLearnAbout}
            onChange={(e: any) => setSubjectToLearnAbout(e.target.value)}
          />
          <Grid2 style={{ display: "inline-flex" }}>
            <span style={{ paddingRight: "29px" }}>in</span>{" "}
            <InputSlider
              timeToExplain={timeToExplain}
              setTimeToExplain={setTimeToExplain}
            />
          </Grid2>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <button
              disabled={isPending || subjectToLearnAbout === ""}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              style={
                subjectToLearnAbout === "" || isPending
                  ? { backgroundColor: "#d1d1d1", transition: "0.2s linear" }
                  : { backgroundColor: "#383838", transition: "0.2s linear" }
              }
            >
              <img
                className="invertColors"
                src="/party-horn.svg"
                alt="Let's learn"
                width={20}
                height={20}
              />
              Let&apos;s go!
            </button>
          </div>
          <div>
            <Grid2
              style={{
                display: "grid",
                justifyItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Button
                className="blink"
                style={isPending === false ? { color: "transparent" } : {}}
              />
            </Grid2>
            <span>{responseText}</span>
          </div>
        </main>
      </div>
    </form>
  );
}

export default App;
