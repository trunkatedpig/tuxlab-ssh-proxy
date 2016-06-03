FROM alpine:latest
MAINTAINER Aaron Mortenson <amortens@andrew.cmu.edu>

RUN apk update && \
    apk add nodejs && \
    mkdir /data && \
    cd data && \
    npm install && \
    npm install redbird && \
    rm -rf /var/cache/apk/*

EXPOSE 80 443

CMD ["/entry.sh /bin/sh -c"]
