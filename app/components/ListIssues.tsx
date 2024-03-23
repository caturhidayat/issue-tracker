import prisma from "@/prisma/prisma";
import { Badge, Flex, Table } from "@radix-ui/themes";
import { Info } from "lucide-react";
import DeleteButton from "./DeleteButton";
import EditIssueDialog from "./EditIssueDialog";

export default async function ListIssues() {
	const issue = await prisma.issue.findMany({
		orderBy: {
			createdAt: "asc",
		},
	});

	return (
		<Flex direction={"column"} gap={"2"}>
			{issue?.length === 0 ? (
				<Flex justify={"center"}>
					<span className="flex gap-4 py-8">
						<Info width={"24"} height={"24"} />
						No issues found, please create one
					</span>
				</Flex>
			) : (
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
			)}
		</Flex>
	);
}
