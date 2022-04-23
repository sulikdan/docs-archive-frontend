# Stage 1

FROM node:10.13.0 as build-step


#RUN mkdir -p /app
WORKDIR /usr/src/app
#Cleaning

COPY package.json package-lock.json  ./

RUN npm install font-awesome --save
RUN npm install -g @angular/cli@10.1.3
RUN npm install
COPY . .

# Production
#RUN npm run build -- --prod
# Dev - localhost
RUN npm run build -- --prod


# Stage 2

# Open the port, inside docker network default is 80
#EXPOSE 4200
EXPOSE 80

FROM nginx:stable-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /usr/src/app/dist/docs-archive-fe /usr/share/nginx/html

