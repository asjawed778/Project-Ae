import InputField from "../Input Field";

export default function CourseStructure({
  currentStep,
  handleNext,
  handlePrev,
}) {
  return (
    <div className="flex flex-col gap-5">
      <InputField>Section</InputField>
    </div>
  );
}
