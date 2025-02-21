import mongoose from "mongoose";
import { ICourse } from "./course.dto";
import * as CourseEnum from "./course.enum";

const courseSchema = new mongoose.Schema<ICourse>({ 
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    keypoints: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    brouchure: {
        type: String
    },
    thumbnail: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        actualPrice: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number
        },
        finalPrice: {
            type: Number,
            required: true
        }
    },
    language: {
        type: String,
        enum: Object.values(CourseEnum.Language),
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    totalLectures: {
        type: Number,
        required: true
    },
    courseMode: {
        type: String,
        enum: Object.values(CourseEnum.CourseMode),
        required: true
    },
    trailerVideo: {
        type: String
    },
    studentsEnrolled: {
        type: Number
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    isDraft: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);
