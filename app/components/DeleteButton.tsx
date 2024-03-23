"use client";

import { XCircle } from "lucide-react";
import { deleteIssue } from "../actions/issue/action";

export default function DeleteButton(props: { issueId: string }) {
	const removeIssue = async () => {
		await deleteIssue(props.issueId);
	};
	return (
		<button onClick={removeIssue}>
			<XCircle width={"16"} height={"16"} color="tomato" />
		</button>
	);
}
