#!/bin/bash

npx prisma studio &
npx prisma db push
mkdir uploads/

if [ "$NODE_ENV" == "production" ]; then
	npx prisma migrate deploy
	npm run build
	npm run start
else
	npx prisma generate --watch &
	npx prisma migrate dev
	npm run dev
fi
