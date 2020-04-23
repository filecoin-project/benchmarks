# build stage
FROM node:12-alpine as build-stage
WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn parse-data
RUN yarn build
RUN yarn export

# production stage
FROM nginx:1.13.12-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]