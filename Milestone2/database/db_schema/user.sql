/* sql db file for users ... TODO: implement */

/* creating new user if user doesn't already exist in database */
CREATE TABLE IF NOT EXISTS `user` ()
    `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `first_name` varchar(100) NOT NULL,
    `last_name` varchar(100) NOT NULL,
    `username` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `pwd_salt` varchar(100) NOT NULL,
    `avatar` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB default CHARSET=utf8mb4;

/* clear existing sql script */
DELETE FROM `user`;

/* add user into user table */
/* unhashed passwords: ( hashed passwords using sha512 -> link for hashing: https://www.tools4noobs.com/online_tools/hash/ )
   1. superawesome
   2. jebediahjorts
   3. dingleberrydidit
*/
INSERT INTO `user` ( `user_id`, `first_name`, `last_name`, `username`, `password`, `pwd_salt`, `avatar` ) VALUES
    (1, 'Hanna', 'Reese', 'hmreese2', '573d9803b740138d890354d6aa7ef277df56f018b953eff9ebed339e413d8270dcb2d72483098058da2f5992308f577e404316874d50fa4ea860b20337d724ca', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', 'https://robohash.org/avatar1/?set=set4'),
    (2, 'Zee', 'Bridges', 'zbridge', '676c7cc6948b7a4e7c88ee99f61de6a141e7b4120dfa8c70fe94d370ba8b40edeb11cbd2bef3791e76a55b6fd093c9ae0f8d802f8ff9ea18284885a38781b89b', '801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc', 'https://robohash.org/girl/?set=set4'),
    (3, 'Chris', 'Lee', 'cdlee3', '98722e2bd0eae6d00ccb102e73c9843a726d41f9ad18606a890ad6f1c051358c4148dfc119978c1dd4a092d681b65a0c5701b35a3712106da1cb8bb581117d8c', '', 'https://robohash.org/avatar3/?set=set4');
/* TODO: add salt values to INSERT INTO ... table above ^