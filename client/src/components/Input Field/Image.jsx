// Importing React Icons
import { RxCross2 } from "react-icons/rx";

import { forwardRef, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Image = forwardRef(({ id, onChange = () => {}, ...rest }, ref) => {
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image); // Cleanup when component unmounts
      }
    };
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange(event); // Call the external onChange if needed
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image); // Clean up blob URL
    }
    setImage(null);
    if (ref && ref.current) {
      ref.current.value = ""; // Reset file input
    }
  };

  return (
    <>
      {image ? (
        <div className="group relative w-fit h-fit">
          {/* Remove Image Button */}
          <button
            onClick={removeImage}
            className="z-20 absolute top-2 right-0 cursor-pointer"
          >
            <RxCross2 className="size-8 text-white" />
          </button>

          {/* Hover Div */}
          <div
            onClick={openModal}
            className="z-10 hidden group-hover:flex items-center justify-center absolute top-0 text-xl text-white bg-black/55 w-full h-full rounded-md cursor-pointer"
          >
            Preview
          </div>

          {/* Image */}
          <img
            src={image || ""}
            alt="Preview"
            className="w-64 h-48 object-cover rounded-md"
          />
        </div>
      ) : (
        <div>
          <label
          htmlFor={id}
          className="text-gray-500 flex flex-col items-center justify-center w-[15rem] py-2 h-fit border-2 border-dashed border-gray-300 cursor-pointer"
        >
          <AiOutlineCloudUpload size={30} />
          <p>Upload image</p>
        </label>

        <input
          hidden
          id={id}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={ref}
          {...rest}
          />
          </div>
      )}

      {/* Full-Screen Modal */}
      {modalOpen && (
        <div
          className="z-50 fixed inset-0 bg-black/75 flex justify-center items-center"
          onClick={closeModal} // Close modal when clicking outside
        >
          {/* Remove Image Button */}
          <button
            onClick={removeImage && closeModal}
            className="cursor-pointer"
          >
            <RxCross2 className="absolute top-5 right-5 size-8 text-white" />
          </button>

          <img
            src={image}
            alt="Full Preview"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            className="h-full"
          />
        </div>
      )}
    </>
  );
});

export default Image;
