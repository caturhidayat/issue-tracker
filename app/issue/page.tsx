import { Box, Text } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import FormIssue from "../components/FormIssue";
import ListIssues from "../components/ListIssues";

export default async function IssuePage() {
	revalidatePath("/issue");
	return (
		<div>
			<Box display={"block"}>
				<Text size={"6"} weight={"bold"}>
					Create Issue Page
				</Text>
			</Box>
			<Box className="py-4">
				<Text size={"2"} color="orange" weight={"medium"}>
					This is a simple issue tracker app. You can create, update, and delete
					issues.
				</Text>
			</Box>
			<FormIssue />

			<ListIssues />
		</div>
	);
}
