#ingresar a la base de datos
sudo docker exec -it postgres_container_movimientosdelalma psql -U admin -d movimientosdelalma_database

#borrar tabla
DROP TABLE IF EXISTS users;

#ver tabla
\d users