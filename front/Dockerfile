FROM node:20-slim

WORKDIR /app

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo

COPY app/package*.json app/yarn.lock ./

RUN yarn install && yarn cache clean --force

COPY . .
