FROM node:18.19.1-alpine3.19 AS builder
WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build-only

FROM nginx:1.25.4-alpine3.18

COPY nginx.conf /etc/nginx/nginx.conf

COPY replace_env_placeholders.sh /usr/share/nginx/replace_env_placeholders.sh

COPY entrypoint.sh /usr/share/nginx/entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["sh", "/usr/share/nginx/entrypoint.sh"]
