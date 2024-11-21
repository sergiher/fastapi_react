from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/upload")
async def upload(file: UploadFile):
    try:
        extension = str(file.filename).split(".")[-1]
        original_file_path = f"/home/sergio/Documents/tech/fastapi_react/frontend/public/images/image_original.{extension}"
        thumb_file_path = f"/home/sergio/Documents/tech/fastapi_react/frontend/public/images/image_thumb.{extension}"

        # print()
        # with open(original_file_path, "wb") as f:
        #     f.write(file.file.read())
        #     return {
        #         "message": "File saved successfully",
        #         "originalImageFileName": f"image_original.{extension}",
        #         "thumbImageFileName": f"image_original.{extension}",
        #     }

        with open(original_file_path, "wb") as originalF:
            originalF.write(file.file.read())

            im = Image.open(file.file)
            (width, height) = (im.width // 2, im.height // 2)
            im_resized = im.resize((width, height))
            im_resized.save(thumb_file_path)
            return {
                "message": "File saved successfully",
                "originalImageFileName": f"image_original.{extension}",
                "thumbImageFileName": f"image_original.{extension}",
            }
    except Exception as e:
        return {"message": e.args}
