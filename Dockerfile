FROM node:20

WORKDIR /opt/app
COPY . .
RUN npm ci

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Build project
RUN npm run build

# Removes all devDependencies now that NODE_ENV is set to 'production'
run npm ci

EXPOSE 8000

CMD ["npm", "start"]
