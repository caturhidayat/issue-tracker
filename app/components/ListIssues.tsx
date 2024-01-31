"use client";
import { Flex, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

type IssueType = {
    id: number;
    title: string;
    description: string;
};

const ListIssues = () => {
    // const queryClient = useQueryClient();

    const queryIssue = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await fetch("/api/issue");
            console.log(res);
            return res.json();
        },
    });

    return (
        <Flex direction={"column"} gap={"2"}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            Description
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {queryIssue.data?.map((issue: IssueType) => {
                        return (
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>{issue.id++}</Table.RowHeaderCell>
                                <Table.Cell>{issue.title}</Table.Cell>
                                <Table.Cell>{issue.description}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
};

export default ListIssues;
