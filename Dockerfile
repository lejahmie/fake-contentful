FROM node:6.11.0

# From node:*-onbuild
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json over and run install
COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]
