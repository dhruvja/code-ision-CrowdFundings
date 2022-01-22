CREATE TABLE `crowdfunding`.`accounts` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `account_no` VARCHAR(105) NULL,
  `type` VARCHAR(45) NULL,
  `created_date` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crowdfunding`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `project_name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  `created_date` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `crowdfunding`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);