FROM nginx:latest
EXPOSE 80
ADD  ./nginx/default.conf   /etc/nginx/conf.d/default.conf
ADD  ./dist            /usr/share/nginx/html
