#ingresar a la base de datos
sudo docker exec -it postgres_container_movimientosdelalma psql -U admin -d movimientosdelalma_database

#borrar tabla
DROP TABLE IF EXISTS users;

#ver tabla
\d users

################### Eliminar tablas ##############################################

-- Deshabilitar temporalmente las restricciones de clave foránea
SET session_replication_role = 'replica';

-- Eliminar las tablas en el orden correcto
DROP TABLE IF EXISTS "module_videos" CASCADE;
DROP TABLE IF EXISTS "lessons" CASCADE;
DROP TABLE IF EXISTS "course_modules" CASCADE;
DROP TABLE IF EXISTS "teacher_courses" CASCADE;
DROP TABLE IF EXISTS "student" CASCADE;
DROP TABLE IF EXISTS "payments" CASCADE;
DROP TABLE IF EXISTS "payment_methods" CASCADE;
DROP TABLE IF EXISTS "enrollments" CASCADE;
DROP TABLE IF EXISTS "teacher" CASCADE;
DROP TABLE IF EXISTS "courses" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Rehabilitar las restricciones de clave foránea
SET session_replication_role = 'origin';

-- Eliminar el tipo ENUM 'user_role'
DROP TYPE IF EXISTS user_role;

###################### Restaurar backup #############################################

PGPASSWORD="pass" psql -h url.db -U postgres -d railway -p 1234 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

PGPASSWORD="pass" pg_restore --no-owner --no-privileges -h url.db -U postgres -d railway -p 1234 /ruta/al/backup.dump
