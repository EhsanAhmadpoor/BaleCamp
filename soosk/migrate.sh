#!/bin/bash

image="aminkhp/soosk:0.1.7"

function run() {    
      docker run \
            -e PGUSER=postgres \
            -e PGDATABASE=sooskdb \
            -e PGPASSWORD=password \
            -e PGPORT=5432 \
            -e DATABASE_URL=postgresql://postgres:password@db:5432/sooskdb?schema=public \
            --network soosk_soosk_network \
            $image $1      
}


run "yarn prisma migrate deploy"
run "node ./dist/migration/update_votes.js"
