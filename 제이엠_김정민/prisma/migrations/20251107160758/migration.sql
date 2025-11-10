-- DropForeignKey
ALTER TABLE `restaurant_mission_map` DROP FOREIGN KEY `restaurant_mission_map_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_mission_id_fkey`;

-- DropIndex
DROP INDEX `restaurant_mission_map_mission_id_fkey` ON `restaurant_mission_map`;

-- DropIndex
DROP INDEX `user_mission_mission_id_fkey` ON `user_mission`;

-- AddForeignKey
ALTER TABLE `restaurant_mission_map` ADD CONSTRAINT `restaurant_mission_map_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
