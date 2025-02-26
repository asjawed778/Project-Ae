// Importing React Icons
import { forwardRef, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useUploadBrouchureMutation } from "../../services/course.api";

const Pdf = forwardRef(({ id, onChange =() => {} , ...rest }, ref) => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState("")

  const [uploadBrouchure, { isLoading, isError, error: uploadError }] =
    useUploadBrouchureMutation();


    const uploadPdf = async (file) => {
      try {
        await uploadBrouchure(file).unwrap();
        console.log("Upload successful");
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

  const handleFileChange = async(event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      const maxSize = 5 * 1024 * 1024; // maximum 5MB
      const allowedTypes = ["application/pdf"];

      if (!allowedTypes.includes(uploadedFile.type)) {
        setError("Only pdf file is allowed.");
        event.target.value = "";
        return;
      }

      if (uploadedFile.size > maxSize) {
        setError("File size should not exceed 5MB.");
        event.target.value = "";
        return;
      }
      setError("")
      setFile(uploadedFile);
      await uploadPdf(uploadedFile);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const removePdf = () => {
    setFile(null);
    setPdfUrl(null)
    if (ref?.current) {
      ref.current.value = ""; // Reset the input field
    }
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up when component unmounts
    }
  }, [file]);

  return file ? (
    <div className="group flex items-center gap-5">
      <div className="relative">
        <div className="flex gap-3">
        <p className="text-green-600">Uploaded: {file?.name}</p>
        <button type="button" onClick={removePdf} className="cursor-pointer ">
          <RxCross2 className="size-5" />
        </button>
        </div>

        {/* Hover Div */}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 mt-1 flex items-center justify-center text-xl text-white bg-black/55 w-full h-full rounded-md cursor-pointer"
          >
            Preview
          </a>
        )}

        {isLoading && <div className="text-green-500">Uploading...</div> }
      </div>
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
        onChange={handleFileChange}
        ref={ref}
        {...rest}
      />
      {error && <p className="text-red-600 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
});

export default Pdf;
