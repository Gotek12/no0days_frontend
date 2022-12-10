FROM node:18-alpine AS build
LABEL maintainer='Placki Inc'

# set working directory
WORKDIR /app

COPY / ./
COPY package.json ./
COPY package-lock.json ./

# install app dependencies
RUN npm install -g @angular/cli && npm install -g --silent
RUN ng build

# add app
COPY . .

## start app
FROM nginx:1.23.2-alpine as runtime
WORKDIR /app
COPY --from=build /app/dist/no0days_frontend /usr/share/nginx/html

EXPOSE 80
