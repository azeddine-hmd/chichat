-- CreateTable
CREATE TABLE "Session" (
    "sid" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sid")
);
