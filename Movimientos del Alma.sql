CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
CREATE TYPE enrollment_status AS ENUM ('active', 'cancelled', 'completed', 'incompleted');

CREATE TABLE "users" (
  "id" VARCHAR PRIMARY KEY,
  "email" VARCHAR UNIQUE,
  "password" VARCHAR,
  "role" VARCHAR  
);

CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "description" INTEGER
);

CREATE TABLE "teacher" (
  "id" VARCHAR PRIMARY KEY,
  "identification_number" VARCHAR,
  "name" VARCHAR,
  "lastname" VARCHAR,
  "email" VARCHAR
);

CREATE TABLE "enrollments" (
  "id" SERIAL PRIMARY KEY,
  "student_id" VARCHAR,
  "course_id" INTEGER,
  "enrollment_date" TIMESTAMP,
  "modules_covered" INTEGER, 
  "notes" VARCHAR,
  FOREIGN KEY ("student_id") REFERENCES "users" ("id"),
  FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
);

CREATE TABLE "student" (
  "id" VARCHAR PRIMARY KEY,
  "identification_number" VARCHAR,
  "name" VARCHAR,
  "lastname" VARCHAR,
  "email" VARCHAR UNIQUE,
  "nationality" VARCHAR,
  FOREIGN KEY ("id") REFERENCES "users" ("id"),
  FOREIGN KEY ("payment_method") REFERENCES "payment_methods" ("id")
);

CREATE TABLE "teacher_courses" (
  "id" INTEGER PRIMARY KEY,
  "teacher_id" VARCHAR,
  "course_id" INTEGER,
  FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id"),
  FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
);

CREATE TABLE "course_modules" (
  "id" SERIAL PRIMARY KEY,
  "course_id" INTEGER,
  "module_number" INTEGER,
  "name" VARCHAR,
  "description" TEXT,
  FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
);

CREATE TABLE "lessons" (
  "id" SERIAL PRIMARY KEY,
  "module_id" INTEGER,
  "course_id" INTEGER,
  "lesson_number" INTEGER,
  "title" VARCHAR,
  "description" TEXT,
  "url" VARCHAR,
  FOREIGN KEY ("module_id") REFERENCES "course_modules" ("id"),
  FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
);

