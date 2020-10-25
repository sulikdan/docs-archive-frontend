#FROM node:15.0.1 AS compile-image
#
##RUN npm install -g yarn
#
#WORKDIR /opt/ng
##COPY .npmrc package.json yarn.lock ./
#COPY package.json ./
##RUN yarn install
#
#ENV PATH="./node_modules/.bin:$PATH"
#
#COPY . ./
#RUN ng build --prod
#
#FROM nginx
#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=compile-image /opt/ng/dist/app-name /usr/share/nginx/html
# Stage 1

FROM node:15.0.1-alpine as build-step


RUN mkdir -p /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod



# Stage 2

FROM nginx:1.19.3-alpine

COPY --from=build-step /app/docs /usr/share/nginx/html


