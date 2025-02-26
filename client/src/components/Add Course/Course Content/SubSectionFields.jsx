import { CiSquarePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { useFieldArray } from "react-hook-form";
import InputField from "../../Input Field";

export default function SubSectionFields({ control, sectionIndex }) {
  const {
    fields: subSectionFields,
    append: appendSubsection,
    remove: removeSubsection,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.subsections`,
  });

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h1 className="font-medium">Subsections</h1>

      {subSectionFields.map((_, subIndex) => (
        <div key={subIndex} className="flex gap-3">
          <div className="flex-1 p-2 border rounded mt-2">
            <InputField
              id="step4-subsection-title"
              {...control.register(
                `sections.${sectionIndex}.subsections.${subIndex}.title`
              )}
              placeholder="Title"
            />

            <textarea
              {...control.register(
                `sections.${sectionIndex}.subsections.${subIndex}.description`
              )}
              placeholder="Description"
              className="w-full p-2 mt-2 border border-gray-300 rounded outline-none"
            />

            <div className="flex gap-3">
              <InputField id="step4-image" type="image">
                Content Image
              </InputField>

              <InputField id="step4-pdf" type="image">
                Content Brochure pdf
              </InputField>

              <InputField id="step4-video" type="video">
                Content Video
              </InputField>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-5">
            {subSectionFields.length > 1 && (
              <button type="button" onClick={() => removeSubsection(subIndex)}>
                <MdDelete size={30} />
              </button>
            )}

            {subIndex === subSectionFields.length - 1 && (
              <button
                type="button"
                onClick={() => appendSubsection({ title: "", description: "" })}
                className="cursor-pointer"
              >
                <CiSquarePlus size={30} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
