\ir functions.sql

-- Create user
create role webserver password 'password' nosuperuser nocreatedb nocreaterole inherit login;
grant usage on schema public to webserver;
alter default privileges in schema public grant select on tables to webserver;

-- Create our auth schema
create schema auth;

create table auth.users(
  id serial primary key not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz default current_timestamp,
  updated_at timestamptz default current_timestamp
);

  create trigger user_modified
  before update on auth.users
  for each row execute procedure set_modified_timestamp();

select append_search_path(current_user, 'auth');
select append_search_path('webserver', 'auth');