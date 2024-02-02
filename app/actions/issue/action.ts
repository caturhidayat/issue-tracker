import { IssueType } from "@/app/types/issue";

const getIssues = async () => {
    const res = await fetch("/api/issue");
    // console.log(res);
    return res.json();
};

const getIssueById = async (issueId: string) => {
    const res = await fetch(`/api/issue/${issueId}`);
    return res.json();
}

const createIssue = async (values: IssueType) => {
    await fetch("/api/issue", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
};

const updateIssue = async (id: number, values: IssueType) => {
    console.log({valueAction: values});
    console.log({idAction: id});
    try {
        await fetch(`/api/issue/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
    } catch (error) {
        throw new Error(String(error));
    }
}

const deleteIssue = async (id: number) => {
    await fetch(`/api/issue/${id}`, {
        method: "DELETE",
    });
};

export { getIssues, createIssue, updateIssue, deleteIssue, getIssueById };
