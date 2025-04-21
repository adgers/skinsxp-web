FROM registry.cn-chengdu.aliyuncs.com/images-a/nginx:1.22-alpine-20230105
WORKDIR /usr/share/nginx/html/
EXPOSE 80
ADD dist/ /usr/share/nginx/html/

