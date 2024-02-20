# Use a Node.js image
FROM node:20 as development

# Set the working directory in the container
WORKDIR /app/

COPY package*.json /
# Install project dependencies
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]