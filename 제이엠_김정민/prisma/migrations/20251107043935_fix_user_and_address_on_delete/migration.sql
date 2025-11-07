/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_address_id_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `restaurant_name_key` ON `restaurant`(`name`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
