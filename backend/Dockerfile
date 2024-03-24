FROM node:18.19.1-alpine3.19
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/ ./src/
CMD [ "npm", "start"]
