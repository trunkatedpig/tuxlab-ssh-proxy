FROM alpine:latest
MAINTAINER Derek Brown <derek@allderek.com>

COPY src/ /root/

RUN apk update && \
    apk upgrade && \
    apk add python && \
    apk add g++ && \
    apk add make && \
    apk add git && \
    apk add nodejs && \
    cd /root/ && \
    npm install -g npm && \
    npm install --production && \
    rm -rf /var/cache/apk/* && \
    chmod +x docker_setup.sh && \
    ./docker_setup.sh

EXPOSE 22 80 443

ENTRYPOINT ["node"]
CMD ["/root/proxy.js"]
