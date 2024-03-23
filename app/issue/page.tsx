import React from "react";
import { Box, Text } from "@radix-ui/themes";
import FormIssue from "../components/FormIssue";
import ListIssues from "../components/ListIssues";

const IssuePage = () => {
	return (
		<div>
			<Box display={"block"}>
				<Text size={"6"} weight={"bold"}>
					Create Issue Page
				</Text>
			</Box>
			<Box className="py-4">
				<Text size={"2"} color="orange" weight={"medium"}>
					This application database uses AWS, to prevent entering excessive data
					and causing excessive costs, issue creation is limited
				</Text>
			</Box>
			<FormIssue />
			<ListIssues />
		</div>
	);
};

export default IssuePage;
