FROM nginx:latest

EXPOSE 80
ADD ./dist /usr/share/nginx/html
ADD ./default.conf  /etc/nginx/conf.d
CMD systemctl restart nginx
