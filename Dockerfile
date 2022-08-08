FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=prod

COPY server/package*.json server/
RUN npm run install-server --only=prod

COPY client/ client/
RUN npm run build --prefix client

RUN server/ server/

USER node

CMD [ "npm", "start", "--prefiex", "server" ]

EXPOSE 8000