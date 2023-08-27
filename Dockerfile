FROM node:18-alpine3.14 as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

FROM base as builder
COPY . .
RUN yarn build

FROM base as runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 80
COPY --from=builder /app/index.js .
EXPOSE 80
CMD ["node", "--require", "source-map-support/register", "index.js"]