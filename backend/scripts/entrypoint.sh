#!/bin/bash

npx prisma studio &
npx prisma db push

if [ "$NODE_ENV" == "production" ]; then
	npm run build
	npm run start
else
	npx prisma generate --watch &
	npm run dev
fi
