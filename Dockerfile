FROM alpine:latest
MAINTAINER Aaron Mortenson <amortens@andrew.cmu.edu>

COPY src/ /root/

RUN apk update && \
    apk add python && \
    apk add g++ && \
    apk add make && \
    apk add git && \
    apk add nodejs && \
    cd ~/ && \
    npm install npm -g && \
    npm install --production && \
    rm -rf /var/cache/apk/*


EXPOSE 22 80 443

ENTRYPOINT ["node"]
CMD ["/root/proxy.js"]
