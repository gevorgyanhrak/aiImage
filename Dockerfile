FROM node:20-alpine

WORKDIR /var/www/client

# Install bash (Alpine Linux uses ash by default)
RUN apk add --no-cache bash

ARG envName
ARG CF_ACCESS_CLIENT_ID
ARG CF_ACCESS_CLIENT_SECRET

ENV ENV_NAME=$envName \
    NODE_ENV=production \
    APP_KEY=$appKeys \
    CI=true \
    CF_ACCESS_CLIENT_ID=$CF_ACCESS_CLIENT_ID \
    CF_ACCESS_CLIENT_SECRET=$CF_ACCESS_CLIENT_SECRET

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./
RUN rm -rf .next/cache

# Install dependencies
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Copy all files
COPY . .

RUN pnpm run build:$ENV_NAME

EXPOSE 3000

CMD pnpm start:$ENV_NAME