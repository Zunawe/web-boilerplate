FROM node:18

WORKDIR /opt/app
COPY . .
RUN npm ci

ENV NODE_ENV=production
ENV PORT=8000

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
