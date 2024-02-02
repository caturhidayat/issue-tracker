import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    const { title, description } = await req.json();
    try {
        const countIssueInDb = await prisma.issue.count();
        if (countIssueInDb > 20) {
            throw new Error("Cannot create more than 20 issues");
        } else {
            const issue = await prisma.issue.create({
                data: {
                    title,
                    description,
                },
            });
            return Response.json(issue);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P1001") {
                return Response.json("Cannot connect to database", {
                    status: 500,
                });
            }
        }
        return Response.json(error);
    }
}

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return Response.json(issues);
    } catch (error) {
        return Response.json(error);
    }
}
