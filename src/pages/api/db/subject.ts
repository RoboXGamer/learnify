import type { APIRoute } from "astro";
import {
  addSubject,
  deleteSubject,
} from "@/lib/db/controllers/subject.controller";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const data = await request.formData();
  const subjectName = data.get("name")?.toString()!;
  const userId = locals.session?.userId!;

  if (!subjectName || !userId) {
    return new Response(null, {
      status: 400,
      statusText: "Required fields missing",
    });
  }

  try {
    const subject = await addSubject({
      userId,
      subjectName,
    });
    if (subject?.success) {
      return new Response(JSON.stringify(subject), {
        status: 200,
        statusText: "Subject added successfully",
      });
    }
    return new Response(JSON.stringify(subject), {
      status: 400,
      statusText: subject.msg,
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 400,
      statusText: "Error adding subject",
    });
  }
};

export const DELETE: APIRoute = async ({ request, redirect, locals }) => {
  const data = await request.json();
  const subjectId = data?.subjectId;
  const userId = locals.session?.userId!;

  if (!subjectId || !userId) {
    return new Response(null, {
      status: 400,
      statusText: "Required fields missing",
    });
  }

  try {
    const temp = await deleteSubject({
      subjectId,
      userId,
    });
    if (temp?.success) {
      return redirect("/dashboard/subjects");
    }
    return new Response(null, {
      status: 400,
      statusText: "Failed to delete subject",
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 400,
      statusText: "Error deleting subject",
    });
  }
};

// export const
// list of all the http methods here
// GET
// POST
// PUT
// PATCH
// DELETE
// HEAD
// OPTIONS
// CONNECT
// TRACE

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
