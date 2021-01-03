<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$active_group = 'default';
$query_builder = TRUE;

/*  DATABASE DEFAULT VALUES
	**Change this values if you are not running Docker**

	$db['default'] = array(
		'dsn'	=> '',
		'hostname' => 'localhost', 
		'username' => 'root',
		'password' => '',
		'database' => 'teamspeak_db',
		'dbdriver' => 'mysqli',
		'dbprefix' => '',
		'pconnect' => FALSE,
		'db_debug' => (ENVIRONMENT !== 'production'),
		'cache_on' => FALSE,
		'cachedir' => '',
		'char_set' => 'utf8',
		'dbcollat' => 'utf8_general_ci',
		'swap_pre' => '',
		'encrypt' => FALSE,
		'compress' => FALSE,
		'stricton' => FALSE,
		'failover' => array(),
		'save_queries' => TRUE
	);
*/

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => $_ENV["MYSQL_HOST"], 
	'username' => $_ENV["MYSQL_USER"],
	'password' => $_ENV["MYSQL_PASSWORD"],
	'database' => $_ENV["MYSQL_DATABASE"],
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
