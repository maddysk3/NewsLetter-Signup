FROM node:12.22.9
WORKDIR app
COPY . .
RUN npm install
EXPOSE 3010
CMD ["node", "app.js"]