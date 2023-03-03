# signId

use the whaticket database and create another one
```bash
CREATE TABLE `signId`.`delivered` (`id` INT NOT NULL AUTO_INCREMENT , `unit` VARCHAR(255) NOT NULL , `xworkId` INT(20) NOT NULL , `date` DATETIME NOT NULL , `atendant` VARCHAR(255) NOT
NULL , `signature` LONGTEXT NOT NULL , PRIMARY KEY (`id`));```
