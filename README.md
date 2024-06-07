# Cash App

This is a simple Wallet app built using Turborepo and NextJs. The backend bankWebhook handler is built using Fastify. 

### Pull Docker Container from DockerHub
```bash
    docker pull jaskirat01/cash-user-app:latest
```

## Video Demo


## Setup

### Run natively
- Clone the repo

- Install yarn and the dependencies
```bash
    npm install --global yarn && yarn install
```
- Setup .env file
```bash
    DATABASE_URL,
    JWT_SECRET,
    NEXTAUTH_URL,
```
- Create Prisma Client
```bash
    cd packages/db
    npx prisma generate
    cd ../..
```
- Build
```bash
    yarn run build
```
- Run user app
```bash
    yarn run start-user-app
```

### Run in Docker Container
- Build Docker Image
```bash
    docker build -t user-app -f ./docker/Dockerfile.user .
```
- Run the Docker Image
```bash
    docker run --name user-app-container -p 3000:3000 user-app
```