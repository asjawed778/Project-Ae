const Category = require('../../models/course/Category');

exports.addCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        // Check if name and description are provided
        if (!name || !description) {
            const err = new Error("Please enter Category name and description.");
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

