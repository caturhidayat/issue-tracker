"use client";
import { TextField, Text, Flex, Button, Box } from "@radix-ui/themes";
import { useFormik } from "formik";
import { revalidatePath } from "next/cache";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const FormIssue = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        onSubmit: async (values) => {
            const createIssue = await fetch("/api/issue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (createIssue.ok) {
                toast.success("Issue Created", {
                    position: "bottom-center",
                    duration: 2000,
                    icon: "✅",
                });
                revalidatePath("/issue");
                formik.resetForm();
            }
            if (!createIssue.ok) {
                toast.error("Issue Not Created", {
                    position: "bottom-center",
                    duration: 2000,
                    icon: "❌",
                });
            }
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
                <Flex my={"2"} direction={"column"} gap={"2"}>
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
                    <Button type='submit'>Create Issue</Button>
                </Flex>
            </form>
            <Box>
                <Toaster />
            </Box>
        </Flex>
    );
};

export default FormIssue;
