-- Active: 1725523237274@@127.0.0.1@3306/chatapp


--
-- Adatbázis: `chatapp`
--
CREATE DATABASE IF NOT EXISTS `chatapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `chatapp`;

 CREATE TABLE IF NOT EXISTS `blocks` (
  `BlockedUserId` int(11) NOT NULL,
  `BlockingUserId` int(11) NOT NULL,
  Foreign KEY (BlockeduserId) REFERENCES users(UserId) on delete CASCADE,
  Foreign KEY (BlockinguserId) REFERENCES chats(ChatId) on delete CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

drop table blocks;

CREATE TABLE IF NOT EXISTS `chatmembers` (
  `ChatId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  Foreign Key (ChatId) REFERENCES chats(ChatId) on delete CASCADE,
  Foreign Key (UserId) REFERENCES users(UserId) on delete CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

drop table chatmembers;

CREATE TABLE IF NOT EXISTS `chats` (
  `ChatId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ChatName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE chats;

CREATE TABLE IF NOT EXISTS `friendrequests` (
  `SenderId` int(11) NOT NULL,
  `RecieverId` int(11) NOT NULL,
  Foreign Key (SenderId) REFERENCES users(UserId) on delete cascade,
  Foreign Key (RecieverId) REFERENCES users(UserId) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `friendships` (
  `UserId` int(11) DEFAULT NULL,
  `FriendId` int(11) DEFAULT NULL,
  Foreign Key (UserId) REFERENCES users(UserId),
  Foreign Key (FriendId) REFERENCES users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `messages` (
  `MessageId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ChatId` int(11) DEFAULT NULL,
  `SenderId` int(11) NOT NULL,
  `SentTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

drop table users;

CREATE TABLE IF NOT EXISTS `users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL UNIQUE,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `PassWord` BLOB NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

create Table if not EXISTS file (
  FileId varchar(255) not null primary key UNIQUE,
  FileName varchar(255) NOT NULL,
  UploadTime TIMESTAMP default CURRENT_TIMESTAMP(),
  UserId int(11),
 Foreign Key (UserId) REFERENCES users(UserId));

)

alter table chats add Owner INTEGER

drop TRIGGER insertUser;
delimiter //
CREATE Trigger insertUser
BEFORE INSERT
ON users
for each row set
new.Email = LOWER(new.Email),
new.password = titok(new.password);

delimiter ;

insert into users values (null,'szilasi','Maci2@laci.hu','12345656','macika');
create PROCEDURE procInsertUser (in nev varchar(100),email VARCHAR(100),tel varchar(15),pwd varchar(20) )
Begin
    insert into users values (null,nev,email,tel,pwd);
End

create procedure countUser1 (out darab int)
begin
select count(*) into darab from users;
end


call `countUser1`(@darab);

select @darab;

Select lower('ASDFFGH');
call `procInsertUser`('maci Laci','maci@laci2.com','3654856569','bubu');


select * from users;

create function hali (st char(20))
RETURNS char(50) DETERMINISTIC
RETURN CONCAT('Hali',' ',st,'!'); 
select hali ('Norbi');
create function titok (pwd varchar(50))
RETURNS BLOB DETERMINISTIC
RETURN SHA2(CONCAT(pwd,'sozas'),256);
create function login(email varchar(100),
 pwd varchar(100))
RETURNS bool DETERMINISTIC
Begin
declare ok bool;
set ok = 0;
select count(*) into ok from users where
 `Email` = email and `PassWord` = titok(pwd);
RETURN ok;
end

select login('maci2@laci.com','macika')

select titok('macika');
start TRANSACTION

insert into chats values (null,'szoba1');
insert into messages values (null,1,1,null);
call `procInsertUser`('maci Laci','maci4@laci2.com','3654856569','bubu');
commit;
ROLLBACK;

