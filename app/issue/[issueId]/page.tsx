import { getIssueById } from "@/app/actions/issue/action";
import EditIssueForm from "@/app/components/EditIssueForm";
import { Text } from "@radix-ui/themes";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const EditIssuePage = async ({ params }: { params: { issueId: string } }) => {
    
    // async function getIssue() {
    //     'use server'
    //     const response = await getIssueById(params.issueId);
    //     const issue = await response.json();
    //     return issue;
    // }

    // const issue = await getIssue();

    return (
        <div>
            <Text size={"6"} weight={"bold"}>
                Edit Issue Page {params.issueId}
            </Text>
            {/* <EditIssueForm props={ issue }/> */}
        </div>
    );
};

export default EditIssuePage;
