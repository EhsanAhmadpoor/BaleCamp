FROM node:18-alpine3.16 as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn gen \
    && yarn run build \
    && npm prune --omit=dev

# ---

FROM node:18-alpine3.16

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ .

EXPOSE 3000
CMD ["node", "src/main.js"]