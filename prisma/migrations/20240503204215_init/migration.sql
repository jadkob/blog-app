-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "username" STRING NOT NULL,
    "title" STRING NOT NULL,
    "text" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
