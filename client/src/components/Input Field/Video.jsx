import { forwardRef, useState } from "react";
import Button from "../Button/Button";

const Video = forwardRef(({ id, ...rest }, ref) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoSrc(reader.result);
        // setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoSrc(null);
  };

  if (isModalOpen)
    return (
      <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex flex-col gap-5 p-4 rounded-lg">
          <video controls className="w-fit h-[40rem]">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Button onClick={closeModal} variant="red">
            Close Preview
          </Button>
        </div>
      </div>
    );
  else
    return (
      <div className="flex gap-5">
        <input
          id={id}
          type="file"
          accept="video/*"
          ref={ref}
          {...rest}
          onChange={handleVideoChange}
          className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />

        {videoSrc && (
          <Button onClick={() => setIsModalOpen(true)}>Preview Video</Button>
        )}
      </div>
    );
});

export default Video;
