FROM postgres:9.6

WORKDIR /src/

ADD . /src
RUN echo "\i /src/init.sql" >> /docker-entrypoint-initdb.d/init.sql
