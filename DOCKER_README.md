# How to create and run a Docker image

## Create image

```sh
docker build -t pomodoro-timer-image:latest .
```

## Save image

```sh
docker save -o pomodoro-timer-image.tar pomodoro-timer-image:latest
```

## Load image

```sh
docker load -i pomodoro-timer-image.tar
```

## Run container

```sh
docker run -p 4200:80 --name pomodoro-timer pomodoro-timer-image:latest

```

## Run container with Docker Compose

### Run standard

```sh
docker-compose up
```

### Run with daemon

```sh
docker-compose up -d
```

### Build and run

```sh
docker-compose up --build
```
