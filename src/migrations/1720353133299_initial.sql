-- Up Migration
create table "Books"
(
    id              serial primary key,
    title           varchar,
    author          varchar,
    publicationDate date,
    genres          varchar[]
);
create table "Users"
(
    id           serial primary key,
    username     varchar,
    passwordHash varchar,
    rolesMask    int4,
    email        varchar,
    emailToken   varchar
);

-- Down Migration
drop table if exists "Books";
drop table if exists "Users";