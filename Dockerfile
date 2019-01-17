FROM node:8

RUN npm install --global yarn

RUN mkdir /src
WORKDIR /src/
COPY . /src/

RUN yarn

CMD yarn run dev
