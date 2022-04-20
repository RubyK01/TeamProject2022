DROP DATABASE IF EXISTS `reqqit`;

create database if not exists`reqqit` default character set utf8 collate utf8_general_ci;

use reqqit;

-- Made by Tomas
create table customer(
customerID int not null primary key auto_increment,
fName varchar(255) not null,
lName varchar(255) not null,
userName varchar(255) not null,
email varchar(255) not null,
pass_word varchar(255) not null
);

create table address(
addressline1 varchar(255) not null,
addressline2 varchar(255),
townOrCity varchar(255) not null,
county varchar(255) not null,
zipCode varchar(255),
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table products(
productID int not null primary key auto_increment,
productName varchar(255) not null,
price double not null,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table productIMG(
image varchar(800) not null,
productID int not null auto_increment primary key,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table reciepts(
orderDate date,
orderID int not null primary key,
price double,
productID int not null,
customerID int not null,
foreign key (productID) references products(productID) on delete cascade,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table payment(
cardNum int,
holderName varchar(255),
secruityNum int,
expiray date,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade
);

-- Jcena password is password1 
insert into customer(fName, Lname, userName, email, pass_word) values ("John","Cena","Jcena","johnc@email.com","$2a$05$yvHo6wr5kC4FqQKvGEXqF.RUIw0sO3NtuZHNzNDz1TSAjypDhvzuS");