# Stage 1: Build the frontend application
FROM node:14 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build --prod

# Stage 2: Build the server application
FROM node:14 AS build-server
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .

# Stage 3: Serve the application
FROM nginx:alpine AS serve-frontend
COPY --from=build-frontend /app/frontend/dist/frontend /usr/share/nginx/html

FROM node:14 AS serve-server
WORKDIR /app/server
COPY --from=build-server /app/server .
COPY --from=serve-frontend /usr/share/nginx/html /usr/share/nginx/html
EXPOSE 3000
CMD ["node", "server.js"]