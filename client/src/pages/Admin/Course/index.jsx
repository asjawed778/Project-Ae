import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import CourseDetails from "../../../components/Add Course/AdditionalDetails";
import CourseFirstStep from "../../../components/Add Course/CourseFirstStep";

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(2);
  //   const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const inputRef = useRef(null);
  const handleDobFocus = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Native API to show the picker
    }
  };

  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setFileName(file.name);
  //     } else {
  //       setFileName("");
  //     }
  //   };

  const handleNext = async () => {
    const isValid = await trigger();

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="p-4 w-full flex flex-col gap-6 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="bg-[#FBFBFB] rounded-lg text-md flex justify-between items-center pr-3">
        <div
          className={`${
            currentStep == 1 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-1`}
        >
          Course Details
        </div>
        <div
          className={`${
            currentStep == 2 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-1`}
        >
          Additional Details
        </div>
        <div
          className={`${
            currentStep == 3 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-1`}
        >
          Course Content
        </div>
        <div
          className={`${
            currentStep == 4 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-1`}
        >
          Pricing
        </div>
      </div>

      <div className="bg-[#FBFBFB] rounded-lg p-2 w-full">
        {currentStep === 1 && (
          <div>
            <CourseFirstStep />
          </div>
        )}
        {currentStep === 2 && <CourseDetails />}
        {currentStep === 3 && (
          <div className="h-[65vh] flex justify-center items-center">
            Course Content
          </div>
        )}
        {currentStep === 4 && (
          <div className="h-[65vh] flex justify-center items-center">
            Pricing
          </div>
        )}
      </div>

      <div
        className={`flex ${
          currentStep === 1
            ? "justify-end"
            : currentStep === 4
            ? "justify-start"
            : "justify-between"
        } items-center gap-4 text-white`}
      >
        {currentStep > 1 && <Button onClick={handlePrev}>Prev</Button>}
        {currentStep < 4 && <Button onClick={handleNext}>Save and Next</Button>}
      </div>
    </div>
  );
};

export default AddCourse;
