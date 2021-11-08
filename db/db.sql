CREATE TABLE `musicnode`.`user` (
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
  `userId` INT NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  `avatar` VARCHAR(255),
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `musicnode`.`users`(`id`)
);

CREATE TABLE `musicnode`.`ads` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `musicnode`.`users`(`id`)
);

INSERT INTO `musicnode`.`users` (name, surname, email, phone, password)
  VALUES ('Lolo', 'Gonzalez', 'lolo@gmail.com', '957123567', '$2a$12$KRpQ8q6HGR8bvUndCoWv..2A7X4Abdde9G2nwpcHunWlizDyhS7.m');

INSERT INTO `musicnode`.`ads` (userId, title, description)
  VALUES (1, 'Title 1', 'Description 1'),
         (1, 'Title 2', 'Description 2');