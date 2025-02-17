import { useFieldArray, useForm, Controller } from "react-hook-form";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import InputField from "../Input Field";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

export default function CourseDetails() {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        <div className="flex gap-10">
          <div className="flex-1 flex flex-col justify-around gap-5">
            <div className="flex items-end gap-5">
              <InputField
                id="keypoints"
                type="text"
                placeholder={"Enter Keypoints"}
                {...register(`newKeypoint`)}
                className="w-[20rem]"
                labelClassName="font-semibold text-2xl"
              >
                Keypoints
              </InputField>
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  const newKeypoint = document.getElementById("keypoints");
                  if (newKeypoint && newKeypoint.value.trim()) {
                    keypointAppend({ value: newKeypoint.value });
                    newKeypoint.value = ""; // Clear input after adding
                  }
                }}
              >
                Add Keypoint
              </Button>
            </div>

            {/* Dropdown Display */}
            {keypoints.length > 0 && (
              <div className="mt-4">
                <select className="w-full p-2 border rounded outline-none">
                  {keypoints.map((field, index) => (
                    <option key={field.id} value={field.value}>
                      {field.value}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-end gap-5">
              <InputField
                id="tags"
                type="text"
                placeholder={"Enter Tags"}
                {...register(`newTag`)}
                className="w-[20rem]"
                labelClassName="font-semibold text-2xl"
              >
                Tags
              </InputField>
              <Button
                type="button"
                onClick={() => {
                  const newTag = document.getElementById("tags");
                  if (newTag && newTag.value.trim()) {
                    tagAppend({ value: newTag.value });
                    newTag.value = ""; // Clear input after adding
                  }
                }}
                className="w-full"
              >
                Add Tag
              </Button>
            </div>

            {/* Dropdown Display */}
            {tags.length > 0 && (
              <div className="mt-4">
                <select className="w-full p-2 border rounded outline-none">
                  {tags.map((field, index) => (
                    <option key={field.id} value={field.value}>
                      {field.value}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-around gap-5">
            <Button
              onClick={() => setOpenDescriptionModal(true)}
              className="w-full"
            >
              Add Description
            </Button>

            {/* Duration */}
            <InputField
              id="duration"
              type="number"
              placeholder="1+ Hours"
              {...register(`duration`)}
              labelClassName="font-semibold text-2xl"
            >
              Duration
            </InputField>

            {/* Total Lectures */}
            <InputField
              id="total-lectures"
              type="number"
              placeholder="10+ Lectures"
              {...register(`total-lectures`)}
              labelClassName="font-semibold text-2xl"
            >
              Total Lectures
            </InputField>

            {/* Trailer Video */}
            <InputField
              id="trailer-video"
              type="video"
              {...register(`trailer-video`)}
              labelClassName="font-semibold text-2xl"
            >
              Upload Video
            </InputField>
          </div>
        </div>
        <Button type="submit" className="w-[20rem] ml-auto">
          Submit
        </Button>
      </form>
    );
}
