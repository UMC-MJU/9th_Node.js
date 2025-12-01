-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_address_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `address_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
