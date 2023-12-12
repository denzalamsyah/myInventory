FROM node:18 as dependencies
WORKDIR /alaya-dashboard
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
