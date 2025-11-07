-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detail_address` VARCHAR(255) NOT NULL,
    `region_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(20) NOT NULL,
    `district` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `uq_region_province_district`(`province`, `district`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `review_id` INTEGER NOT NULL,
    `comment_content` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_type` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `point_reward` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `point_amount` INTEGER NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `point_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `point_reward` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `restaurant_address_id_key`(`address_id`),
    INDEX `idx_restaurant_address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_food_map` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_category_id` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,

    UNIQUE INDEX `uq_rfm_food_restaurant`(`food_category_id`, `restaurant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_mission_map` (
    `restaurant_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,

    PRIMARY KEY (`restaurant_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rating` DECIMAL(2, 1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_id` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `birth` DATE NOT NULL,
    `create_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_address_id_key`(`address_id`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favor_category` (
    `user_id` INTEGER NOT NULL,
    `food_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `food_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `completed_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `uq_user_mission`(`user_id`, `mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `point_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `point_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `restaurant_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- DDL (테이블 구조 변경) 구문 아래에 추가합니다.

-- FoodCategory 초기 데이터 (Seed Data) 삽입
INSERT INTO food_category (food_type) VALUES
('한식'),
('일식'),
('중식'),
('양식'),
('치킨'),
('분식'),
('고기/구이'),
('도시락'),
('야식 (족발,보쌈)'),
('패스트푸드'),
('디저트'),
('아시아안푸드');


-- 데이터베이스와 Prisma 스키마의 컬럼 이름에 맞게 food_category와 food_type을 사용했습니다.