FROM oven/bun:1-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN apk add --no-cache curl

RUN bun install --frozen-lockfile --production

EXPOSE 3456

CMD [ "bun", "index.js" ]
