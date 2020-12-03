# Define Base Image
FROM node:10.19.0
# Set Working Directory Under Repository Directory
WORKDIR /usr/src/app


# Copy all file inside repository to Working Directory
COPY . .

RUN npm install

# Expose Application Port
EXPOSE 3000

# Run Application
CMD ["npm", "start"]
