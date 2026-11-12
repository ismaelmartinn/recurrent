/*
  Warnings:

  - Added the required column `categoria` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriptions" ADD COLUMN     "categoria" TEXT NOT NULL;
