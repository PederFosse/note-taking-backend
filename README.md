

## Run server with docker
### .env file (in root folder)

POSTGRES_USER=postgres
<br/>POSTGRES_PASSWORD=postgres

### Run server on docker:
`docker-compose up -d`

The server will then be available at http://localhost:8080


## Run locally without docker
To run locally (without docker) in dev you will need the following:


### .env file (in root folder)

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/atcampus-notes?schema=public

### postgres database called atcampus-notes.
Create db locally
`createdb atcampus-notes`

### install dependencies
`npm install`

### Run migrations locally
`npx prisma migrate dev`

### start dev
`npm run dev`
