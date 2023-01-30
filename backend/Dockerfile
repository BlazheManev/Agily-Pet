FROM node:16.15.0-alpine
WORKDIR /usr/src/agilypet
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]