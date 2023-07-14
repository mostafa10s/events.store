 create table if not exists registration  
 (id Serial PRIMARY KEY,"email" text UNIQUE NOT NULL,"password" text NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,"lastName" VARCHAR(255) ,"statues" INTEGER DEFAULT 0 NOT NULL)