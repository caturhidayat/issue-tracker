import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
    const { title, description } = await req.json();
    const issue = await prisma.issue.create({
        data: {
            title,
            description,
        },
    });
    return Response.json(issue);
}

export async function GET() {
    const issues = await prisma.issue.findMany();
    return Response.json(issues);
}


