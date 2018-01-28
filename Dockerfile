FROM mhart/alpine-node:9.2

ENV NODE_ENV production
RUN mkdir -p /usr/app

COPY ["package.json", "yarn.lock", "/usr/app/"]

RUN cd /usr/app && yarn --non-interactive --pure-lockfile --ignore-scripts

WORKDIR /usr/app
ADD . /usr/app/

RUN cd /usr/app/ && yarn build

EXPOSE 3000

CMD yarn start
