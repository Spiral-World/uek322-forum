FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
COPY client /app/dist
ENTRYPOINT ["yarn", "start"]
EXPOSE 3000
