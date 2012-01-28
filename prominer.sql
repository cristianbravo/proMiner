-- phpMyAdmin SQL Dump
-- version 2.10.2
-- http://www.phpmyadmin.net
-- 
-- Servidor: localhost
-- Tiempo de generación: 28-01-2012 a las 16:31:54
-- Versión del servidor: 5.0.45
-- Versión de PHP: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Base de datos: `prominer`
-- 

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_chancado`
-- 

CREATE TABLE `pm_chancado` (
  `id` int(11) NOT NULL auto_increment,
  `id_ctrl_general` int(11) default NULL,
  `id_usuario` int(11) default NULL,
  `id_cliente` int(11) default NULL,
  `id_turno` int(11) default NULL,
  `toneladas` double(11,0) default NULL,
  `id_camion_patente` int(11) default NULL,
  `fecha_real` datetime default NULL,
  `fecha_registrada` datetime default NULL,
  `acc_inc` tinyint(1) default NULL,
  `detencion` tinyint(1) default NULL,
  `derrames` tinyint(1) default NULL,
  `ct_ntg` tinyint(1) default NULL,
  `ct_ntf` tinyint(1) default NULL,
  `ct_ro` tinyint(1) default NULL,
  `ct_lae` tinyint(1) default NULL,
  `ct_aco` tinyint(1) default NULL,
  `ct_ios` tinyint(1) default NULL,
  `observaciones` varchar(512) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_chancado`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_clientes`
-- 

CREATE TABLE `pm_clientes` (
  `id` int(11) NOT NULL auto_increment,
  `rut` varchar(15) default NULL,
  `nombre` varchar(50) default NULL,
  `direccion` varchar(120) default NULL,
  `ncontacto` varchar(50) default NULL,
  `telefono` varchar(11) default NULL,
  `mail` varchar(120) default NULL,
  `activo` tinyint(1) default '1',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `pm_clientes`
-- 

INSERT INTO `pm_clientes` VALUES (1, '175167129', 'Codelco', 'Lejos', 'Roddy', '14545616', 'rads@jsdnfds.caom', 1);
INSERT INTO `pm_clientes` VALUES (2, '175145963', 'Rodht', 'Mirador', 'Olas', '1556239', 'roa@disi.csodj', 1);
INSERT INTO `pm_clientes` VALUES (4, 'dsfsd', 'xcv', 'vxcvxc', 'xcvxcv', 'xcvxc', 'xcvxc', 0);
INSERT INTO `pm_clientes` VALUES (5, '168051425', 'Mauricio', 'Mirado Azul', 'Mau', '546965', 'thiswallz@gmail.com', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_ctrl_general`
-- 

CREATE TABLE `pm_ctrl_general` (
  `id` int(11) NOT NULL auto_increment,
  `id_cliente` int(11) NOT NULL,
  `f_inicio` datetime NOT NULL,
  `f_termino` datetime NOT NULL,
  `id_lote` int(11) NOT NULL,
  `id_sup_ini` int(11) NOT NULL,
  `id_sup_ter` int(11) NOT NULL,
  `obs_ini` varchar(512) NOT NULL,
  `obs_ter` varchar(512) NOT NULL,
  `id_p_ext` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_ctrl_general`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_extraccion`
-- 

CREATE TABLE `pm_extraccion` (
  `id` int(11) NOT NULL auto_increment,
  `id_cliente` int(11) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_extraccion`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_flotacion`
-- 

CREATE TABLE `pm_flotacion` (
  `id` int(11) NOT NULL auto_increment,
  `id_ctrl_general` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_turno` int(11) NOT NULL,
  `fecha_real` datetime NOT NULL,
  `acc_inc` tinyint(1) NOT NULL,
  `detencion` tinyint(1) NOT NULL,
  `derrames` tinyint(1) NOT NULL,
  `ct_me` varchar(1) NOT NULL,
  `ct_p1` varchar(20) NOT NULL,
  `ct_p2` varchar(20) NOT NULL,
  `ct_p3` varchar(20) NOT NULL,
  `ct_np` varchar(20) NOT NULL,
  `ct_er` tinyint(1) NOT NULL,
  `ct_lae` tinyint(1) NOT NULL,
  `ct_afo` tinyint(1) NOT NULL,
  `ct_ioms` tinyint(1) NOT NULL,
  `observaciones` varchar(512) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_flotacion`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_flot_corr_gr`
-- 

CREATE TABLE `pm_flot_corr_gr` (
  `id` int(11) NOT NULL auto_increment,
  `hora` datetime NOT NULL,
  `colector1` varchar(120) NOT NULL,
  `colector2` varchar(120) NOT NULL,
  `espumante` varchar(120) NOT NULL,
  `modificador` varchar(120) NOT NULL,
  `act_dep` varchar(120) NOT NULL,
  `cal_kg` double(11,4) NOT NULL,
  `id_control` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_flot_corr_gr`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_flot_cor_gr`
-- 

CREATE TABLE `pm_flot_cor_gr` (
  `id` int(11) NOT NULL auto_increment,
  `hora` datetime NOT NULL,
  `colector1` varchar(120) NOT NULL,
  `colector2` varchar(120) NOT NULL,
  `espumante` varchar(120) NOT NULL,
  `modificador` varchar(120) NOT NULL,
  `act_dep` varchar(120) NOT NULL,
  `ph` double(11,4) NOT NULL,
  `id_control` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_flot_cor_gr`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_lotes`
-- 

CREATE TABLE `pm_lotes` (
  `id` int(11) NOT NULL auto_increment,
  `id_cliente` int(11) NOT NULL,
  `id_pextraccion` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_lotes`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_roles`
-- 

CREATE TABLE `pm_roles` (
  `id` int(11) NOT NULL auto_increment,
  `nombre` varchar(50) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `pm_roles`
-- 

INSERT INTO `pm_roles` VALUES (1, 'Administrador');
INSERT INTO `pm_roles` VALUES (2, 'Supervisor');
INSERT INTO `pm_roles` VALUES (3, 'Chancado');
INSERT INTO `pm_roles` VALUES (4, 'Molienda');
INSERT INTO `pm_roles` VALUES (5, 'Flotacion');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_turno`
-- 

CREATE TABLE `pm_turno` (
  `id` int(11) NOT NULL auto_increment,
  `tipo_turno` varchar(50) NOT NULL,
  `hora_ini` varchar(5) NOT NULL,
  `hora_ter` varchar(5) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_turno`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `pm_usuarios`
-- 

CREATE TABLE `pm_usuarios` (
  `id` int(11) NOT NULL auto_increment,
  `usuario` varchar(50) default NULL,
  `passw` varchar(50) default NULL,
  `nombre` varchar(50) default NULL,
  `apellido` varchar(50) default NULL,
  `sexo` set('m','f') default NULL,
  `rol` int(11) default NULL,
  `activo` tinyint(1) default '1',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

-- 
-- Volcar la base de datos para la tabla `pm_usuarios`
-- 

INSERT INTO `pm_usuarios` VALUES (1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'Mauricio', 'Barria', 'm', 1, 1);
INSERT INTO `pm_usuarios` VALUES (2, 'rvitali', '81dc9bdb52d04dc20036dbd8313ed055', 'Roddy', 'Vitali', 'm', 2, 1);
INSERT INTO `pm_usuarios` VALUES (3, 'jvargas', '81dc9bdb52d04dc20036dbd8313ed055', 'Juan', 'Vargas Barria', 'm', 5, 1);
INSERT INTO `pm_usuarios` VALUES (4, 'mteresa', '827ccb0eea8a706c4c34a16891f84e7b', 'Maria', 'Joost Wolf', 'f', 2, 1);
INSERT INTO `pm_usuarios` VALUES (14, 'jksadna', '0e3e0fee239d849b82b5db788ddcb8e3', 'jhj', 'jksadhkjad', 'm', 1, 0);
INSERT INTO `pm_usuarios` VALUES (15, 'Juan', '81dc9bdb52d04dc20036dbd8313ed055', 'Juan', 'Juan', 'm', 5, 1);
