FROM node:25-alpine3.21 AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps --force
COPY frontend/ ./

RUN npm run build -- --output-path=dist/frontend/ --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
