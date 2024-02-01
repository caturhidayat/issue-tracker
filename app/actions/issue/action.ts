import { IssueType } from "@/app/types/issue";

const getIssue = async () => {
    const res = await fetch("/api/issue");
    console.log(res);
    return res.json();
};

const createIssue = async (values: IssueType) => {
    await fetch("/api/issue", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
};

const deleteIssue = async (id: number) => {
    await fetch(`/api/issue/${id}`, {
        method: "DELETE",
    });
};

export { getIssue, createIssue, deleteIssue };
