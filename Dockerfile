FROM nginx:stable-alpine

# The build context is an allowlist in .dockerignore: only public site files enter
# the image. nginx listens above 1024 so the container can run as an unprivileged
# user without Linux capabilities.
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/nginx.conf /usr/share/nginx/html/50x.html \
    && nginx -t

USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
