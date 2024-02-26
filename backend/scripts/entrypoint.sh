#!/bin/bash

npx prisma studio &
npx prisma db push
npx prisma generate
mkdir uploads/ 2> /dev/null

if [ "$NODE_ENV" == "production" ]; then
	npx prisma migrate deploy
	npm run build
	npm run start
else
	prisma generate --watch &
	prisma migrate dev
	npx prisma db seed
	npm run dev
fi
