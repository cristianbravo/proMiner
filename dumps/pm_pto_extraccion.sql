-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 04-02-2012 a las 22:13:50
-- Versión del servidor: 5.1.53
-- Versión de PHP: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `prominer`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pm_pto_extraccion`
--

CREATE TABLE IF NOT EXISTS `pm_pto_extraccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `ncontacto` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcar la base de datos para la tabla `pm_pto_extraccion`
--

INSERT INTO `pm_pto_extraccion` (`id`, `nombre`, `direccion`, `ncontacto`, `telefono`, `mail`, `activo`, `id_cliente`) VALUES
(1, 'chuquicamata', 'chuquicamata 1220 sur', 'juan peralta', '11177227', 'jperalta@gmail.com', 1, 1),
(2, 'chacalluta', 'chacalluta 11243', 'mauricio parra', '883267', 'mparra@exs.cl', 0, 1);
