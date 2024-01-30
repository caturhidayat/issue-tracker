import prisma from "@/prisma/prisma";

export async function PATCH(
    request: Request,
    { params: { issueId } }: { params: { issueId: string } }
) {
    const data = await request.json();
    const issue = await prisma.issue.update({
        where: { id: issueId },
        data: data,
    });
    return new Response(JSON.stringify(issue), {
        headers: { "content-type": "application/json" },
    });
}

export async function DELETE(
    req: Request,
    { params: { issueId } }: { params: { issueId: string } }
) {
    const issue = await prisma.issue.delete({
        where: { id: issueId },
    });
    return new Response(JSON.stringify({ status: "OK" }), {
        headers: { "content-type": "application/json" },
    });
}
