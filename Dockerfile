FROM node:21 as client

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

FROM node:21

WORKDIR /usr/src/app
COPY --from=client /usr/src/app/client/dist/ ./client/dist/

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY server/package*.json ./
RUN npm install
COPY server/ ./

EXPOSE 3000

CMD ["npm", "start"]