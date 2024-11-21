import { useState } from "react";
import { useForm } from "react-hook-form";

function SingleFileUploader() {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState("");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      setResponse(res.message);
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
      {/* The name of the images has to be always the same. This way, when the react
      reloads because there are new images in the "images" folder, it finds always the
      images because always have the same name.
      
      I cannot change the webpack config, to avoid reload of the website if public/images
      change, because it's inside node_modules and that directory can change with every
      new installation.
      
      I cannot store the images outside the react app directory because then it's
      too difficult to find them.
      */}
      <div>
        original image: <img width={60} src="images/image_original.jpg" />
      </div>
      <div>
        thumb image: <img width={60} src="images/image_thumb.jpg" />
      </div>
    </>
  );
}

export default SingleFileUploader;
