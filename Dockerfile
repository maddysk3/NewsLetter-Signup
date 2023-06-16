FROM node:12.22.9
WORKDIR app
COPY . .
RUN npm install
EXPOSE 3010
CMD ["MAILCHIMP_APIKEY", "bc4088ca2d5b94fcbc53511563373c71-us8","node", "app.js"]