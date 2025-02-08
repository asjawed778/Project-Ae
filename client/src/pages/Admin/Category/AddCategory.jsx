import { useState } from "react";
import { useForm } from "react-hook-form";

const CourseDetailsForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [keyPoints, setKeyPoints] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories] = useState([
    { id: "1", name: "Programming" },
    { id: "2", name: "Design" },
    { id: "3", name: "Marketing" },
  ]);

  const handleAddItem = (field, setField, value) => {
    if (value.trim()) {
      setField((prev) => [...prev, value.trim()]);
      setValue(field, [...watch(field), value.trim()]);
    }
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
    >
      <input
        {...register("courseTitle", { required: true })}
        placeholder="Course Title *"
        className="input w-full p-2 border rounded"
      />
      <input
        {...register("courseSubTitle", { required: true })}
        placeholder="Course Subtitle *"
        className="input w-full p-2 border rounded"
      />

      <div>
        <input
          type="text"
          placeholder="Add key point"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem("keyPoints", setKeyPoints, e.target.value);
              e.target.value = "";
            }
          }}
          className="input w-full p-2 border rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {keyPoints.map((point, index) => (
            <span
              key={index}
              className="badge bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              {point}
            </span>
          ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Add tag"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem("tags", setTags, e.target.value);
              e.target.value = "";
            }
          }}
          className="input w-full p-2 border rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge bg-blue-200 text-blue-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <textarea
        {...register("courseDescription", { required: true })}
        placeholder="Course Description *"
        className="input w-full p-2 border rounded"
      />
      <input
        {...register("courseMode", { required: true })}
        placeholder="Course Mode *"
        className="input w-full p-2 border rounded"
      />
      <input
        {...register("courseLanguage", { required: true })}
        placeholder="Course Language *"
        className="input w-full p-2 border rounded"
      />

      <select
        {...register("category", { required: true })}
        className="input w-full p-2 border rounded"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        {...register("brochure")}
        type="file"
        accept="application/pdf"
        className="input w-full p-2 border rounded"
      />
      <input
        {...register("thumbnail")}
        type="file"
        accept="image/*"
        className="input w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseDetailsForm;
