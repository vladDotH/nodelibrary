-- Up Migration
create table "Books"
(
    id                serial primary key,
    title             varchar,
    author            varchar,
    "publicationDate" date,
    genres            varchar[]
);
create table "Users"
(
    id               serial primary key,
    username         varchar unique,
    "passwordHash"   varchar,
    "rolesMask"      int4,
    email            varchar unique,
    "emailToken"     varchar,
    "emailConfirmed" bool
);

create index Users_username_index on "Users" using hash (username);
create index Users_email_index on "Users" using hash (email);
create index Users_email_token_index on "Users" using hash ("emailToken");

-- Down Migration
drop table if exists "Books";
drop table if exists "Users";