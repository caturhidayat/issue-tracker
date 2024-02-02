"use client";
import { TextField, Text, Flex, Button, Box } from "@radix-ui/themes";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { createIssue } from "../actions/issue/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IssueType } from "../types/issue";
import { FilePlus } from "lucide-react";

const FormIssue = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["createIssues"],
        mutationFn: createIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
        onError: (error) => {
            toast.error("Error in creating issue", {
                duration: 4000,
                position: "bottom-center",
                icon: "❌",
            });
        }
    });
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        onSubmit: async () => {
            try {
                await mutation.mutateAsync(formik.values as IssueType);
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
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },

        validationSchema: () => {
            return Yup.object({
                title: Yup.string().required("Required").min(3),
                description: Yup.string().required("Required").min(3),
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

                    
                        <Button className="bg-violet-700" type="submit">
                            <FilePlus />
                            Create Issue
                        </Button>
                    
                </Flex>
            </form>
            <Box>
                <Toaster />
            </Box>
        </Flex>
    );
};

export default FormIssue;
