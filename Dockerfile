# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --no-cache bash

# Create the entrypoint script
# RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
#     echo 'echo "window.env = {" > /usr/share/nginx/html/env.js' >> /docker-entrypoint.sh && \
#     echo 'echo "  GATEWAY_URL: \\"$GATEWAY_URL\\"" >> /usr/share/nginx/html/env.js' >> /docker-entrypoint.sh && \
#     echo 'echo "}" >> /usr/share/nginx/html/env.js' >> /docker-entrypoint.sh && \
#     echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
#     chmod +x /docker-entrypoint.sh

EXPOSE 80

# CMD ["/docker-entrypoint.sh"]
