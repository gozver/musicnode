CREATE TABLE `musicnode`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `password` VARCHAR(50),
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `musicnode`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,  
  `role` VARCHAR(20) NOT NULL,
  `avatar` VARCHAR(255),
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `musicnode`.`users`(`id`)
);