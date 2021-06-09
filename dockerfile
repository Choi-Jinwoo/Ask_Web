FROM node:15

WORKDIR /usr/src/ask-web
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

VOLUME ["/usr/src/ask-web/build"]

RUN npm run build

CMD echo build finished