FROM node:22.17 AS builder

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build


FROM node:22.17

USER 10014

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/web/ ./web/
COPY --from=builder /app/package*.json ./

# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "run", "web.start"]

