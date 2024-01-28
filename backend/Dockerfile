FROM node:18

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then \
	npm ci --omit=dev; \
else \
	npm ci; \
fi

COPY . ./
RUN npm install -g prisma

RUN chmod +x ./scripts/entrypoint.sh
CMD ["./scripts/entrypoint.sh"]
