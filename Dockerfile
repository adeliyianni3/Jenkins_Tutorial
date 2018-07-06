FROM mhart/alpine-node
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]