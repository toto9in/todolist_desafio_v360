-- CreateEnum
CREATE TYPE "public"."LabelProjectsType" AS ENUM ('USER', 'SYSTEM');

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."LabelProjectsType" NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."labels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."LabelProjectsType" NOT NULL,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."todos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER,
    "taskName" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "priority" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "parentId" INTEGER,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TodoLabel" (
    "todoId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,

    CONSTRAINT "TodoLabel_pkey" PRIMARY KEY ("todoId","labelId")
);

-- CreateTable
CREATE TABLE "public"."_TodoLabels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "todos_parentId_key" ON "public"."todos"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "_TodoLabels_AB_unique" ON "public"."_TodoLabels"("A", "B");

-- CreateIndex
CREATE INDEX "_TodoLabels_B_index" ON "public"."_TodoLabels"("B");

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."todos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TodoLabel" ADD CONSTRAINT "TodoLabel_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "public"."todos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TodoLabel" ADD CONSTRAINT "TodoLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "public"."labels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TodoLabels" ADD CONSTRAINT "_TodoLabels_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TodoLabels" ADD CONSTRAINT "_TodoLabels_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
