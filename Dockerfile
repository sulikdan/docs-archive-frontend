# Stage 1

FROM node:14.5.0 as build-step


RUN mkdir -p /app

WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app

#ARG configuration=production

RUN npm run build --prod


# Stage 2

FROM nginx:1.19.3-alpine
COPY --from=build-step /app/dist/docs-archive-fe /usr/share/nginx/html

