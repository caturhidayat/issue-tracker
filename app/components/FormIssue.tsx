import { Flex, Text } from "@radix-ui/themes";
import { FilePlus } from "lucide-react";
import { createIssue } from "../actions/issue/action";
import { type FormDataInput, IssueData } from "../types/issue";

export default function FormIssue() {
	const postIssue = async (formData: FormData) => {
		"use server";
		const data = await createIssue(formData);

		console.log({ 1: data });

	};
	return (
		<Flex my={"2"} direction={"column"}>
			<form action={postIssue}>
				<Flex my={"2"} direction={"column"} gap={"4"}>
					<label>
						<Text as="div" size={"2"} weight={"bold"}>
							Issue Title
						</Text>
						<input
							type="text"
							name="title"
							placeholder="Enter Title of issue"
							className="border border-gray-300 rounded-md my-2 p-1 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
						/>
					</label>
					<label>
						<Text as="div" size={"2"} weight={"bold"}>
							Description
						</Text>
						<input
							type="text"
							name="description"
							placeholder="Enter Description of issue"
							className="border border-gray-300 rounded-md my-2 p-1 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
						/>
					</label>
					<button
						type="submit"
						className="bg-violet-500 text-white p-1 rounded-md flex gap-2 items-center justify-center"
					>
						<FilePlus width={"16"} height={"16"} />
						Create Issue
					</button>
				</Flex>
			</form>
		</Flex>
	);
}
