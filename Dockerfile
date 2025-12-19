# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json ./
RUN npm install --omit=dev=false

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:1.25-alpine

# Template config rendered at runtime to respect Railway's $PORT
COPY nginx.template.conf /etc/nginx/conf.d/default.template.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
RUN chmod +x /docker-entrypoint.sh

