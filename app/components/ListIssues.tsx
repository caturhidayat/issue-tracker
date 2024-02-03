"use client";
import { Flex, Table, Callout, Badge, Dialog, Button } from "@radix-ui/themes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue, getIssues } from "../actions/issue/action";
import { IssueType } from "../types/issue";
import { Info, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import EditIssueDialog from "./EditIssueDialog";

const ListIssues = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["deleteIssues"],
        mutationFn: deleteIssue,
        onSuccess: () => {
            toast.success("Issue deleted successfully", {
                duration: 4000,
                position: "bottom-center",
                icon: "❌",
            });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
        onError: (error) => {
            toast.error(error.message, {
                duration: 4000,
                position: "bottom-center",
                icon: "❌",
            });
        },
    });
    const queryIssue = useQuery({
        queryKey: ["issues"],
        queryFn: getIssues,
        refetchInterval: 1000,
    });

    return (
        <Flex direction={"column"} gap={"2"}>
            {queryIssue.data?.length === 0 ? (
                <Flex justify={"center"}>
                    <Callout.Root color='red'>
                        <Callout.Icon>
                            <Info />
                        </Callout.Icon>
                        <Callout.Text>
                            No issues found, please create one
                        </Callout.Text>
                    </Callout.Root>
                </Flex>
            ) : (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Title
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Description
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Status
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Action
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {queryIssue.data?.map(
                            (issue: IssueType, index: number) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.RowHeaderCell>
                                            {index + 1}
                                        </Table.RowHeaderCell>
                                        <Table.Cell>{issue.title}</Table.Cell>
                                        <Table.Cell>
                                            {issue.description}
                                        </Table.Cell>
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
                                                <EditIssueDialog
                                                    issue={issue}
                                                />
                                                <button
                                                    onClick={() => {
                                                        mutation.mutateAsync(
                                                            issue.id || 0
                                                        );
                                                    }}
                                                >
                                                    <XCircle
                                                        width={"16"}
                                                        height={"16"}
                                                        color='red'
                                                    />
                                                </button>
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }
                        )}
                    </Table.Body>
                </Table.Root>
            )}
        </Flex>
    );
};

export default ListIssues;
