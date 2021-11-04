# Flame

[![JS Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://shields.io/)
[![TS Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://shields.io/)
[![Node Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://shields.io/)
[![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://shields.io/)

![Homescreen screenshot](./.github/_home.png)

## Description

Flame is self-hosted startpage for your server. It's design is inspired (heavily) by [SUI](https://github.com/jeroenpardon/sui). Flame is very easy to setup and use. With built-in editors, it allows you to setup your very own application hub in no time - no file editing necessary.

## Technology

- Backend
  - Node.js + Express
  - Sequelize ORM + SQLite
- Frontend
  - React
  - Redux
  - TypeScript
- Deployment
  - Docker
  - Kubernetes

## Development

```sh
# clone repository
git clone https://github.com/pawelmalak/flame
cd flame

# run only once
npm run dev-init

# start backend and frontend development servers
npm run dev
```

## Installation

### With Docker (recommended)

[Docker Hub](https://hub.docker.com/r/pawelmalak/flame)

#### Building images

```sh
# build image for amd64 only
docker build -t flame .

# build multiarch image for amd64, armv7 and arm64
# building failed multiple times with 2GB memory usage limit so you might want to increase it
docker buildx build \
  --platform linux/arm/v7,linux/arm64,linux/amd64 \
  -f Dockerfile.multiarch \
  -t flame:multiarch .
```

#### Deployment

```sh
# run container
docker run -p 5005:5005 -v /path/to/data:/app/data flame
```

#### Docker-Compose

```yaml
version: '2.1'
services:
  flame:
    image: pawelmalak/flame:latest
    container_name: flame
    volumes:
      - <host_dir>:/app/data
      - /var/run/docker.sock:/var/run/docker.sock # optional but required for Docker integration feature
    ports:
      - 5005:5005
    restart: unless-stopped
```

#### Skaffold

```sh
# use skaffold
skaffold dev
```

### Without Docker

Follow instructions from wiki: [Installation without Docker](https://github.com/pawelmalak/flame/wiki/Installation-without-docker)

## Functionality

- Applications
  - Create, update, delete and organize applications using GUI
  - Pin your favourite apps to homescreen

![Homescreen screenshot](./.github/_apps.png)

- Bookmarks
  - Create, update, delete and organize bookmarks and categories using GUI
  - Pin your favourite categories to homescreen

![Homescreen screenshot](./.github/_bookmarks.png)

- Weather

  - Get current temperature, cloud coverage and weather status with animated icons

- Themes
  - Customize your page by choosing from 12 color themes

![Homescreen screenshot](./.github/_themes.png)

## Usage

### Search bar

#### Searching

To use search bar you need to type your search query with selected prefix. For example, to search for "what is docker" using google search you would type: `/g what is docker`.

> You can change where to open search results (same/new tab) in the settings

#### Supported search engines

| Name       | Prefix | Search URL                          |
| ---------- | ------ | ----------------------------------- |
| Disroot    | /ds    | http://search.disroot.org/search?q= |
| DuckDuckGo | /d     | https://duckduckgo.com/?q=          |
| Google     | /g     | https://www.google.com/search?q=    |

#### Supported services

| Name               | Prefix | Search URL                                    |
| ------------------ | ------ | --------------------------------------------- |
| IMDb               | /im    | https://www.imdb.com/find?q=                  |
| Reddit             | /r     | https://www.reddit.com/search?q=              |
| Spotify            | /sp    | https://open.spotify.com/search/              |
| The Movie Database | /mv    | https://www.themoviedb.org/search?query=      |
| Youtube            | /yt    | https://www.youtube.com/results?search_query= |

### Setting up weather module

1. Obtain API Key from [Weather API](https://www.weatherapi.com/pricing.aspx).
   > Free plan allows for 1M calls per month. Flame is making less then 3K API calls per month.
2. Get lat/long for your location. You can get them from [latlong.net](https://www.latlong.net/convert-address-to-lat-long.html).
3. Enter and save data. Weather widget will now update and should be visible on Home page.

### Docker integration

In order to use the Docker integration, each container must have the following labels:

```yml
labels:
  - flame.type=application # "app" works too
  - flame.name=My container
  - flame.url=https://example.com
  - flame.icon=icon-name # Optional, default is "docker"
# - flame.icon=custom to make changes in app. ie: custom icon upload
```

And you must have activated the Docker sync option in the settings panel.

You can set up different apps in the same label adding `;` between each one.

```yml
labels:
  - flame.type=application
  - flame.name=First App;Second App
  - flame.url=https://example1.com;https://example2.com
  - flame.icon=icon-name1;icon-name2
```

If you want to use a remote docker host follow this instructions in the host:

- Open the file `/lib/systemd/system/docker.service`, search for `ExecStart` and edit the value

```text
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:${PORT} -H unix:///var/run/docker.sock
```

>The above command will bind the docker engine server to the Unix socket as well as TCP port of your choice. “0.0.0.0” means docker-engine accepts connections from all IP addresses.

- Restart the daemon and Docker service

```shell
sudo systemctl daemon-reload
sudo service docker restart
```

- Test if it is working

```shell
curl http://${IP}:${PORT}/version
```

### Kubernetes integration

In order to use the Kubernetes integration, each ingress must have the following annotations:

```yml
metadata:
  annotations:
  - flame.pawelmalak/type=application # "app" works too
  - flame.pawelmalak/name=My container
  - flame.pawelmalak/url=https://example.com
  - flame.pawelmalak/icon=icon-name # Optional, default is "kubernetes"
```

And you must have activated the Kubernetes sync option in the settings panel.

### Custom CSS

> This is an experimental feature. Its behaviour might change in the future.
>
> Follow instructions from wiki: [Custom CSS](https://github.com/pawelmalak/flame/wiki/Custom-CSS)