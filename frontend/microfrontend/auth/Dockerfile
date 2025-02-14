FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]

EXPOSE 8091