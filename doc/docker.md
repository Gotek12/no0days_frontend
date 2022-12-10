# Build docker

#### Build docker with latest tag
`docker build --tag=no0days/frontend:latest . --no-cache`   
#### Push to dockerhub (not working now)
`docker push no0days/frontend:latest`   

# Run docker app (local port:docker port)
`docker run -p 80:80 no0days/frontend:latest`  

# Run docker app with docker_compose
`docker compose up`
#### App working on port 8080
