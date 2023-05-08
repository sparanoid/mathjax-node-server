FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN apk add --no-cache curl

RUN corepack enable && corepack prepare pnpm@latest --activate \
    pnpm i --frozen-lockfile

EXPOSE 3456

CMD [ "node", "index.js" ]
