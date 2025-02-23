import React from "react";
import InputField from "../Input Field";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import firstStepValidationSchema from "./Schema/firstStepValidationSchema";

const CourseFirstStep = ({ currentStep, handleNext, handlePrev }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(firstStepValidationSchema),
  });

  const selectedMode = watch("mode", ""); // Get the selected value

  const setValues = () => {
    setValue("thumbnail", "https://via.placeholder.com/150");
    setValue("pdf", "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  }
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handleNext();
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-6 px-4"
      >
        <div>
          <InputField
            placeholder="Enter the course title"
            className="bg-white"
            {...register("courseTitle")}
          >
            Course Title <span className="text-red-600">*</span>
          </InputField>
          {errors?.courseTitle && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.courseTitle.message}
            </p>
          )}
        </div>

        <div>
          <InputField
            placeholder="Enter the subtitle"
            {...register("subtitle")}
          >
            Subtitle <span className="text-red-600">*</span>
          </InputField>
          {errors?.subtitle && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.subtitle.message}
            </p>
          )}
        </div>

        <div className=" flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <div className="flex gap-1">
              <label htmlFor="language" className="cursor-pointer">
                Language
              </label>
              <span className="text-red-600">*</span>
            </div>

            <select
              id="language"
              placeholder="select"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer bg-white"
              {...register("language")}
            >
              <option value="">Select Language</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="hinglish">Hindi + English</option>
            </select>
            {errors?.language && (
              <p className="text-red-600 text-xs ml-1 -mt-1.5">
                {errors?.language.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 md:w-[49%] w-full">
            <div className="flex gap-1">
              <label htmlFor="language" className="cursor-pointer">
                Categories
              </label>
              <span className="text-red-600">*</span>
            </div>

            <select
              id="language"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer bg-white"
              {...register("category")}
            >
              <option value="">Select Categories</option>
              <option value="one">Category 1</option>
              <option value="two">Category 2</option>
              <option value="three">Category 3</option>
            </select>
            {errors?.category && (
              <p className="text-red-600 text-xs ml-1 -mt-1.5">
                {errors?.category.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <InputField
            placeholder="Enter Name of Instructor"
            {...register("instructor")}
          >
            Instructor <span className="text-red-600">*</span>
          </InputField>
          {errors?.instructor && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.instructor.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div>
            Mode: <span className="text-red-600">*</span>{" "}
          </div>
          <div className="flex justify-between border border-neutral-300 rounded-md md:w-2/5 w-full bg-white">
            {["offline", "online", "hybrid"].map((mode) => (
              <label
                key={mode}
                htmlFor={mode}
                className={`text-sm cursor-pointer px-4 py-2 w-full text-center capitalize ${
                  (mode === "offline" &&
                    "rounded-l-md border-r border-neutral-200") ||
                  (mode === "hybrid" &&
                    "rounded-r-md border-l border-neutral-200")
                } ${selectedMode === mode ? "bg-[#9CA1CD]" : ""}`}
              >
                {mode}
                <input
                  hidden
                  id={mode}
                  type="radio"
                  value={mode}
                  {...register("mode")}
                />
              </label>
            ))}
          </div>
          {errors?.mode && (
            <p className="text-red-600 text-xs ml-1 -mt-1.5">
              {errors?.mode.message}
            </p>
          )}
        </div>

        <div className="flex gap-20 flex-col md:flex-row">
          <div>
          <InputField type="image" id="thumbnail">
            Thumbnail Image <span className="text-red-600">*</span>
          </InputField>
          {errors?.thumbnail && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.thumbnail.message}
            </p>
          )}
          </div>

            <div>
          <InputField type="pdf" id="pdf">
            Brochure pdf <span className="text-red-600">*</span>
          </InputField>
          {errors?.pdf && (
            <p className="text-red-600 text-xs ml-1 mt-0.5">
              {errors?.pdf.message}
            </p>
          )}
            </div>
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
          {currentStep < 4 && <Button onClick={setValues} type="submit">Save and Next</Button>}
        </div>
      </form>
    </div>
  );
};

export default CourseFirstStep;
