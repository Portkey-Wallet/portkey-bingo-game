FROM node:18.0.0

ARG web=/opt/workspace/portkey-bingo-game

WORKDIR ${web}

COPY . ${web}

RUN yarn \
    && yarn build 

ENTRYPOINT yarn dev

EXPOSE 3000