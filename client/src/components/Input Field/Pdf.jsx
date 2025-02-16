// Importing React Icons
import { forwardRef, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Pdf = forwardRef(({ id, ...rest }, ref) => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
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
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up when component unmounts
    }
  }, [file]);

  if (file)
    return (
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
    );
  else
    return (
      <input
        id={id}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={ref}
        {...rest}
        className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    );
});

export default Pdf;
