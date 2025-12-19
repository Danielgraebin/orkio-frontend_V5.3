# ---------- build ----------
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- runtime ----------
FROM nginx:1.25-alpine

# 🔑 INSTALA envsubst
RUN apk add --no-cache gettext

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia nginx base
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /tmp/default.conf && mv /tmp/default.conf /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
