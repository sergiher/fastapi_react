from fastapi import FastAPI, Request
from gemini_class import myGeminiAI

model_name = "gemini-1.5-flash"
my_ai = myGeminiAI(model_name=model_name)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


# @app.route("/api/explain", methods=["POST"])
@app.route("/api/explain")
def initApi():
    __import__("pdb").set_trace()
    subject = Request.json.get("subjectToLearnAbout")
    timeToExplain = Request.json.get("timeToExplain")
    reformulatedQuestion = (
        "please, explain me about "
        + subject
        + " as if you were speaking for "
        + str(timeToExplain)
        + " minutes"
    )
    response = my_ai.generate_response(input_text=reformulatedQuestion)
    dataToJson = {"responseText": response.text}
    return dataToJson
