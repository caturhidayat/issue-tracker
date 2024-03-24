import prisma from "@/prisma/prisma";
import { Badge, Flex, Table, Text } from "@radix-ui/themes";
import { Info } from "lucide-react";
import DeleteButton from "./DeleteButton";
import EditIssueDialog from "./EditIssueDialog";

export default async function ListIssues() {
	const issue = await prisma.issue.findMany({
		orderBy: {
			createdAt: "asc",
		},
	});


	if (issue.length === 0) {
		return (
			<Flex className="justify-center gap-4">
				<Info width={"16"} height={"16"} />
				<Text size={"2"}>No issue found</Text>
			</Flex>
		);
	}

	return (
		<Flex direction={"column"} gap={"2"}>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issue?.map((issue, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Table.Row key={index}>
								<Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
								<Table.Cell>{issue.title}</Table.Cell>
								<Table.Cell>{issue.description}</Table.Cell>
								<Table.Cell>
									<Badge
										{...(issue.status === "OPEN"
											? { color: "red" }
											: issue.status === "DONE"
												? { color: "green" }
												: { color: "orange" })}
									>
										{issue.status}
									</Badge>
								</Table.Cell>
								<Table.Cell>
									<Flex align={"baseline"} gap={"4"}>
										<EditIssueDialog issue={issue} />
										<DeleteButton issueId={issue.id.toString()} />
									</Flex>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</Flex>
	);
}
