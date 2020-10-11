FROM node:13.12.0-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN yarn build
RUN yarn global add serve

EXPOSE 5000
CMD ["serve","build"]