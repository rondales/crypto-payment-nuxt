FROM node:12.13.1-alpine3.9 as builder

ARG NPM_COMMAND
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN mkdir /work
COPY /src /work/src
COPY /public /work/public
COPY .env.mainnet /work/.env.mainnet
COPY .env.premain /work/.env.premain
COPY .env.testnet /work/.env.testnet
COPY .env.staging /work/.env.staging
COPY vue.config.js /work/vue.config.js
COPY package.json /work/package.json
COPY package-lock.json /work/package-lock.json
COPY yarn.lock /work/yarn.lock

RUN apk add --update-cache git

WORKDIR /work

RUN npm install -g npm@8.5.5 && npm ci && npm run ${NPM_COMMAND}

FROM alpine

ARG pip_installer="https://bootstrap.pypa.io/get-pip.py"
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG AWS_S3_BUCKET

ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION $AWS_DEFAULT_REGION

COPY --from=builder /work/dist /usr/local/src

# Install aws cli
RUN apk --no-cache add binutils curl && \
  curl -sL https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -o /etc/apk/keys/sgerrand.rsa.pub && \
  curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk && \
  curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-bin-2.33-r0.apk && \
  apk add --no-cache glibc-2.33-r0.apk glibc-bin-2.33-r0.apk && \
  curl -sL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip && \
  unzip -q awscliv2.zip && \
  aws/install

WORKDIR /usr/local/src

RUN aws s3 sync . s3://${AWS_S3_BUCKET}/ --include "*" --cache-control "max-age=3600"
