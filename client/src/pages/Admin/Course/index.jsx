import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    <div className="p-4 w-full flex flex-col gap-6">
      <div className='bg-[#FBFBFB] rounded-lg text-md flex justify-between items-center pr-3'>
        <div className={`${currentStep == 1 && 'cursor-pointer bg-[var(--color-primary)] text-white rounded-lg'} px-4 py-1`}>Personal Details</div>
        <div className={`${currentStep == 2 && 'cursor-pointer bg-[var(--color-primary)] text-white rounded-lg'} px-4 py-1`}>Course Details</div>
        <div className={`${currentStep == 3 && 'cursor-pointer bg-[var(--color-primary)] text-white rounded-lg'} px-4 py-1`}>Pricing</div>
      </div>

      <div className='bg-[#FBFBFB] rounded-lg p-2 w-full h-[60vh] flex justify-center items-center'>
        {currentStep === 1 && <div>Personal Details</div>}
        {currentStep === 2 && <div>Course Details</div>}
        {currentStep === 3 && <div>Pricing</div>}
      </div>

      <div className={`flex ${currentStep === 1 ? "justify-end" : currentStep === 3 ? "justify-start": "justify-between"} items-center gap-4 text-white`}>
            {currentStep > 1 && <Button onClick={handlePrev} >Prev</Button> }
            {currentStep < 3 && <Button onClick={handleNext}>Save and Next</Button> }
        </div>
    </div>
  );
};

export default AddCourse;
