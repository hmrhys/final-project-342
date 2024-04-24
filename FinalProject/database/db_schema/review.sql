CREATE TABLE IF NOT EXISTS `review` (
    `review_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `game_id` int(10) unsigned NOT NULL,
    `score` int(10) unsigned NOT NULL,
    `hoursPlayed` int(10) unsigned NOT NULL,
    `content` text NOT NULL,
    `date` text NOT NULL,
    PRIMARY KEY (`review_id`)
) ENGINE=InnoDB default CHARSET=utf8mb4;

/* clear existing sql script */
DELETE FROM `review`;

INSERT INTO `review` ( `review_id`, `user_id`,`game_id`, `score`, `hoursPlayed`, `content`, `date` ) VALUES
    (1, 1, 1, 2, 23, "mid", "2019-12-11T04:37:36Z"),
    (2, 2, 1, 5, 4, "Pretty fun! Not too hard, great for casual gamers", "2019-12-11T04:37:36Z"),
    (3, 3, 2, 8, 11, "LOVED IT SO MUCH", "2019-12-11T04:37:36Z"),
    (4, 4, 2, 1, 65, "Bad game, would not recommend", "2019-12-11T04:37:36Z"),
    (5, 5, 3, 5, 65, "I've played worse", "2019-12-11T04:37:36Z"),
    (6, 6, 3, 10, 0, "I CAN'T WAIT UNTIL IT'S RELEASED", "2019-12-11T04:37:36Z"),
    (7, 7, 4, 8, 1, "It's so goooood, I only just started but it's so addictinggg!", "2019-12-11T04:37:36Z"),
    (8, 8, 4, 9, 143, "The writing is so good, storyline is near perfect, and the characters are so relatable.", "2019-12-11T04:37:36Z"),
    (9, 9, 5, 4, 65, "It costs way too much for the amount of gameplay, don't waste your money", "2019-12-11T04:37:36Z"),
    (10, 10, 6, 2, 4, "bro it's soooo bad", "2019-12-11T04:37:36Z");

CREATE TABLE IF NOT EXISTS `game_review` (
    `gr_review_id` int(10) unsigned NOT NULL,
    `gr_game_id` int(10) unsigned NOT NULL,
    PRIMARY KEY (`gr_review_id`,`gr_game_id`),
    KEY `FK_GR_GID` (`gr_game_id`),
    CONSTRAINT `FK_GR_G` FOREIGN KEY (`gr_game_id`) REFERENCES `game` (`game_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_GR_R` FOREIGN KEY (`gr_review_id`) REFERENCES `review` (`review_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `game_review`;
INSERT INTO `game_review` (`gr_review_id`, `gr_game_id`) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 3),
    (6, 3),
    (7, 4),
    (8, 4),
    (9, 5),
    (10, 6);