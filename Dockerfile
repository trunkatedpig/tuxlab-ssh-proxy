FROM alpine:latest
MAINTAINER Aaron Mortenson <amortens@andrew.cmu.edu>

COPY tuxproxy /root/

RUN apk update && \
    apk add nodejs && \
    cd ~/ && \
    npm install npm -g && \
    npm install && \
    rm -rf /var/cache/apk/*


EXPOSE 22 80 443

ENTRYPOINT ["node"]
CMD ["proxy.js"]
