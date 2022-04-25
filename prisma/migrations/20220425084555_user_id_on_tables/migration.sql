/*
  Warnings:

  - Added the required column `user_id` to the `answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `flashcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `flashcard_set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- Empty tables
DELETE FROM "answer";
DELETE FROM "flashcard";
DELETE FROM "flashcard_set";
DELETE FROM "note";
DELETE FROM "question";
DELETE FROM "flashcard_set";
DELETE FROM "flashcard";
DELETE FROM "question";
DELETE FROM "answer";
DELETE FROM "note";

-- AlterTable
ALTER TABLE "answer" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "flashcard" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "flashcard_set" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "note" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "flashcard_set" ADD CONSTRAINT "flashcard_set_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
