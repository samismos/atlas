FROM node:18-alpine3.20

COPY ./ /app
WORKDIR /app
RUN npm install 
EXPOSE 3100
ENTRYPOINT [ "node", "server.js" ]