CREATE TABLE IF NOT EXISTS `game` (
    `game_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `game_name` text NOT NULL,
    `year_released` int(4) NOT NULL,
    `description` text NOT NULL,
    `cover_art` varchar(100) NOT NULL,
    PRIMARY KEY (`game_id`)
) ENGINE=InnoDB default CHARSET=utf8mb4;

/* clear existing sql script */
DELETE FROM `game`;

INSERT INTO `game` (`game_id`, `game_name`, `year_released`, `description`, `cover_art`) VALUES
    (1, "Watching Grass Grow: The Game", 2020, 'Set in the ancient age known now only as the 70s, go on an incredible adventure as Homeowner McGrasswatch and watch to miracle of photosynthesis.', 'Watching_Grass_Grow_The_Game_Cover'),
    (2, "The Legend of Dingleberry", 2021, 'All in the West will know my name, Jebediah Dingleberry!', 'The_Legend_of_Dingleberry_Cover'),
    (3, "Pirates of the Not Caribbean", 2021, 'Ahoy! Thar be no copyright issues here, matey!', 'Pirates_of_the_Not_Caribbean_Cover'),
    (4, "Dried Paint: The Return", 2018, 'I mean what do you want from us. Its paint. Its drying. Go nuts.', 'Dried_Paint_The_Return_Cover'),
    (5, "Goats of War: Goats of Sparta", 2024, 'Take control of King Spartagoat as he and his cohort of 300 brave goats face off against the hordes of Persheep who have come to conquer their city.', 'Goats_of_War_Goats_of_Sparta_Cover'),
    (6, "Life of a Rat: Rodent Simulator", 2023, 'I guess for some people this is just a big old mirror heh heh. Sorry that was rude. Youre not a rat. Youre at least like a mouse or really mean squirrel or something.', 'Life_of_a_Rat_Rodent_Simulator_Cover');