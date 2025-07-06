FROM node:22.17

# Set the working directory
WORKDIR /app
# Copy the rest of the application code
COPY . .
# Install dependencies
RUN npm install
# Build the application
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "run", "web.start"]

