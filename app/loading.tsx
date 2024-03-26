import { Flex, Text } from "@radix-ui/themes";
export default async function Loading() {
	return (
		<Flex className="justify-center gap-4">
			<Text size={"2"}>Loading...</Text>
		</Flex>
	);
}
