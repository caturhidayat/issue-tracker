import { Box, Button, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { Edit } from "lucide-react";
import { IssueType } from "../types/issue";
import { useFormik } from "formik";
import { useState } from "react";
import { updateIssue } from "../actions/issue/action";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const EditIssueForm = ({
    props: { issue },
}: {
    props: { issue: IssueType };
}) => {
    const queryClient = useQueryClient();

    // const mutation = useMutation({
    //     mutationKey: ["createIssues"],
    //     mutationFn: updateIssue,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["issues"] });
    //     },
    // });
    const formik = useFormik({
        initialValues: {
            title: issue.title,
            description: issue.description,
            status: issue.status,
        },
        onSubmit: async (value) => {
            try {
                // await mutation.mutateAsync(
                //     issue.id ?? 0,
                //     formik.values as IssueType
                // );
                toast.success("Issue created successfully", {
                    duration: 4000,
                    position: "bottom-center",
                    icon: "✅",
                });
                formik.resetForm();
            } catch (error) {
                toast.error("Error in creating issue", {
                    duration: 4000,
                    position: "bottom-center",
                    icon: "❌",
                });
            }
        },

        validationSchema: () => {
            return Yup.object({
                title: Yup.string().required("Required").min(3),
                description: Yup.string().required("Required").min(3),
                status: Yup.string()
                    .required("Required")
                    .oneOf(["OPEN", "IN_PROGRESS", "DONE"]),
            });
        },
    });
    return (
        <Flex my={"2"} direction={"column"}>
            <form onSubmit={formik.handleSubmit}>
                <Flex my={"2"} direction={"column"} gap={"4"}>
                    <label>
                        <Text as='div' size={"2"} weight={"bold"}>
                            Issue Title
                        </Text>
                        <TextField.Input
                            name='title'
                            type='text'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder='Issue'
                        />
                    </label>
                    {formik.errors.title && formik.touched.title ? (
                        <Text size={"2"} color='red'>
                            {formik.errors.title}
                        </Text>
                    ) : null}
                    <label>
                        <Text as='div' size={"2"} weight={"bold"}>
                            Description
                        </Text>
                        <TextField.Input
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder='Enter Description of issue'
                        />
                    </label>
                    {formik.errors.description && formik.touched.description ? (
                        <Text size={"2"} color='red'>
                            {formik.errors.description}
                        </Text>
                    ) : null}
                    <label>
                        <Text as='div' size={"2"} weight={"bold"}>
                            Status
                        </Text>
                        <Select.Root defaultValue={issue.status}>
                            <Select.Trigger />
                            <Select.Content position='popper'>
                                <Select.Item value='OPEN'>OPEN</Select.Item>
                                <Select.Item value='IN_PROGRESS'>
                                    IN_PROGRESS
                                </Select.Item>
                                <Select.Item value='DONE'>DONE</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </label>

                    <Button className='bg-violet-700' type='submit'>
                        <Edit />
                        Save Edit
                    </Button>
                </Flex>
            </form>
            <Box>
                <Toaster />
            </Box>
        </Flex>
    );
};

export default EditIssueForm;
