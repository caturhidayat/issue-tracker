"use server";

import type { FormDataInput } from "@/app/types/issue";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

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
const createIssue = async (formData: FormDataInput) => {
	try {
		const { title, description } = formData;
		await prisma.issue.create({
			data: {
				title,
				description,
			},
		});
		revalidatePath("/issue");
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
