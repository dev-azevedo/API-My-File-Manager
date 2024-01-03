/*
  Warnings:

  - You are about to drop the column `idUser` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `namePathPermission` on the `permissions` table. All the data in the column will be lost.
  - Added the required column `idFolder` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_idUser_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_namePathPermission_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "idUser",
DROP COLUMN "namePathPermission",
ADD COLUMN     "idFolder" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "folders" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "folders_path_key" ON "folders"("path");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_idFolder_fkey" FOREIGN KEY ("idFolder") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
