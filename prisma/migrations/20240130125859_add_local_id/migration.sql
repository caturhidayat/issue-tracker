/*
  Warnings:

  - A unique constraint covering the columns `[localId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "localId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Issue_localId_key" ON "Issue"("localId");

-- CreateIndex
CREATE INDEX "localId" ON "Issue"("localId");
