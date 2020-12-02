# Define Base Image
FROM node:10.19.0

ARG ARGS_NODE_BUILD
# Set Working Directory Under Repository Directory
WORKDIR /usr/src/app
ENV BABEL_DISABLE_CACHE=1

# Update Some Package
RUN apk add --update --no-cache --virtual .build-dev build-base python python-dev

# Copy all file inside repository to Working Directory
COPY . .

# install required package 
#   If your apps having bycypt please add this command before "&& apl del .build-dev"
#   > && npm rebuild bcrypt --build-from-source
RUN npm i -g npm \
    && npm i -g node-gyp \
    && npm i \
    && npm run build:${ARGS_NODE_BUILD}  \
    && apk del .build-dev

# Expose Application Port
EXPOSE 3000

# Run Application
CMD ["npm", "start"]
