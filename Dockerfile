From mongo
#ENV MONGO_INITDB_ROOT_USERNAME root
#ENV MONGO_INITDB_ROOT_PASSWORD root
#ENV MONGO_INITDB_DATABASE testdb

# add nano
#RUN apt-get update && apt-get install -y nano


# add mongo-init file 
COPY scripts/init-mongo.js /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.js
