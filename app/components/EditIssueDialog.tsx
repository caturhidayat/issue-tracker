"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Issue } from "@prisma/client";
import {
	Button,
	Dialog,
	Flex,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { Edit, FilePlus } from "lucide-react";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { updateIssue } from "../actions/issue/action";
import { type FormDataInput, IssueData } from "../types/issue";

export default function EditIssueDialog({ issue }: { issue: Issue }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormDataInput>({
		defaultValues: {
			title: issue.title,
			description: issue.description,
			status: issue.status,
		},
		resolver: zodResolver(IssueData),
	});

	// Submiting the form
	const submitForm: SubmitHandler<FormDataInput> = async (formData) => {
		console.log(formData);
		// Send the data to the server
		await updateIssue(issue.localId, formData);
	};
	return (
		<Flex>
			<Dialog.Root>
				<Dialog.Trigger>
					<Edit width={"16"} height={"16"} className="cursor-pointer" />
				</Dialog.Trigger>
				<Dialog.Content>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex my={"2"} direction={"column"} gap={"4"}>
							<label>
								<Text as="div" size={"2"} weight={"bold"}>
									Issue Title
								</Text>
								<input
									type="text"
									{...register("title", { required: true })}
									placeholder="Enter Title of issue"
									className="border border-gray-300 rounded-md my-2 p-1 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
								/>
								{errors.title && (
									<Text as="span" size={"2"} color={"red"}>
										{errors.title.message}
									</Text>
								)}
							</label>
							<label>
								<Text as="div" size={"2"} weight={"bold"}>
									Description
								</Text>
								<input
									type="text"
									{...register("description", { required: true })}
									placeholder="Enter Description of issue"
									className="border border-gray-300 rounded-md my-2 p-1 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
								/>
								{errors.description && (
									<Text as="span" size={"2"} color={"red"}>
										{errors.description.message}
									</Text>
								)}
							</label>
							<label>
								<Text as="div" size={"2"} weight={"bold"}>
									Status
								</Text>
								<select
									{...register("status", { required: true })}
									className="border border-gray-300 rounded-md my-2 p-1 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
								>
									<option value="OPEN">OPEN</option>
									<option value="IN_PROGRESS">IN PROGRESS</option>
									<option value="DONE">DONE</option>
								</select>
								{errors.status && (
									<Text as="span" size={"2"} color={"red"}>
										{errors.status.message}
									</Text>
								)}
							</label>

							<Flex gap={"6"} justify={"end"} align={"center"}>
								<Button color="violet">
									<FilePlus width={"16"} height={"16"} />
									Save
								</Button>
								<Dialog.Close>
									<Button size={"3"} variant="ghost">Cancel</Button>
								</Dialog.Close>
							</Flex>
						</Flex>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</Flex>
	);
}
