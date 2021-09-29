FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN yarn --frozen-lockfile && \
    yarn cache clean

EXPOSE 3456

CMD [ "node", "index.js" ]
