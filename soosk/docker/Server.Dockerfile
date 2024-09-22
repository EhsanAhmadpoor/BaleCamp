FROM node:18

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn run build

CMD ["yarn", "start:prod"]