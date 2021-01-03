SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS teamspeak_db;

USE teamspeak_db;

CREATE TABLE IF NOT EXISTS canales (
  can_id int(11) NOT NULL,
  can_cli_id int(11) NOT NULL,
  can_cli_ts_id int(11) NOT NULL,
  can_nombre varchar(255) NOT NULL,
  can_contrasena varchar(255) NOT NULL,
  can_permisos int(11) DEFAULT NULL,
  can_creacion datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clientes (
  cli_id int(11) NOT NULL,
  cli_uid varchar(64) NOT NULL,
  cli_nombre varchar(255) NOT NULL,
  cli_alias varchar(255) NOT NULL,
  cli_region varchar(255) NOT NULL,
  cli_ciudad varchar(255) NOT NULL,
  cli_nacimiento date NOT NULL,
  cli_creacion datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS historial_login (
  his_id int(11) NOT NULL,
  his_log_cli_id datetime NOT NULL,
  his_log_ultima_conexion int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS login (
  log_cli_id int(11) NOT NULL,
  log_correo varchar(255) NOT NULL,
  log_contrasena varchar(255) NOT NULL,
  log_conexion_ip varchar(15) NOT NULL,
  log_tipo varchar(50) NOT NULL,
  log_ultima_conexion datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE canales
  ADD PRIMARY KEY (can_id),
  ADD KEY fk_can_cli_id (can_cli_id);

ALTER TABLE clientes
  ADD PRIMARY KEY (cli_id);

ALTER TABLE historial_login
  ADD PRIMARY KEY (his_id);

ALTER TABLE login
  ADD KEY fk_log_cli_id (log_cli_id);


ALTER TABLE canales
  MODIFY can_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE clientes
  MODIFY cli_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE historial_login
  MODIFY his_id int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE canales
  ADD CONSTRAINT fk_can_cli_id FOREIGN KEY (can_cli_id) REFERENCES clientes (cli_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE login
  ADD CONSTRAINT fk_log_cli_id FOREIGN KEY (log_cli_id) REFERENCES clientes (cli_id) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
