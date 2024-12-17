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
  "duration_months" INTEGER,
  "quantity_lessons" INTEGER,
  "quantity_videos" INTEGER,
  "enrollment_fee" INTEGER,
  "enrollment_fee_usd" INTEGER,
  "monthly_fee" INTEGER,
  "monthly_fee_usd" INTEGER
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

CREATE TABLE "payment_methods" (
  "id" INTEGER PRIMARY KEY,
  "name" VARCHAR,
  "description" VARCHAR
);

CREATE TABLE "payments" (
  "id" INTEGER PRIMARY KEY,
  "enrollment_id" INTEGER,
  "amount" INTEGER,
  "payment_method_id" INTEGER,
  "months_covered" INTEGER,
  "payment_date" TIMESTAMP,
  "currency" VARCHAR,
  "payment_reference" VARCHAR,
  FOREIGN KEY ("enrollment_id") REFERENCES "enrollments" ("id"),
  FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("id")
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
  "title" VARCHAR,
  "description" TEXT,
  "lesson_number" INTEGER,
  "url" VARCHAR,
  FOREIGN KEY ("module_id") REFERENCES "course_modules" ("id")
);

