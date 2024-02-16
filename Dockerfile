# # Use official Node.js image as the base image
# FROM node:20-alpine

# # Set working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY ./ ./

# # Start the Vue development serve

# RUN npm run build



# EXPOSE 5173


# CMD [ "npm", "run", "dev" ]



# # Use official Node.js image as the base image
# FROM node:20-alpine as builder

# # Set working directory in the container
# WORKDIR /build

# # Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the code and generate the dist folder
# RUN npm run build


# FROM node:20-alpine as runner

# WORKDIR /app

# COPY --from=builder build/package*.json .
# COPY --from=builder build/node_modules node_modules/
# COPY --from=builder build/dist dist


# # Expose the port your app runs on
# EXPOSE 5173

# # Command to run your app
# CMD [ "npm", "run", "dev" ]


FROM node:20-alpine

# Work directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build using Vite (adjust command if needed)
RUN npm run build

# Base image for production
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]




