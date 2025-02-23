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
}