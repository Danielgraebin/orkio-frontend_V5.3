# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build-time env for Vite (must start with VITE_)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:1.25-alpine

# Render nginx config at runtime to respect Railway's $PORT
COPY nginx.template.conf /etc/nginx/conf.d/default.template.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Do NOT depend on executable bit; run via sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
