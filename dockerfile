FROM node:13.12.0-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ARG API_BASE_URL
RUN export API_BASE_URL
ENV API_BASE_URL "$API_BASE_URL"

COPY package.json ./
COPY package-lock.json ./
# RUN npm ci --silent
# RUN npm install react-scripts@3.4.3 -g --silent
COPY . ./
RUN yarn build
RUN yarn global add serve

EXPOSE 5000
CMD ["serve","build"]