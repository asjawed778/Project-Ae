const Category = require('../../models/course/Category');
const mongoose = require('mongoose');

exports.addCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            const err = new Error("Category name and description cannot be empty.");
            err.status = 400;
            return next(err);
        }

        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryName: name });
        if (existingCategory) {
            const err = new Error("Category with this name already exists.");
            err.status = 409;
            return next(err);
        }

        // Create a new Category
        const newCategory = new Category({
            categoryName: name,
            description,
        });

        // Save the category to the database
        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category: newCategory,
        });
    } catch (error) {
        console.error("Error in addCategory:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

exports.getAllCategory = async (req, res, next) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Check if categories exist
        if (!categories || categories.length === 0) {
            const err = new Error("No categories found.");
            err.status = 404;
            return next(err);
        }

        // Send response with the list of categories
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error("Error in getAllCategory:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

exports.editCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        // Validate categoryId
        if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
            const err = new Error("Invalid or missing Category Id in params");
            err.status = 400;
            return next(err);
        }
        const { name, description } = req.body;

        // Check if name and description are provided and not empty
        if (!name?.trim() || !description?.trim()) {
            const err = new Error("Category name and description cannot be empty.");
            err.status = 400;
            return next(err);
        }

        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryName: name });
        if (existingCategory) {
            const err = new Error("Category with this name already exists.");
            err.status = 409;
            return next(err);
        }

        const category = await Category.findByIdAndUpdate(
            categoryId,
            {
                categoryName: name.trim(),
                description: description.trim()
            },
            { new: true }
        );

        if (!category) {
            const err = new Error("category does not exits");
            err.status = 404;
            return next(err);
        }

        return res.status(200).json({
            success: true,
            message: "Category Updated successfully",
            category
        })

    } catch (error) {
        // console.error("Error in edit category:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: error.message
        });
    }
}

