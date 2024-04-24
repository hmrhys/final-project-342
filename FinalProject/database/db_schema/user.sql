CREATE TABLE IF NOT EXISTS `user` (
    `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `first_name` varchar(100),
    `last_name` varchar(100),
    `username` varchar(100) NOT NULL,
    `password` text NOT NULL,
    `pwd_salt` text NOT NULL,
    `avatar` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB default CHARSET=utf8mb4;

/* clear existing sql script */
DELETE FROM `user`;

/* add user into user table */
/* unhashed passwords:
   1. superawesome
   2. jebediahjorts
   3. dingleberrydidit
*/
INSERT INTO `user` ( `user_id`, `first_name`, `last_name`, `username`, `password`, `pwd_salt`, `avatar` ) VALUES
    (1, 'Hanna', 'Reese', 'hmreese2', 'df6c2b0bc4f93614084fcdedd7aa2aca1cfc1a92a19f9c80f8bdca3e450c74c1411ac3f73a3918b7c4e4913c213f46185832dfb97c2b3de083f2ba053a0610a0', 'e18096890ea191eddb6fa80f67ba264fab0ad708193fede7e3d3eea786c05459', 'https://robohash.org/avatar1/?set=set4'),
    (2, 'Zee', 'Bridges', 'zbridge', '8b0699332e8c8f8c148e178e54c7b0269fadc1265232df120a754634d86ccc89ae8ed63c78056d748cd6f7ed8c1127834b7b493775f31e8cbb28c18876e074a7', 'bc452f6ba6816d6a3546ac0c8235b089d0c64cc840fee9862356d03049194931', 'https://robohash.org/girl/?set=set4'),
    (3, 'Chris', 'Lee', 'cdlee3', '43fb81add9d82665f61fc1002c6b458d46be3c69698923534170e100dce09a927d1bce54ec28c0315386743587ea58482d92bae575076eecf5372612bfcfbc92', '5d87b5b9dc5b95085bcc7304d644c2f32b92ef5835cf10782716da9eec588d69', 'https://robohash.org/avatar3/?set=set4');

CREATE TABLE IF NOT EXISTS `user_review` (
    `ur_review_id` int(10) unsigned NOT NULL,
    `ur_user_id` int(10) unsigned NOT NULL,
    PRIMARY KEY (`ur_review_id`,`ur_user_id`),
    KEY `FK_UR_USER_ID` (`ur_user_id`),
    CONSTRAINT `FK_UR_USER` FOREIGN KEY (`ur_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_UR_REVIEW` FOREIGN KEY (`ur_review_id`) REFERENCES `review` (`review_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user_review`;
INSERT INTO `user_review` (`ur_review_id`, `ur_user_id`) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);