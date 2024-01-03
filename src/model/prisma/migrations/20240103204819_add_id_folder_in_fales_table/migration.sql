/*
  Warnings:

  - You are about to drop the column `path` on the `files` table. All the data in the column will be lost.
  - Added the required column `idFolder` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "files_path_key";

-- DropIndex
DROP INDEX "folders_path_key";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "path",
ADD COLUMN     "idFolder" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_idFolder_fkey" FOREIGN KEY ("idFolder") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
