import { FaPlus } from "react-icons/fa";
import required from "../../../public/imgs/required.svg";

import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../Input Field";
import { yupResolver } from "@hookform/resolvers/yup";

import { fourthStepValidationSchema } from "./Schema/fourthStepValidationSchema";
import SubSectionFields from "./Course Content/SubSectionFields";
import Button from "../Button/Button";

export default function CourseContent({ currentStep, handleNext, handlePrev }) {
  // React Hook Form
  const { control, handleSubmit, register, watch } = useForm({
    resolver: yupResolver(fourthStepValidationSchema),
    defaultValues: {
      sections: [
        {
          title: "",
          description: "",
          subsections: [{ title: "", description: "" }],
        },
      ],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    handleNext();
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="relative w-fit ml-5">
        <span>Section</span>

        <img
          src={required}
          alt="required"
          className="size-2 absolute -right-3 top-1"
        />
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {sectionFields.map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="flex flex-col gap-3 border p-4 rounded-md shadow-sm"
          >
            {/* Section Title */}
            <InputField
              id="step4-title"
              {...register(`sections.${sectionIndex}.title`)}
              placeholder="Title"
            >
              Title :
            </InputField>

            {/* Section Description */}
            <label htmlFor="step4-description">Description :</label>
            <textarea
              id="step4-description"
              {...register(`sections.${sectionIndex}.description`)}
              placeholder="Description"
              className="w-full p-2 mt-2 border border-gray-300 rounded outline-none"
            />

            {/* Subsections */}
            <SubSectionFields control={control} sectionIndex={sectionIndex} />

            {/* Remove Section Button */}
            {sectionFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="text-red-500 ml-auto px-5 py-1 border border-red-500 rounded-md cursor-pointer"
              >
                Remove Section
              </button>
            )}
          </div>
        ))}

        {/* Add Section Button */}
        <Button
          type="button"
          onClick={() =>
            appendSection({
              title: "",
              description: "",
              subsections: [{ title: "", description: "" }],
            })
          }
          className="flex items-center gap-2"
        >
          <span>Add Section</span>
          <FaPlus />
        </Button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
