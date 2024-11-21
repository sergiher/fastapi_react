import { useState } from "react";
import { useForm } from "react-hook-form";

function SingleFileUploader() {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState("");
  const [originalImgFileName, setOriginalImgFileName] = useState("");
  const [thumbImgFileName, setThumbImgFileName] = useState("");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      setResponse(res.message);
      setOriginalImgFileName(res.originalImageFileName);
      setThumbImgFileName(res.thumbImageFileName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" {...register("file")} />

          <input type="submit" />
        </form>
      </div>
      response: {response}
      <div>
        original image: {originalImgFileName}{" "}
        <img width={60} src={`images/${originalImgFileName}`} />
      </div>
      <div>
        thumb image: <img width={60} src={`/images/${thumbImgFileName}`} />
      </div>
    </>
  );
}

export default SingleFileUploader;
