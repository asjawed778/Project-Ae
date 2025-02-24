import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import required from "../../../public/imgs/required.svg";

import { useFieldArray, useForm, Controller } from "react-hook-form";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import InputField from "../Input Field";
import Button from "../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import SecondStepValidationSchema from "./Schema/secondStepValidationSchema";
import { useEffect, useState } from "react";

export default function AdditionalDetails({
  currentStep,
  handleNext,
  handlePrev,
}) {
  const license_key = import.meta.env.VITE_CK_LICENSE_KEY;

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { keypoints: [{ value: "" }], description: "", tags: [""] },
    // resolver: yupResolver(SecondStepValidationSchema),
  });

  const {
    fields: keypoints,
    append: appendKeypoint,
    remove: removeKeypoint,
  } = useFieldArray({
    control,
    name: "keypoints",
  });

  const {
    fields: tags,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const addKeypoint = () => {
    console.log("keypoints: ", watch("keypoints"));

    if (keypoints[keypoints.length - 1].value.trim() !== "") {
      console.log("gi");

      appendKeypoint({ value: "" });
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        {/* Key points */}
        <div className="flex flex-col gap-3">
          <div className="relative flex gap-1 w-fit">
            <span>Key Points</span>
            <img
              src={required}
              alt="required"
              className="absolute -right-3 top-2 w-[7px]"
            />
          </div>

          {/* Show Keypoints */}
          {keypoints.map((keypoint, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Controller
                name={`keypoints.${index}.value`}
                control={control}
                defaultValue={keypoint.value}
                render={({ keypoint }) => (
                  <input
                    {...keypoint}
                    className="w-full p-2 rounded border border-gray-300 outline-none"
                    placeholder={`Key Point ${index + 1}`}
                  />
                )}
              />

              <div className="flex items-center gap-3">
                {keypoints.length > 1 && (
                  <Button type="button" onClick={() => removeKeypoint(index)}>
                    <RiDeleteBin6Line size={25} />
                  </Button>
                )}

                {keypoints.length - 1 === index && (
                  <Button
                    type="button"
                    onClick={addKeypoint}
                    // disabled={!keypoints[index].value.trim()}
                  >
                    <CiSquarePlus size={25} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-5">
          <InputField
            id="tags"
            type="text"
            placeholder={"Enter Tags"}
            onClick={() => {
              const newTag = document.getElementById("tags");
              if (newTag && newTag.value.trim()) {
                tagAppend({ value: newTag.value });
                newTag.value = ""; // Clear input after adding
              }
            }}
            {...register(`newTag`)}
            labelClassName="relative flex"
            parentClassName="w-full"
          >
            <p>Tags</p>
            <img
              src={required}
              alt="required"
              className="size-2 absolute top-1 -right-3"
            />
          </InputField>

          {/* Show Tags */}
          <div className="min-h-[7rem] flex flex-wrap gap-5 w-full px-3 py-1 border border-gray-300 rounded-md">
            {tags.length > 0 &&
              tags.map((field, index) => (
                <p
                  key={index}
                  className="bg-[#D0D7EFB2] h-fit w-fit py-1 px-8 rounded-full"
                >
                  {field.value}
                </p>
              ))}
          </div>
        </div>

        {/* Discription */}
        <div className="flex flex-col gap-5">
          <div className="relative flex gap-1 w-fit">
            <span>Edit Description</span>
            <img
              src={required}
              alt="required"
              className="absolute -right-3 top-1 w-[7px]"
            />
          </div>
          <div className="flex flex-col gap-5 max-h-[10rem] overflow-y-hidden">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <CKEditor
                  editor={ClassicEditor}
                  data={field.value}
                  onChange={(event, editor) => field.onChange(editor.getData())}
                  config={{
                    licenseKey: license_key,
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-5">
          {/* First Column */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            <InputField
              id="duraion"
              // required={true}
              placeholder="eg. 30m:02s"
              labelClassName="relative flex"
            >
              <p>Duration</p>
              <img
                src={required}
                alt="required"
                className="size-2 absolute top-1 -right-3"
              />
            </InputField>

            <InputField
              id="total-lecture"
              required={true}
              placeholder="eg. 1"
              labelClassName="relative flex"
            >
              <p>Total Lecture</p>
              <img
                src={required}
                alt="required"
                className="size-2 absolute top-1 -right-3"
              />
            </InputField>
          </div>

          {/* Second Column */}
          {/* <InputField
            type="video"
            id="trailer-video"
            required={true}
            parentClassName="flex-1"
            labelClassName="relative flex"
          >
            <p>Trailer Video</p>
            <img
              src={required}
              alt="required"
              className="size-2 absolute top-1 -right-3"
            />
          </InputField> */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <Button onClick={handlePrev}>Prev</Button>
        <Button type="submit">Save and Next</Button>
      </div>
    </form>
  );
}
