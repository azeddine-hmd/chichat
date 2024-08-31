FROM node:20.11.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . ./
RUN npm install -g prisma

RUN chmod +x ./scripts/entrypoint.sh
CMD ["./scripts/entrypoint.sh"]
