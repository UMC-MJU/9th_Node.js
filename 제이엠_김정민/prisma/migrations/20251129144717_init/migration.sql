-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    MODIFY `phone_number` VARCHAR(20) NULL,
    MODIFY `birth` DATE NULL;
