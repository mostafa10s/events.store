/* Replace with your SQL commands */
 create table if not exists Events
 (id Serial PRIMARY KEY,"title" text NOT NULL,"description" text NOT NULL,"dateEvent" date, user_id integer REFERENCES registration (id) ,statues text NOT NULL)
