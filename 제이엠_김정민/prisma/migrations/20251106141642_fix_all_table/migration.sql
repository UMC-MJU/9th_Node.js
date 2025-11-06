/*
  Warnings:

  - You are about to drop the column `food_id` on the `restaurant_food_map` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `point` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[food_category_id,restaurant_id]` on the table `restaurant_food_map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mission_id` to the `point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_category_id` to the `restaurant_food_map` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_comment_review_id` ON `comment`;

-- DropIndex
DROP INDEX `idx_comment_user_id` ON `comment`;

-- DropIndex
DROP INDEX `idx_point_user_id` ON `point`;

-- DropIndex
DROP INDEX `idx_rfm_restaurant_id` ON `restaurant_food_map`;

-- DropIndex
DROP INDEX `uq_rfm_food_restaurant` ON `restaurant_food_map`;

-- DropIndex
DROP INDEX `idx_rmm_mission_id` ON `restaurant_mission_map`;

-- DropIndex
DROP INDEX `idx_review_restaurant_id` ON `review`;

-- DropIndex
DROP INDEX `idx_review_user_id` ON `review`;

-- DropIndex
DROP INDEX `FK_User_Address` ON `user`;

-- DropIndex
DROP INDEX `fk_ufc_food` ON `user_favor_category`;

-- DropIndex
DROP INDEX `idx_um_mission_id` ON `user_mission`;

-- DropIndex
DROP INDEX `idx_um_user_id` ON `user_mission`;

-- AlterTable
ALTER TABLE `point` ADD COLUMN `mission_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `restaurant_food_map` DROP COLUMN `food_id`,
    ADD COLUMN `food_category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `create_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `update_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateIndex
CREATE UNIQUE INDEX `point_user_id_key` ON `point`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `uq_rfm_food_restaurant` ON `restaurant_food_map`(`food_category_id`, `restaurant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_address_id_key` ON `user`(`address_id`);

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `point_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `point_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_food_map` ADD CONSTRAINT `restaurant_food_map_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_food_map` ADD CONSTRAINT `restaurant_food_map_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_mission_map` ADD CONSTRAINT `restaurant_mission_map_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_mission_map` ADD CONSTRAINT `restaurant_mission_map_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
