import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import CourseDetails from "../../../components/Add Course/AdditionalDetails";
import CourseFirstStep from "../../../components/Add Course/CourseFirstStep";
import CourseStructure from "../../../components/Add Course/CourseStructure";

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(3);
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
    <div className="p-4 w-full flex flex-col gap-6">
      <div className="bg-[#D0DAF1] rounded-lg text-md flex justify-between items-center pr-3">
        <div
          className={`${
            currentStep == 1 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Course Details
        </div>
        <div
          className={`${
            currentStep == 2 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Additional Details
        </div>
        <div
          className={`${
            currentStep == 3 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Course Structure
        </div>
        <div
          className={`${
            currentStep == 4 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Course Content
        </div>
        <div
          className={`${
            currentStep == 5 &&
            "cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2`}
        >
          Pricing & Publish
        </div>
      </div>

      <div className="bg-[#F5F5F5] rounded-lg p-2 w-full">
        {currentStep === 1 && (
          <div>
            <CourseFirstStep
              currentStep={currentStep}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        )}
        {currentStep === 2 && (
          <CourseDetails
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {currentStep === 3 && (
          <CourseStructure
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {currentStep === 4 && (
          <div className="h-[65vh] flex justify-center items-center">
            Course Content
          </div>
        )}
        {currentStep === 5 && (
          <div className="h-[65vh] flex justify-center items-center">
            Pricing & Publish
          </div>
        )}

        {currentStep >= 3 && (
          <div
            className={`flex ${
              currentStep === 1
                ? "justify-end"
                : currentStep === 5
                ? "justify-start"
                : "justify-between"
            } items-center gap-4 text-white`}
          >
            {currentStep > 1 && <Button onClick={handlePrev}>Prev</Button>}
            {currentStep < 5 && (
              <Button onClick={handleNext}>Save and Next</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
