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

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia template do nginx
COPY nginx.template.conf /etc/nginx/templates/default.conf.template

# Copia build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# ⬇️ ISSO AQUI É O CRÍTICO
CMD ["nginx", "-g", "daemon off;"]
