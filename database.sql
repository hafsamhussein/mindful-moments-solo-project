
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE moments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    name VARCHAR(255) NOT NULL,
    date DATE,
    notes TEXT,
    photo_url VARCHAR(512)
);

INSERT INTO "moments" ( "user_id", "name", "date", "notes", "photo_url")
VALUES 
(1, 'Special Moment', '2023-10-13', 'Peaceful walk at Midtown Greenway', 'public/images/IMG_0566.jpeg');


CREATE TABLE reflections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    content TEXT,
    date DATE DEFAULT CURRENT_DATE
);

