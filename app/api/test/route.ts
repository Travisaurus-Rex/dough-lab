import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    return Response.json({ message: "DB works!" });
  } catch (e: unknown) {
    return Response.json({ message: "There was a problem", error: e });
  }
}
