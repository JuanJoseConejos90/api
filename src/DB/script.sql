-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.7-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para delivery
CREATE DATABASE IF NOT EXISTS `delivery` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `delivery`;

-- Volcando estructura para procedimiento delivery.sp_createTask
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_createTask`(
	IN `name` VARCHAR(150),
	IN `description` VARCHAR(250),
	IN `state` CHAR(1)
)
BEGIN

           INSERT INTO task(task.name, task.description, task.state)
           VALUES(name, description, state);

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_createUser
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_createUser`(
	IN `name` VARCHAR(150),
	IN `nickName` VARCHAR(150),
	IN `Pass` VARCHAR(150)
)
BEGIN


           INSERT INTO user(user.name, user.nickName, user.Pass) 
           VALUES (name, nickName, Pass);

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_deleteTask
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_deleteTask`(
	IN `Id` INT
)
BEGIN

		UPDATE task
		SET task.state='E'
		WHERE task.Id= Id;

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_getTask
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_getTask`()
BEGIN

    SELECT t.Id, t.name, t.description, t.state
    FROM task t
    WHERE t.state='A' 
    ORDER BY t.Id ASC;

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_getTaskId
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_getTaskId`(
	IN `Id` INT
)
BEGIN

		SELECT t.Id, t.name, t.description, t.state
		FROM task t
		WHERE t.Id=Id AND t.state='A' 
		ORDER BY t.Id ASC;

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_Login
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_Login`(
	IN `nickName` VARCHAR(150),
	IN `Pass` VARCHAR(150)
)
BEGIN

             SELECT user.Id, 
				        user.name, 
						  user.nickName, 
						  user.Pass
				FROM user
				WHERE user.nickName=nickName;

END//
DELIMITER ;

-- Volcando estructura para procedimiento delivery.sp_updateTask
DELIMITER //
CREATE DEFINER=`` PROCEDURE `sp_updateTask`(
	IN `Id` INT,
	IN `name` VARCHAR(150),
	IN `description` VARCHAR(250),
	IN `state` CHAR(1)
)
BEGIN

   UPDATE task
   SET task.name= COALESCE(name, task.name),
       task.description= COALESCE(description, task.description),
       task.state=COALESCE(state, task.state)
   WHERE task.Id= Id;
   

END//
DELIMITER ;

-- Volcando estructura para tabla delivery.task
CREATE TABLE IF NOT EXISTS `task` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL DEFAULT '0',
  `description` varchar(250) NOT NULL DEFAULT '0',
  `state` char(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla delivery.user
CREATE TABLE IF NOT EXISTS `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL DEFAULT '0',
  `nickName` varchar(150) NOT NULL DEFAULT '0',
  `Pass` varchar(150) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
