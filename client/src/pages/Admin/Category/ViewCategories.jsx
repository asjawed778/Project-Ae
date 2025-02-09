import { useEffect, useState } from "react";
import { getAllCategory } from "../../../services/operations/addCourses";
import { useDispatch, useSelector } from "react-redux";

const ViewCategories = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    setLoading(true);
    const result = getAllCategory();
    result(dispatch);
    setLoading(false);

    // Replace with your API call
    // fetch("/api/categories")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCategories(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching categories:", error);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Categories</h2>
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-600 text-center">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={category._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">{category.categoryName}</h3>
                <p className="text-gray-600 mt-2">{category.description}</p>

                <p className="mt-4 text-sm text-gray-500">
                  <span className="font-medium text-gray-800">Course:</span> Full Stack Web Development
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium text-gray-800">Mode:</span> {index % 2 === 0 ? "Online" : "Offline"}
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCategories;
