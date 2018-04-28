
DROP DATABASE IF EXISTS loose;

CREATE DATABASE loose;

USE loose;

CREATE TABLE users (
  `id` INT AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `profile_picture` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `username_idx` (`username`)
);

CREATE TABLE teams (
  `id` INT AUTO_INCREMENT,
  `team_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE channels (
  `id` INT AUTO_INCREMENT,
  `channel_name` VARCHAR(255) NOT NULL,
  `id_team` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE dms (
  `id` INT AUTO_INCREMENT,
  `dm_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE user_team (
  `id` INT AUTO_INCREMENT,
  `id_user` INT,
  `id_team` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE user_dm (
  `id` INT AUTO_INCREMENT,
  `id_user` INT,
  `id_dm` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE messages (
  `id` INT AUTO_INCREMENT,
  `message_text` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_author` INT,
  `id_channel` INT,
  `id_dm` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE comments (
  `id` INT AUTO_INCREMENT,
  `comment_text` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_message` INT,
  `id_author` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE attachments (
  `id` INT AUTO_INCREMENT,
  `attachment_content` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_author` INT,
  `id_channel` INT,
  `id_dm` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE reactions (
  `id` INT AUTO_INCREMENT,
  `reaction_content` VARCHAR(255) NOT NULL,
  `id_author` INT,
  `id_message` INT,
  `id_comment` INT,
  `id_attachment` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE post_stars (
  `id` INT AUTO_INCREMENT,
  `id_author` INT,
  `id_message` INT,
  `id_comment` INT,
  `id_attachment` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE channel_dm_stars (
  `id` INT AUTO_INCREMENT,
  `id_author` INT,
  `id_channel` INT,
  `id_dm` INT,
  PRIMARY KEY (`id`)
);