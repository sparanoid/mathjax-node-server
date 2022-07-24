FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN apk add --no-cache curl

RUN yarn --frozen-lockfile && \
    yarn cache clean

EXPOSE 3456

CMD [ "node", "index.js" ]
