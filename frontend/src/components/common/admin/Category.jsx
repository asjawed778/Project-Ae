import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory, editCategories } from '../../../services/operations/addCourses';
import axios from 'axios';
import toast from 'react-hot-toast';
const Category = () => {

  const dispatch = useDispatch() ;
  const category = useSelector( (state) => state.categories.categories ); 
  const loading = useSelector((state) => state.loading.loading) ;
  console.log(category) ;

  const [categories, setCategories] = useState( category ); // To store all categories
  const [newCategory, setNewCategory] = useState({ name: '', description: '' }); // For new category input
  const [editCategory, setEditCategory] = useState(null); // To track which category is being edited
  const [editedCategory, setEditedCategory] = useState({ name: '', description: '' }); // To hold the edited category details

  // Fetch categories from backend
  useEffect(() => {
    setCategories(category);
  }, [category]);

  useEffect(() => {
    dispatch(getAllCategory()) ;
  },[]);

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      return toast.error('Please fill in both the name and description');
    }
    
    console.log(newCategory) ;
    dispatch(addCategory(newCategory)) ;
    setNewCategory({ name: '', description: '' });
    dispatch(getAllCategory()) ;
  };

  const handleEditCategory = async (id) => {
    if (!editedCategory.name || !editedCategory.description) {
      return toast.error('Please fill in both the name and description');
    }
    
    console.log("edit", id, "editedCategory", editedCategory) ;
    dispatch(editCategories(editedCategory, id)) ; 
    setEditCategory(null) ;
    setEditedCategory({name:'', description:''}) ;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-[800px] mx-auto"> 

      { loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )} 


      <h1 className="text-xl font-sans mb-4">Add Category</h1>

      {/* Add Category */}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          placeholder="category name"
          className="border-b font-sans p-1 w-full mb-2 outline-none focus:border-blue-400  text-gray-700 font-sm text-sm"
        />
        <input
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          placeholder="category description"
          className="border-b font-sans p-1 w-full mb-2 outline-none focus:border-blue-400  text-gray-700 font-sm text-sm"
        ></input>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {/* List of Categories */}
      <ul className="space-y-2">
        {categories?.map((category) => (
          <li
            key={category._id}
            className="flex flex-col bg-gray-100 p-2 rounded mb-2"
          >
            {editCategory === category._id ? (
              <div>
                <input
                  type="text"
                  value={editedCategory.name}
                  onChange={(e) =>
                    setEditedCategory({
                      ...editedCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="Edit category name"
                  className="border p-2 rounded w-full mb-2"
                />
                <textarea
                  value={editedCategory.description}
                  onChange={(e) =>
                    setEditedCategory({
                      ...editedCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Edit category description"
                  className="border p-2 rounded w-full mb-2"
                ></textarea>
                <button
                  onClick={() => handleEditCategory(category._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{category.categoryName}</span>
                  <button
                    onClick={() => {
                      setEditCategory(category._id);
                      setEditedCategory({
                        name: category.categoryName,
                        description: category.description,
                      });
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
