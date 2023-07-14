/* Replace with your SQL commands */
 create table if not exists Registrations_event  
 (id Serial PRIMARY KEY,eventTitle varchar (255)  ,event_id integer REFERENCES Events (id) )
