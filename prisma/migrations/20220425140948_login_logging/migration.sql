-- CreateTable
CREATE TABLE "logins" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logins" ADD CONSTRAINT "logins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
