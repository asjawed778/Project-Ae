import { ICourse } from "./course.dto";
import courseSchema from "./course.schema";


export const addCourseDetails = async(courseId: string, data: ICourse) => {
    let course;
    
    if(courseId) {
        course = await courseSchema.findByIdAndUpdate(courseId, {...data});
    } else {
        course = await courseSchema.create({...data}); 
    }
    
    return course as ICourse;
};

export const addAdditionalDetails = async(courseId: string, data: ICourse) => {
    const course = await courseSchema.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true } 
    );

    return course as ICourse;
};

// export const addCourseStructure = async()

export const getCourseById = async(courseId: string) => {
    const course = await courseSchema.findById(courseId);
    return course as ICourse;
};