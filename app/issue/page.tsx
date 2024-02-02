import React, { Suspense } from "react";
import FormIssue from "../components/FormIssue";
import { Box, Text } from "@radix-ui/themes";
import ListIssues from "../components/ListIssues";

const IssuePage = () => {
    return (
        <div>
            <Box display={"block"}>
                <Text size={"6"} weight={"bold"}>
                    Create Issue Page
                </Text>
            </Box>
            <Box className="py-4">
                <Text size={"2"} color='orange' weight={"medium"}>
                    This application database uses AWS, to prevent entering
                    excessive data and causing excessive costs, issue creation
                    is limited
                </Text>
            </Box>
            <FormIssue />
            <Suspense fallback={<div>Loading...</div>}>
                <ListIssues />
            </Suspense>
        </div>
    );
};

export default IssuePage;
