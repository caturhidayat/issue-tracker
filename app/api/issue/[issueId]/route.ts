import prisma from "@/prisma/prisma";

export async function GET(
	req: Request,
	{ params: { issueId } }: { params: { issueId: string } },
) {
	console.log({ issueId });
	const issue = await prisma.issue.findUnique({
		where: { id: issueId },
	});
	return new Response(JSON.stringify(issue), {
		headers: { "content-type": "application/json" },
	});
}

export async function PATCH(
	request: Request,
	{ params: { localId } }: { params: { localId: number } },
) {
	console.log({ is: localId });
	const data = await request.json();
	console.log({ data: data });
	const issue = await prisma.issue.update({
		where: { localId },
		data: data,
	});
	return new Response(JSON.stringify(issue), {
		headers: { "content-type": "application/json" },
	});
}

// ! Unused
export async function DELETE(
	req: Request,
	{ params: { issueId } }: { params: { issueId: string } },
) {
	await prisma.issue.delete({
		where: { id: issueId },
	});
	return new Response(JSON.stringify({ status: "OK" }), {
		headers: { "content-type": "application/json" },
	});
}
