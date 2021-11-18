#get the latest alpine image from node registery
# FROM node:alpine
FROM node:lts-alpine3.14
# FROM node:17.1.0-alpine
# FROM node:13.12.0-alpine

#set the working directory
WORKDIR /app

#copy the package and package lock files
#from local to container work directory /app
COPY package*.json /app/
# ENV DEBUG=*

#Run command npm install to install packages
RUN npm install

#copy all the folder contents from local to container
COPY . .

EXPOSE 3000

#create a react production build
# RUN npm run build
CMD ["npm", "start"]