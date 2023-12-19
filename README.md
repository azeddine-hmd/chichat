![uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fchichat.azeddine.xyz%2Fstatus)
# Chichat 
<img style="width: 100%;" src="https://raw.githubusercontent.com/azeddine-hmd/chichat/main/frontend/public/svg/chichat-logo.svg" width="100" height="100">

> A chat website for hang out and talks with friends.

## Run Server

```bash
docker compose up --build
```

## Technologies
*backend:*
  * Typescript
  * Expressjs 5-beta (async/await handlers)
  * prisma (orm/migrations)
  * postgresql (database)
  * Socket.io (websocket)
  * Swagger (api documentation)

*frontend:*
  * Typescript
  * Nextjs 13 (Server/Client component)
  * Tailwindcss (styling)
  * Framer-Motion (animation)
  * Axios (http client)
  * React-Query (network fetching)
  * zustand (state management)

## Example :
  Check hosted webserver on: [Chichat | talk and hang out with friends](https://chichat.azeddine.xyz)
  
## Openapi Specificication Using Swagger
In order to navigate RESTFUL Apis that backend provides quickly. a Swagger-Ui-Express handler running on endpoint '$BACKEND_DOMAIN/docs'.
also, you can obtain openapi document as json by visting '$BACKEND_DOMAIN/docs.json'
