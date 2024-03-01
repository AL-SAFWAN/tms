# # Use a Node.js image
# FROM node:20 as development
# # Set the working directory in the container
# WORKDIR /app/
# COPY package*.json /
# # Install project dependencies
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev"]


# Stage 1: Build
# Use a Node.js image for the build stage
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:20-slim as production
ENV NODE_ENV=production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 5000
CMD ["serve", "-s", "dist", "-l", "5000"]
