-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-08-06 07:40:16.073

-- tables
-- Table: apointment_services
CREATE TABLE apointment_services (
    id bigserial  NOT NULL,
    appointment_id int8  NOT NULL,
    service_id int  NOT NULL,
    price decimal(10,2)  NOT NULL,
    CONSTRAINT apointment_services_pk PRIMARY KEY (id)
);

CREATE INDEX apointment_services_idx_1 on apointment_services (appointment_id ASC);

-- Table: appointment
CREATE TABLE appointment (
    id bigserial  NOT NULL,
    veterinarian_id int  NOT NULL,
    pet_owner_id int  NOT NULL,
    pet_id int  NOT NULL,
    apointment_date date  NOT NULL,
    start_time timestamp  NOT NULL,
    end_time timestamp  NOT NULL,
    notes text  NULL,
    total_price decimal(10,2)  NULL,
    status varchar(2)  NOT NULL,
    cancellation_reason text  NULL,
    created_by int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_by int  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT appointment_pk PRIMARY KEY (id)
);

CREATE INDEX vet_date_status_index on appointment (veterinarian_id ASC,apointment_date ASC,status ASC);

CREATE INDEX pet_owner_pet_index on appointment (pet_owner_id ASC,pet_id ASC);

CREATE INDEX pet_owner_pet_status_index on appointment (pet_owner_id ASC,pet_id ASC,status ASC);

-- Table: pet
CREATE TABLE pet (
    id serial  NOT NULL,
    name varchar(128)  NOT NULL,
    CONSTRAINT pet_pk PRIMARY KEY (id)
);

-- Table: pet_user
CREATE TABLE pet_user (
    id bigserial  NOT NULL,
    pet_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT pet_user_pk PRIMARY KEY (id)
);

CREATE INDEX pet_id_index on pet_user (pet_id ASC);

CREATE INDEX user_id_index on pet_user (user_id ASC);

CREATE INDEX pet_user_index on pet_user (pet_id ASC,user_id ASC);

-- Table: schedule
CREATE TABLE schedule (
    id bigserial  NOT NULL,
    user_id int  NOT NULL,
    date date  NOT NULL,
    "from" timestamp  NOT NULL,
    "to" timestamp  NOT NULL,
    CONSTRAINT schedule_pk PRIMARY KEY (id)
);

CREATE INDEX usr_id_date__index on schedule (user_id ASC,date ASC);

-- Table: services
CREATE TABLE services (
    id serial  NOT NULL,
    name varchar(128)  NOT NULL,
    duration int  NOT NULL,
    price decimal(10,2)  NOT NULL,
    CONSTRAINT services_ak_1 UNIQUE (name) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT services_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    ID serial  NOT NULL,
    username varchar(64)  NOT NULL,
    password text  NOT NULL,
    role varchar(64)  NOT NULL,
    first_name varchar(64)  NOT NULL,
    last_name varchar(64)  NOT NULL,
    phone_number varchar(64)  NOT NULL,
    email varchar(128)  NOT NULL,
    status boolean  NOT NULL,
    CONSTRAINT unique_username UNIQUE (username) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT unique_email UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT user_pk PRIMARY KEY (ID)
);

CREATE INDEX username_role_index on "user" (username ASC,role ASC);

CREATE INDEX username_index on "user" (username ASC);

-- foreign keys
-- Reference: apointment_services_appointment (table: apointment_services)
ALTER TABLE apointment_services ADD CONSTRAINT apointment_services_appointment
    FOREIGN KEY (appointment_id)
    REFERENCES appointment (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: appointment_created_by_user (table: appointment)
ALTER TABLE appointment ADD CONSTRAINT appointment_created_by_user
    FOREIGN KEY (created_by)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: appointment_pet (table: appointment)
ALTER TABLE appointment ADD CONSTRAINT appointment_pet
    FOREIGN KEY (pet_id)
    REFERENCES pet (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: appointment_pet_owner (table: appointment)
ALTER TABLE appointment ADD CONSTRAINT appointment_pet_owner
    FOREIGN KEY (pet_owner_id)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: appointment_veterinarian (table: appointment)
ALTER TABLE appointment ADD CONSTRAINT appointment_veterinarian
    FOREIGN KEY (veterinarian_id)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: pet_user_pet (table: pet_user)
ALTER TABLE pet_user ADD CONSTRAINT pet_user_pet
    FOREIGN KEY (pet_id)
    REFERENCES pet (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: pet_user_user (table: pet_user)
ALTER TABLE pet_user ADD CONSTRAINT pet_user_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: schedule_hairdresser (table: schedule)
ALTER TABLE schedule ADD CONSTRAINT schedule_hairdresser
    FOREIGN KEY (user_id)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: service_provided_service (table: apointment_services)
ALTER TABLE apointment_services ADD CONSTRAINT service_provided_service
    FOREIGN KEY (service_id)
    REFERENCES services (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_appointment (table: appointment)
ALTER TABLE appointment ADD CONSTRAINT user_appointment
    FOREIGN KEY (updated_by)
    REFERENCES "user" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

