FROM node:8-alpine

COPY . /app

WORKDIR /app

EXPOSE 8080

CMD ["node", "index.js"]