-- CreateTable
CREATE TABLE "flashcard" (
    "id" UUID NOT NULL,
    "header" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,

    CONSTRAINT "flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flashcard_id_key" ON "flashcard"("id");
