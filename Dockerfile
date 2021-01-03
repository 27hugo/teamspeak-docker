# ------------------------------------------------------
# Frontend Compilation
# ------------------------------------------------------
FROM node:latest as builder

WORKDIR /app

COPY ./teamspeak-front/package*.json ./

RUN npm install

COPY ./teamspeak-front ./

RUN npm run build
# ------------------------------------------------------
# Production WebApp (Frontend & Backend) Deploy
# ------------------------------------------------------
FROM php:7.4-apache

RUN docker-php-ext-install mysqli && a2enmod rewrite

COPY ./teamspeak-api /var/www/html/api/

COPY --from=builder /app/build /var/www/html

COPY ./teamspeak-front/.htaccess /var/www/html

EXPOSE 80
