# Flame

[![JS Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://shields.io/)
[![TS Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://shields.io/)
[![Node Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://shields.io/)
[![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://shields.io/)

![Homescreen screenshot](./github/_home.png)

## Description
Flame is self-hosted startpage for your server. Its design is inspired (heavily) by [SUI](https://github.com/jeroenpardon/sui). Flame is very easy to setup and use. With built-in editors it allows you to setup your very own appliaction hub in no time - no file editing necessary.

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

### Without Docker
Follow instructions from wiki: [Installation without Docker](https://github.com/pawelmalak/flame/wiki/Installation-without-docker)

## Functionality
- Applications
  - Create, update, delete and organize applications using GUI
  - Pin your favourite apps to homescreen

![Homescreen screenshot](./github/_apps.png)

- Bookmarks
  - Create, update, delete and organize bookmarks and categories using GUI
  - Pin your favourite categories to homescreen

![Homescreen screenshot](./github/_bookmarks.png)

- Weather
  - Get current temperature, cloud coverage and weather status with animated icons

- Themes
  - Customize your page by choosing from 12 color themes 

![Homescreen screenshot](./github/_themes.png)

## Usage
### Setting up weather module
1. Obtain API Key from [Weather API](https://www.weatherapi.com/pricing.aspx).
   > Free plan allows for 1M calls per month. Flame is making less then 3K API calls per month.
2. Get lat/long for your location. You can get them from [latlong.net](https://www.latlong.net/convert-address-to-lat-long.html).
3. Enter and save data. Weather widget will now update and should be visible on Home page.

### Supported URL formats for applications and bookmarks
#### Rules
- URL starts with `http://`
  - Format: `http://www.domain.com`, `http://domain.com`
  - Redirect: `{dest}`
- URL starts with `https://`
  - Format: `https://www.domain.com`, `https://domain.com`
  - Redirect: `https://{dest}`
- URL without protocol
  - Format: `www.domain.com`, `domain.com`, `sub.domain.com`, `local`, `ip`, `ip:port`
  - Redirect: `http://{dest}`

### Custom CSS
> This is an experimental feature. Its behaviour might change in the future.
> 
Follow instructions from wiki: [Custom CSS](https://github.com/pawelmalak/flame/wiki/Custom-CSS)

## Support
If you want to support development of Flame and my upcoming self-hosted and open source projects you can use the following link:

[![PayPal Badge](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/pawelmalak)