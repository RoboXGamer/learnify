import { UserSubject } from "@/lib/db/models/user-subject.model";
import { Subject } from "@/lib/db/models/subject.model";

async function getSubjectsList(userId: string) {
  try {
    if (!userId) return [];
    const SubjectsData = await UserSubject.find({ user_id: userId });
    const subjectIds = SubjectsData.map((subject) => subject.subject_id);

    let Result = await Subject.find({ _id: { $in: subjectIds } });
    return Result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function addSubject({
  userId,
  subjectName,
}: {
  userId: string;
  subjectName: string;
}) {
  if (!userId || !subjectName) return { success: false };
  // Create the slug
  const slug = subjectName
    .trim()
    .toLowerCase()
    // Replace spaces with hyphens
    .replaceAll(" ", "-");
  // console.log({ slug });
  // Check for existing subject
  try {
    const existingSubject = await Subject.findOne({ slug });
    if (existingSubject) {
      const subjectId = existingSubject._id;
      // Check if the subject is already added to the user
      const existingUserSubject = await UserSubject.findOne({
        user_id: userId,
        subject_id: subjectId,
      });
      if (existingUserSubject) {
        return {
          success: false,
          msg: "Subject already added to user",
        };
      }
      // Add the subject to the user
      const userSubject = await UserSubject.create({
        user_id: userId,
        subject_id: subjectId,
      });
      if (userSubject === null) {
        return {
          success: false,
          msg: "Failed to add subject to user",
        };
      }
      return {
        success: true,
        msg: "Subject added successfully",
      };
    }
    const temp = await Subject.create({ name: subjectName, slug });
    if (temp === null) {
      return {
        success: false,
        msg: "Failed to add subject",
      };
    }
    // Add the subject to the user
    const userSubject = await UserSubject.create({
      user_id: userId,
      subject_id: temp._id,
    });
    if (userSubject === null) {
      return {
        success: false,
        msg: "Failed to add subject to user",
      };
    }
    return {
      success: true,
      msg: "Subject added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Error adding subject",
    };
  }
}

async function getSubjectDetails(subjectSlug: string) {
  const subject = await Subject.findOne({ slug: subjectSlug });
  if (!subject) return null;
  return subject;
}

async function deleteSubject({
  subjectId,
  userId,
}: {
  subjectId: string;
  userId: string;
}) {
  if (!subjectId || !userId) return { success: false };
  try {
    const temp = await UserSubject.deleteOne({
      user_id: userId,
      subject_id: subjectId,
    });
    if (temp.deletedCount === 1) {
      return {
        success: true,
        msg: "Subject deleted for this user successfully",
      };
    } else {
      return {
        success: false,
        msg: "Failed to delete subject",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Error deleting subject",
    };
  }
}
export { getSubjectsList, addSubject, getSubjectDetails, deleteSubject };
