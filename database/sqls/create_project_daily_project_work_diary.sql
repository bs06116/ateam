CREATE TABLE `project_daily` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `dat` TIMESTAMP NOT NULL,
  `comment` TEXT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `project_work_diary` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `dat` TIMESTAMP NOT NULL,
  `ord` INT NULL,
  `cost_code` VARCHAR(45) NULL,
  `work_completed` VARCHAR(255) NULL,
  `amount_installed` INT NULL,
  `unit` VARCHAR(45) NULL,
  `hours` INT NULL,
  `productivity` INT NULL,
  `comment` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`));
