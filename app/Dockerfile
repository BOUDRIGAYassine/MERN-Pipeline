#node js version
FROM node:latest

# working directory
WORKDIR /app

# handeling dependecy source (package.json)
COPY package.json ./

# install dependencies 
RUN npm install

# copy the rest of the code
COPY . ./

#env
ENV PORT 4000
# port
EXPOSE ${PORT}

