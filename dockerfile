# Use the official Node.js image as the base image
FROM node:14

# Set the working directory for the server
WORKDIR /app/server

# Copy server package.json and package-lock.json
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server code
COPY server/ .

# Build the server
RUN npm run build

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Expose the port the server runs on
EXPOSE 3000

# Define the command to run the server
CMD ["npm", "start", "--prefix", "server"]