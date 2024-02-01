import {
    Dialog,
    Button,
    Text,
    Flex,
    TextField,
    Select,
} from "@radix-ui/themes";
import { Edit } from "lucide-react";
import { IssueType } from "../types/issue";
const EditIssuePopout = ({
    props: { issue },
}: {
    props: { issue: IssueType };
}) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Edit color='gray' />
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 650 }}>
                <Dialog.Title size={"7"}>📝 Edit Issue</Dialog.Title>
                <Dialog.Description size='2' mb='4'>
                    Make changes to your Issue here
                </Dialog.Description>

                <form>
                    <Flex direction='column' gap='3'>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Title
                            </Text>
                            <TextField.Input value={issue.title} />
                        </label>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Description
                            </Text>
                            <TextField.Input value={issue.description} />
                        </label>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Status
                            </Text>
                            <Select.Root size={"2"} defaultValue={issue.status}>
                                <Select.Trigger variant='soft' />
                                <Select.Content position='popper'>
                                    <Select.Item value='OPEN'>OPEN</Select.Item>
                                    <Select.Item value='IN_PROGRESS'>
                                        IN_PROGRESS
                                    </Select.Item>
                                    <Select.Item value='DONE'>DONE</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </label>
                    </Flex>

                    <Flex gap='3' mt='4' justify='end'>
                        <Dialog.Close>
                            <Button variant='soft' color='gray'>
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button>Save Edit</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default EditIssuePopout;
