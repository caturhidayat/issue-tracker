"use server";

import { type FormDataInput, IssueData } from "@/app/types/issue";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getIssues = async () => {
	const res = await fetch("/api/issue");
	// console.log(res);
	return res.json();
};

const getIssueById = async (issueId: string) => {
	const res = await fetch(`/api/issue/${issueId}`);
	return res.json();
};

// TODO: CREATE ISSUE
// * Used in app/components/FormIssue.tsx
const createIssue = async (formData: FormData) => {
	const validateForm = IssueData.safeParse({
		title: formData.get("title") as string,
		description: formData.get("description") as string,
	});

	if (!validateForm.success) {
		return {
			error: validateForm.error.flatten().fieldErrors,
		};
	}
	try {
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const data = await prisma.issue.create({
			data: {
				title,
				description,
			},
		});
		if(data) {
			formData.set("title", "");
			formData.set("description", "");
		}
		revalidatePath("/issue");
		return {
			ok: true,
		}
		// console.log({ 2: data });
	} catch (error) {
		throw new Error(String(error));
	}
};

// TODO: UPDATE ISSUE
// * Used in app/components/EditIssueDialog.tsx
const updateIssue = async (localId: number, values: FormDataInput) => {
	await prisma.issue.update({
		where: { localId },
		data: values,
	});

	revalidatePath("/issue");
};

// TODO: DELETE ISSUE
// * Used in app/components/DeleteButton.tsx
const deleteIssue = async (id: string) => {
	await prisma.issue.delete({
		where: { id: id },
	});

	revalidatePath("/issue");
};

export { getIssues, createIssue, updateIssue, deleteIssue, getIssueById };
