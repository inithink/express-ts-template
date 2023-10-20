-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('PRODUCT_SYNC', 'ORDER_SYNC', 'ORDER_SUBMIT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAID', 'CHECKED', 'DELIVERING', 'DELIVERED', 'CONFIRMED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderAutomateStatus" AS ENUM ('NONE', 'PAID', 'CHECKED', 'DELIVERED', 'CONFIRMED', 'OUT_OF_STOCK', 'DISTINCTED');

-- CreateEnum
CREATE TYPE "ServiceAccountStatus" AS ENUM ('NORMAL', 'INVALID_CREDENTIAL', 'TWO_FACTOR');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "title" TEXT NOT NULL,
    "logs" JSONB NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "sellingId" TEXT NOT NULL,
    "sellerCode" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "automatedStatus" "OrderAutomateStatus" NOT NULL DEFAULT 'NONE',
    "userId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "shopGoodId" TEXT NOT NULL,
    "sellerCode" TEXT NOT NULL,
    "goodInfo" JSONB NOT NULL,
    "receiver" JSONB,
    "delivery" JSONB,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "memo" TEXT,
    "serviceName" TEXT NOT NULL,
    "goodId" TEXT,
    "isPendingSubmit" BOOLEAN NOT NULL DEFAULT false,
    "etc" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerClanProduct" (
    "id" TEXT NOT NULL,
    "json" JSONB NOT NULL,

    CONSTRAINT "OwnerClanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ServiceAccountStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "accountInfo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_serviceName_shopId_key" ON "Order"("serviceName", "shopId");

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE SET NULL ON UPDATE CASCADE;
