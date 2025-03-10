FROM nginx:alpine

# ADD VERSION generated by the Jenkins job
ARG VERSION

# Add global configuration
# "${NGINX_CONF_PATH}" is a placeholder for the actual path
COPY docker-resources/nginx.conf /etc/nginx/nginx.conf

# Add default configuration for a server
# "${NGINX_SERVER_CONF_PATH}" is a placeholder for the actual path
COPY docker-resources/nginx-server.conf /etc/nginx/conf.d/default.conf

# Add the application
# "${HOME}" is a placeholder for the actual path
COPY $ARTIFACT_PATH /usr/share/nginx/html