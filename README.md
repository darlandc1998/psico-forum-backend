# PsicoForum

Personal project to learn more about prism technology.

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement. Also, you must have PostgreSQL database.

## Steps to get started

1 - Create a ```.env ```  file based on ```.env.example``` and fill in its variables.

## Install all dependencies

Use the package manager [yarn](https://yarnpkg.com/) to install dependencies.

```bash
yarn add
```

## Create structure database

For create database and your information, run command:

```bash
yarn prisma migrate dev
```

## Run mode development

```bash
yarn dev
```

## Run unity tests

```bash
yarn test
```

## Run mode production

```bash
yarn build
```

###### Create image from Dockerfile

```
docker build . -t <your_username>/psico-forum
```

###### Run imagem created by Dockerfile

```
docker run -e APP_PORT="APP_PORT" -e DATABASE_URL="DATABASE_URL" -p 3000:3000 -d <your_username>/psico-forum
```

###### Preview API documentation

Go to ${URL_APPLICATION}/api-doc to see the api documentation

## License
[MIT](https://choosealicense.com/licenses/mit/)
