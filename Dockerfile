FROM alpine:latest
MAINTAINER Aaron Mortenson <amortens@andrew.cmu.edu>

RUN apk update && \
    apk add nodejs && \
    cd ~/ && \
    npm install npm -g && \
    npm install redbird && \
    rm -rf /var/cache/apk/*

COPY proxies.js /root/proxies.js

EXPOSE 22 80 443

CMD ["/usr/bin/node"]
