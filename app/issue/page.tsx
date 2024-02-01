import React, { Suspense } from "react";
import FormIssue from "../components/FormIssue";
import { Text } from "@radix-ui/themes";
import ListIssues from "../components/ListIssues";

const IssuePage = () => {
    return (
        <div>
            <Text size={"6"} weight={"bold"}>
                Create Issue Page
            </Text>
            <FormIssue />
            <Suspense fallback={<div>Loading...</div>}>
                <ListIssues />
            </Suspense>
        </div>
    );
};

export default IssuePage;
