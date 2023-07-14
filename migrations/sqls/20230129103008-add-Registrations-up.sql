/* Replace with your SQL commands */
 create table if not exists event  
 (id Serial PRIMARY KEY,"title" text NOT NULL,"description" text NOT NULL,"dateEvent" date, event_id integer REFERENCES Registration (id) )
