-- phpMyAdmin SQL Dump
-- version 2.10.2
-- http://www.phpmyadmin.net
-- 
-- Servidor: localhost
-- Tiempo de generación: 04-02-2012 a las 16:26:40
-- Versión del servidor: 5.0.45
-- Versión de PHP: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Base de datos: `prominer`
-- 

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
  `dias_efectivo` int(11) NOT NULL,
  `mine_oxido` tinyint(1) NOT NULL,
  `mine_calcopirita` tinyint(1) NOT NULL,
  `mine_bornita` tinyint(1) NOT NULL,
  `mine_calcosina` tinyint(1) NOT NULL,
  `mine_oro` tinyint(1) NOT NULL,
  `mine_plata` tinyint(1) NOT NULL,
  `ton_ingre` double(11,4) NOT NULL,
  `humedad` double(11,4) NOT NULL,
  `ton_secas` double(11,4) NOT NULL,
  `merme` double(11,4) NOT NULL,
  `ton_efectivas` double(11,4) NOT NULL,
  `ton_concentrado` double(11,4) NOT NULL,
  `horas_mf` double(11,4) NOT NULL,
  `horas_ch` double(11,4) NOT NULL,
  `flot_prom_ph` double(11,4) NOT NULL,
  `flot_sum_npozos` double(11,4) NOT NULL,
  `mol_pm_ct4` double(11,4) NOT NULL,
  `mol_alim` double(11,4) NOT NULL,
  `mol_over` double(11,4) NOT NULL,
  `mol_under` double(11,4) NOT NULL,
  `mol_desc` double(11,4) NOT NULL,
  `mol_malla` double(11,4) NOT NULL,
  `chan_malla_stock` double(11,4) NOT NULL,
  `chan_porcen` double(11,4) NOT NULL,
  `kw_ini` double(11,4) NOT NULL,
  `kw_fin` double(11,4) NOT NULL,
  `consu_agua` double(11,4) NOT NULL,
  `consu_bolas` double(11,4) NOT NULL,
  `desg_martillos` double(11,4) NOT NULL,
  `litros_consu` double(11,4) NOT NULL,
  `bolas_consu` double(11,4) NOT NULL,
  `martillos_consu` double(11,4) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `pm_ctrl_general`
-- 

