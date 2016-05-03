--
-- Database: `exercise`
--

-- --------------------------------------------------------

--
-- Table structure for table `Brand`
--

CREATE TABLE `Brand` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idBrand` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(7) NOT NULL,
  `colour` varchar(10) DEFAULT 'white',
  `colourcode` varchar(6) DEFAULT 'FFFFFF',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `availability` enum('In Stock','Out Of Stock','Archived') DEFAULT 'Archived'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProduct` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `comment` text NOT NULL,
  `rating` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idUserType` int(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bday` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UserType`
--

CREATE TABLE `UserType` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `simpleacl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
