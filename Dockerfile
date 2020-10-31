# Stage 1

FROM node:14.5.0 as build-step

#RUN mkdir -p /app
WORKDIR /usr/src/app
COPY package.json package-lock.json  ./

RUN npm install
COPY . .

#ARG configuration=production

# Production
#RUN npm run build -- --prod
# Dev - localhost
RUN npm run clean
RUN npm run build


# Stage 2

# Open the port, inside docker network
#EXPOSE 4200

FROM nginx:1.19.3-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /usr/src/app/dist/docs-archive-fe /usr/share/nginx/html

