-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('ELECTRIC', 'WATER');

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "EquipmentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energy_equipments" (
    "equipmentId" TEXT NOT NULL,
    "kw" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,
    "totalConsum" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "energy_equipments_pkey" PRIMARY KEY ("equipmentId")
);

-- CreateTable
CREATE TABLE "water_equipments" (
    "equipmentId" TEXT NOT NULL,
    "flux" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,
    "totalConsum" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "water_equipments_pkey" PRIMARY KEY ("equipmentId")
);

-- CreateIndex
CREATE INDEX "Equipment_userId_type_idx" ON "Equipment"("userId", "type");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "energy_equipments" ADD CONSTRAINT "energy_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_equipments" ADD CONSTRAINT "water_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
