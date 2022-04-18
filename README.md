

## Run server with docker
### .env file (in root folder)

`POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres`

`docker-compose up -d`

The server will then be available at http://localhost:8080


## Run locally without docker
To run locally (without docker) in dev you will need the following:


### .env file (in root folder)

`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/atcampus-notes?schema=public``

### postgres database called atcampus-notes.
`createdb atcampus-notes` to create the database locally

### Run migrations locally
`npx prisma migrate dev`

### start dev
`npm run dev`