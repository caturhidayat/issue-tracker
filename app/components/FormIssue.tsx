"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Text } from "@radix-ui/themes";
import { FilePlus } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { createIssue } from "../actions/issue/action";
import { type FormDataInput, IssueData } from "../types/issue";

export default function FormIssue() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<FormDataInput>({
		defaultValues: {
			title: "",
			description: "",
		},
		resolver: zodResolver(IssueData),
	});

	const postIssue: SubmitHandler<FormDataInput> = async (data) => {
		await createIssue(data);
	};

	// Reset the form after successful submission
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		reset();
	}, [isSubmitSuccessful, reset]);

	return (
		<Flex my={"2"} direction={"column"}>
			<form onSubmit={handleSubmit(postIssue)}>
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
					<button
						disabled={isSubmitting}
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
