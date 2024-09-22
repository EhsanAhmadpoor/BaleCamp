FROM node:lts as build

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /home/node/app

COPY . /home/node/app/
RUN npm install
RUN npm run build

# Serve
FROM denoland/deno:1.44.0 as serve
WORKDIR /serve
COPY ./serve /serve/
RUN deno cache main.ts

# Production
FROM serve as production
WORKDIR /site
COPY --from=build /home/node/app/build /site

CMD ["run", "-A", "../serve/main.ts", "."]


