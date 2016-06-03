FROM alpine:latest
MAINTAINER Aaron Mortenson <amortens@andrew.cmu.edu>

RUN apk update && \
    apk add nodejs && \
    rm -rf /var/cache/apk/* && \
    mkdir /data && \
    npm install redbird && \

WORKDIR /data

EXPOSE 80 443

CMD ["sh"]
