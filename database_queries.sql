-- 1.
-- Creating the tables.

-- First creating the database.
DROP DATABASE IF EXISTS ireflix;
CREATE DATABASE IF NOT EXISTS ireflix;
USE ireflix;

DROP TABLE IF EXISTS movies,
series,
actors,
directors,
users,
movies_activity,
series_activity,
year_data;

CREATE TABLE movies (
id INT,
title VARCHAR(39),
genre VARCHAR(20),
duration INT,
rating INT,
actor_name VARCHAR(35),
actor_surname VARCHAR(35),
director_name VARCHAR(35),
director_surname VARCHAR(35)
);

CREATE TABLE series (
id INT,
title VARCHAR(39),
genre VARCHAR(20),
rating INT,
actor_name VARCHAR(35),
actor_surname VARCHAR(35),
director_name VARCHAR(35),
director_surname VARCHAR(35),
seasons INT
);

CREATE TABLE actors (
name VARCHAR(35),
surname VARCHAR(35),
nationality VARCHAR(35)
);

CREATE TABLE directors (
name VARCHAR(35),
surname VARCHAR(35),
nationality VARCHAR(35)
);

CREATE TABLE users (
username VARCHAR(35),
name VARCHAR(35),
surname VARCHAR(35),
pass VARCHAR(15)
);

CREATE TABLE movies_activity (
username VARCHAR(35),
id INT,
genre VARCHAR(20)
);

CREATE TABLE series_activity (
username VARCHAR(35),
id INT,
genre VARCHAR(20)
);


-- 2.
-- Adding movie/series year to the database.
CREATE TABLE year_data (
id INT,
year INT
);





-- 5.
-- Famous actor that is a protagonist in several movies.
SELECT DISTINCT actor_surname FROM movies 
HAVING COUNT(actor_surname) > 4
ORDER BY COUNT(actor_surname) DESC;




-- 6
-- List actors that were protagonists in movies but not series.
SELECT DISTINCT * FROM movies 
WHERE actor_surname NOT IN 
(SELECT actor_surname FROM series);