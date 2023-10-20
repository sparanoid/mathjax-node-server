FROM node:21-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN apk add --no-cache curl

RUN yarn global add pnpm && pnpm i --frozen-lockfile

EXPOSE 3456

CMD [ "node", "index.js" ]
