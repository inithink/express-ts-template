FROM node:18-alpine3.14
WORKDIR /app
COPY package.json yarn.lock .yarn .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install
COPY . .
RUN yarn build
CMD ["node", "--require", "./.pnp.cjs", "dist/main.js"]