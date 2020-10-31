# Stage 1

FROM node:12.11.1 as build-step


#RUN mkdir -p /app
WORKDIR /usr/src/app
#Cleaning
#RUN npm run clean

COPY package.json package-lock.json  ./

RUN npm install font-awesome --save
COPY . .

#ARG configuration=production

# Production
#RUN npm run build -- --prod
# Dev - localhost
RUN npm run build


# Stage 2

# Open the port, inside docker network
#EXPOSE 4200

FROM nginx:stable-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /usr/src/app/dist/docs-archive-fe /usr/share/nginx/html

