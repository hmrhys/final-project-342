CREATE TABLE IF NOT EXISTS `game` (
    `game_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `game_name` varchar(100) NOT NULL,
    `year_released` int(4) NOT NULL,
    PRIMARY KEY (`game_id`)
) ENGINE=InnoDB default CHARSET=utf8mb4;

/* clear existing sql script */
DELETE FROM `game`;

INSERT INTO `game` ( `game_id`, `game_name`, `year_released` ) VALUES
    (1, "Watching Grass Grow: The Game", 2020),
    (2, "The Lenged of Dingleberry", 2021),
    (3, "Pirates of the Not Caribbean", 2021),
    (4, "Dried Paint: The Return", 2018),
    (5, "Goats of War: Goats of Sparta", 2024),
    (6, "Life of a Rat: Rodent Simulator", 2023);