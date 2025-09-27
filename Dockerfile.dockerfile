# Stage 1: Build the React Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY social-media-platform/frontend/package.json .
COPY social-media-platform/frontend/package-lock.json .
RUN npm install

# Copy all frontend files
COPY social-media-platform/frontend/src src/
COPY social-media-platform/frontend/public public/
COPY social-media-platform/frontend/custom-build.js .
COPY social-media-platform/frontend/demo-index.html .

# Modify package.json to use standard build instead of custom-build.js
RUN sed -i 's/"build": "node custom-build.js"/"build": "react-scripts build"/g' package.json

# Build the frontend
RUN npm run build

# Stage 2: Setup the Express Backend and serve the production build
FROM node:22-alpine

# Set the working directory for the backend
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY social-media-platform/backend/package.json .
COPY social-media-platform/backend/package-lock.json .
RUN npm install

# Copy backend source code
COPY social-media-platform/backend/routes routes/
COPY social-media-platform/backend/models models/
COPY social-media-platform/backend/server.js server.js

# Copy the built React app from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/build /app/backend/public

# Expose the port the Express server is running on
EXPOSE 5000

# Command to run the Express server
CMD ["node", "server.js"]