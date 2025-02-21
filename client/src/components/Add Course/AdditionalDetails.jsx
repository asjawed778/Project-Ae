import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import required from "../../../public/imgs/required.svg";

import { useFieldArray, useForm, Controller } from "react-hook-form";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import InputField from "../Input Field";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

export default function AdditionalDetails() {
  const license_key = import.meta.env.VITE_CK_LICENSE_KEY;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { keypoints: [""], description: "", tags: [""] },
  });

  const {
    fields: keypoints,
    append: keypointAppend,
    remove: keypointRemove,
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

  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(".modal-content") === null) {
      setOpenDescriptionModal(false);
    }
  };

  useEffect(() => {
    if (openDescriptionModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDescriptionModal]);

  if (openDescriptionModal)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/75">
        <div className="modal-content bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Description</h2>
          <div className="flex flex-col gap-5">
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
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setOpenDescriptionModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else
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
            {keypoints.length > 0 &&
              keypoints.map((field, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={field.value}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                  />

                  <Button>
                    <RiDeleteBin6Line size={20} />
                  </Button>
                </div>
              ))}

            <div className="flex items-end gap-2">
              <InputField
                id="keypoints"
                type="text"
                placeholder={"Add key points"}
                required={true}
                {...register(`newKeypoint`)}
                parentClassName="flex-2"
              />
              <Button
                type="button"
                onClick={() => {
                  const newKeypoint = document.getElementById("keypoints");
                  if (newKeypoint && newKeypoint.value.trim()) {
                    keypointAppend({ value: newKeypoint.value });
                    newKeypoint.value = ""; // Clear input after adding
                  }
                }}
              >
                <CiSquarePlus size={25} />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-5">
            <div className="flex items-end gap-2">
              <InputField
                id="tags"
                type="text"
                placeholder={"Enter Tags"}
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
              <Button
                onClick={() => {
                  const newTag = document.getElementById("tags");
                  if (newTag && newTag.value.trim()) {
                    tagAppend({ value: newTag.value });
                    newTag.value = ""; // Clear input after adding
                  }
                }}
              >
                add
              </Button>
            </div>

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

          {/* 2-Column Section */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-5">
            {/* First Column */}
            <div className="flex flex-col gap-5 w-full">
              <InputField
                id="duraion"
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
            <InputField
              type="video"
              id="trailer-video"
              labelClassName="relative flex"
            >
              <p>Trailer Video</p>
              <img
                src={required}
                alt="required"
                className="size-2 absolute top-1 -right-3"
              />
            </InputField>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button>Prev</Button>
          <Button type="submit">Save and Next</Button>
        </div>
      </form>
    );
}

/*

<div className="flex-1 flex flex-col justify-around gap-5">
            <Button
              onClick={() => setOpenDescriptionModal(true)}
              className="w-full"
            >
              Add Description
            </Button>

            //  Duration
            <InputField
              id="duration"
              type="number"
              placeholder="1+ Hours"
              {...register(`duration`)}
              labelClassName="font-semibold text-2xl"
            >
              Duration
            </InputField>

            // Total Lectures
            <InputField
              id="total-lectures"
              type="number"
              placeholder="10+ Lectures"
              {...register(`total-lectures`)}
              labelClassName="font-semibold text-2xl"
            >
              Total Lectures
            </InputField>

            // Trailer Video
            <InputField
              id="trailer-video"
              type="video"
              {...register(`trailer-video`)}
              labelClassName="font-semibold text-2xl"
            >
              Upload Video
            </InputField>
          </div>

*/
