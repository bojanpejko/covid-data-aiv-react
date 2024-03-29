FROM mhart/alpine-node:8.11.4
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY ./
EXPOSE 3000
CMD ["npm", "start"]