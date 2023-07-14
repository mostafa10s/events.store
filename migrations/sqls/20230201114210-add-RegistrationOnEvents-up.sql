/* Replace with your SQL commands *//* Replace with your SQL commands */
 create table if not exists RegistrationOnEvents  
 (id Serial PRIMARY KEY, RgesterEvent_id integer REFERENCES Registrations_event (id), user_id integer REFERENCES registration (id),statues varchar(255)NOT NULL )
