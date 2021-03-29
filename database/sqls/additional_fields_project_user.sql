ALTER TABLE `ateam`.`project_user` 
ADD COLUMN `hours` INT NULL AFTER `user_id`,
ADD COLUMN `paygroup_id` INT NULL AFTER `hours`,
ADD COLUMN `cost_code` VARCHAR(255) NULL AFTER `paygroup_id`;
