# Soosk Server

## Description

Feedback App server

## Installation

```bash
$ yarn install
```

## .env

content

```
JWT_Secret="secret:)"
PGHOST=localhost
PGUSER=postgres
PGDATABASE=sooskdb
PGPASSWORD=password
PGPORT=5432
DATABASE_URL="postgresql://postgres:password@localhost:5432/sooskdb?schema=public"
UploadsDir=/home/<an existed dir>
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
