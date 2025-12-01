/*
  Warnings:

  - Made the column `address_id` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_address_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `address_id` INTEGER NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
