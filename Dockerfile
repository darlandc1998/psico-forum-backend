FROM node:14-alpine3.10
LABEL maintainer = "Darlan Domingos Candiotto"

WORKDIR /usr/src/app/psico-forum

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./
COPY src ./src

RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["yarn", "production"]
