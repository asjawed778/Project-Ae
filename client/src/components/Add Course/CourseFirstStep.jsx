import React from "react";
import InputField from "../Input Field";
import Button from "../Button/Button";
import required from "../../../public/imgs/required.svg";
import { useForm } from "react-hook-form";

const CourseFirstStep = ({ currentStep, handleNext, handlePrev }) => {
  const { register, watch } = useForm();
  const selectedMode = watch("mode", ""); // Get the selected value
  return (
    <div className="w-full">
      <form className="p-3 flex flex-col gap-6 px-4">
          <InputField placeholder="Enter the course title" className="bg-white" required="required">
            Course Title <span className="text-red-600">*</span>
          </InputField>

          <InputField placeholder="Enter the subtitle">
            Subtitle <span className="text-red-600">*</span>
          </InputField>

        <div className=" flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <div className="flex gap-1">
              <label htmlFor="language">Language</label>
              <span className="text-red-600">*</span>
            </div>

            <select
              id="language"
              placeholder="select"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer bg-white"
            >
              <option value="">
                Select Language
              </option>
              <option value="">Hindi</option>
              <option value="">English</option>
              <option value="">Hindi + English</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <div className="flex gap-1">
              <label htmlFor="language">Categories</label>
              <span className="text-red-600">*</span>
            </div>

            <select
              id="language"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer bg-white"
            >
              <option value="">Select Categories</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option>
              <option value="">Category 3</option>
            </select>
          </div>
        </div>

          <InputField placeholder="Enter Name of Instructor">
            Instructor <span className="text-red-600">*</span>
          </InputField>

        <div className="flex flex-col gap-2">
          <div>
            Mode: <span className="text-red-600">*</span>{" "}
          </div>
          <div className="flex justify-between border border-neutral-300 rounded-md md:w-2/5 w-full bg-white">
            {["offline", "online", "hybrid"].map((mode) => (
              <label
                key={mode}
                htmlFor={mode}
                className={`text-sm cursor-pointer px-4 py-2 w-full text-center ${(mode === "offline" && "rounded-l-md border-r border-neutral-200") || (mode === "hybrid" && "rounded-r-md border-l border-neutral-200")} ${
                  selectedMode === mode
                    ? "bg-[#9CA1CD]"
                    : ""
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                <input
                  hidden
                  id={mode}
                  type="radio"
                  value={mode}
                  {...register("mode", { required: true })}
                />
              </label>
            ))}
          </div>
        </div>

          <div className="flex gap-20 flex-col md:flex-row">
          <InputField type="image" id="thumbnail">
            Thumbnail Image <span className="text-red-600">*</span>
          </InputField>

          <InputField type="pdf" id="pdf">Brochure pdf</InputField>
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
          {currentStep < 4 && (
            <Button onClick={handleNext}>Save and Next</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CourseFirstStep;
