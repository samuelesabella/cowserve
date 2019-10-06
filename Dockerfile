FROM mhart/alpine-node:12

# Installing cowsay
# https://github.com/Weithenn/cowsay
RUN apk update && \
  apk add --no-cache git perl bash && \
  cd /tmp && \
  git clone https://github.com/jasonm23/cowsay.git  && \
  cd cowsay ; ./install.sh /usr/local/ && \
  rm -rf /var/cache/apk/* /var/tmp/* /tmp/* && \
  apk del git

# npm dependecies
RUN npm i --save-dev --loglevel=error https-localhost 

ADD cowserve.js ./

EXPOSE 8080

CMD ["node", "cowserve.js"]
