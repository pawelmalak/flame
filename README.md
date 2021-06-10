# Flame

[![JS Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://shields.io/)
[![TS Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://shields.io/)
[![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://shields.io/)

![Homescreen screenshot](./github/_home.png)

## Description
Flame is self-hosted startpage for your server. It's inspired (heavily) by [SUI](https://github.com/jeroenpardon/sui)

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
git clone https://github.com/pawelmalak/flame
cd flame

# run only once
npm run dev-init

# start backend and frontend development servers
npm run dev
```

## Deployment with Docker
```sh
# build image
docker build -t flame .

# run container
docker run -p 5005:5005 -v <host_dir>:/app/data flame
```

## Functionality
- Applications
  - Create, update and delete applications using GUI
  - Pin your favourite apps to homescreen

![Homescreen screenshot](./github/_apps.png)

- Bookmarks
  - Create, update and delete bookmarks and categories using GUI
  - Pin your favourite categories to homescreen

![Homescreen screenshot](./github/_bookmarks.png)

- Weather
  - Get current temperature, cloud coverage and weather status with animated icons
- Themes
  - Customize your page by choosing from 12 color themes 

![Homescreen screenshot](./github/_themes.png)