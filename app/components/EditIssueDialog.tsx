import { Flex, Dialog, Button, TextField, Text } from "@radix-ui/themes";
import { Edit } from "lucide-react";
import Link from "next/link";
import { IssueType } from "../types/issue";
import { useFormik, useField } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from "../actions/issue/action";

const EditIssueDialog = ({ issue }: { issue: IssueType }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["updateIssue"],
        mutationFn: async (value: IssueType) => {
            await updateIssue(issue.id ?? 0, value);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
    });

    const formik = useFormik({
        initialValues: {
            title: issue.title,
            description: issue.description,
            status: issue.status,
        },
        onSubmit: async (values) => {
            console.log(values);
        },
    });
    return (
        <Flex>
            <form onSubmit={formik.handleSubmit}>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Link href={"#"}>
                            <Edit width={"16"} height={"16"} />
                        </Link>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Edit Issue</Dialog.Title>
                        <Dialog.Description size='2' mb='4'>
                            Make changes to your Issue 🪲
                        </Dialog.Description>

                        <Flex direction='column' gap='3'>
                            <label>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    Title
                                </Text>
                                <TextField.Input
                                    name='title'
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                            </label>
                            <label>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    Description
                                </Text>
                                <TextField.Input
                                    name='description'
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                />
                            </label>
                            <label>
                                <Text>Status</Text>
                            </label>
                            <select
                                name='status'
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                className='border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                            >
                                <option value='OPEN'>OPEN</option>
                                <option value='IN_PROGRESS'>IN_PROGRESS</option>
                                <option value='DONE'>DONE</option>
                            </select>
                        </Flex>

                        <Flex gap='3' mt='4' justify='end'>
                            <Dialog.Close>
                                <Button
                                    className='bg-violet-200'
                                    variant='soft'
                                    color='gray'
                                >
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button
                                    className='bg-violet-700'
                                    type='submit'
                                    onClick={() => {
                                        mutation.mutate(formik.values);
                                    }}
                                >
                                    Save
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </form>
        </Flex>
    );
};

export default EditIssueDialog;
