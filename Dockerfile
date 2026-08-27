# Multi-stage production build for Memory Match Arena
FROM nginx:alpine

# Copy web application assets to Nginx public HTML directory
COPY . /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
