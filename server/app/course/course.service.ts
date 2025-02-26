import { ICourse, ISection, ISubSection } from "./course.dto";
import courseSchema from "./course.schema";
import sectionSchema from "./section.schema";
import subSectionSchema from "./subSection.schema";

export const addCourseDetails = async (courseId: string, data: ICourse) => {
    let course;

    if (courseId) {
        course = await courseSchema.findByIdAndUpdate(courseId, { ...data });
    } else {
        course = await courseSchema.create({ ...data });
    }

    return course as ICourse;
};

export const addAdditionalDetails = async (courseId: string, data: ICourse) => {
    const course = await courseSchema.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
    );

    return course as ICourse;
};

export const addCourseStructure = async (courseId: string, data: (ISection & { subSections: ISubSection[] })[]) => {
    // Step 1: Create all subsections in parallel for each section
    const sectionPromises = data.map(async (section) => {
        const subsectionDocs = await subSectionSchema.insertMany(section.subSections);
        const subsectionIds = subsectionDocs.map((sub) => sub._id);

        // Step 2: Create section with subsection IDs
        const savedSection = await sectionSchema.create({
            title: section.title,
            description: section.description,
            subSections: subsectionIds,
        });

        return savedSection._id;
    });

    // Execute all section insertions in parallel
    const sectionIds = await Promise.all(sectionPromises);

    // Step 3: Update Course with new sections
    const updatedCourse = await courseSchema.findByIdAndUpdate(
        courseId,
        { $push: { sections: { $each: sectionIds } } },
        { new: true }
    );

    return updatedCourse;
};

export const getCourseById = async (courseId: string) => {
    const course = await courseSchema.findById(courseId);
    return course as ICourse;
};