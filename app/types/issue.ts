import { z } from "zod";

export const IssueData = z.object({
	id: z.string().optional(),
	localId: z.number().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(3, "Description must be at least 3 characters"),
	status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).default("OPEN"),
});

export type FormDataInput = z.infer<typeof IssueData>;
