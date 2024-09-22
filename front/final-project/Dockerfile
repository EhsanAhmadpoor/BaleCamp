FROM node:18-alpine
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

RUN npm install --global serve

EXPOSE 80
CMD PORT=80 serve ./dist