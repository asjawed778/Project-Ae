// Importing React Icons
import { forwardRef, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const Pdf = forwardRef(({ id, ...rest }, ref) => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    console.log("i am here", id);
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const removePdf = () => {
    // setPdf(null);
    if (ref?.current) {
      ref.current.value = ""; // Reset the input field
    }
  };

  useEffect(() => {
    console.log("hello", ref);
    if (file) {
      console.log("hello2", ref);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up when component unmounts
    }
  }, [file]);

  return file ? (
    <div className="group flex items-center gap-5">
      <div className="relative">
        <p className="text-green-600">Uploaded: {file?.name}</p>

        {/* Hover Div */}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 hidden group-hover:flex items-center justify-center absolute top-0 text-xl text-white bg-black/55 w-full h-full rounded-md cursor-pointer"
          >
            Preview
          </a>
        )}
      </div>
      {/* Remove Image Button */}
      <button onClick={removePdf} className="cursor-pointer">
        <RxCross2 className="size-5" />
      </button>
    </div>
  ) : (
    <div>
      <label
        htmlFor={id}
        className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
      >
        <AiOutlineCloudUpload size={30} />
        <p>Upload pdf</p>
      </label>
      <input
        hidden
        id={id}
        type="file"
        accept="application/pdf"
        onChange={() => console.log("ha bhai kaise ho")}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default Pdf;
