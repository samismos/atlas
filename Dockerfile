FROM node:18-alpine3.20

COPY ./ /app
WORKDIR /app
RUN npm install 
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]