CREATE TABLE `musicnode`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `password` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME,
  PRIMARY KEY (`id`)
);

CREATE TABLE `musicnode`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  `avatar` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `musicnode`.`users`(`id`)
);

CREATE TABLE `musicnode`.`ads` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `musicnode`.`users`(`id`)
);

INSERT INTO `musicnode`.`ads` (user_id, title, description)
VALUES (1, 'Title 1', 'Description 1');