import { useForm } from "react-hook-form";
import InputField from "../Input Field";
import Button from "../Button/Button";
import SelectOption from "../SelectOption";

export default function CourseDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const options = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <span>CourseDetails</span>
      {/* Pdf Upload */}
      <InputField
        id="pdf"
        type="pdf"
        placeholder={"Enter PDF"}
        {...register("pdf")}
      >
        Select PDF
      </InputField>

      {/* Image Upload */}
      <InputField
        id="image"
        type="image"
        placeholder={"Enter Image"}
        {...register("image")}
      >
        Select Image
      </InputField>

      <div className="flex items-center gap-5">
        {/* Your name */}
        <InputField
          id="name"
          placeholder={"Enter your name"}
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          {...register("name")}
        >
          Your Name
        </InputField>

        {/* Your age */}
        <InputField
          id="age"
          type="number"
          placeholder={"Enter your age"}
          {...register("age")}
        >
          Your Age
        </InputField>
      </div>

      <SelectOption value={2} options={options} />

      <Button>Submit</Button>
    </form>
  );
}
