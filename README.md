# blog-sample-redis-mongoose
A basic Blog application with React, Redux, Express, Node, and MongoDB with Redis as a caching layer

## Install node_modules in the root directory & within the ./client folder
`npm install`

## Add the following to the package.json file at the root of the project:
`"scripts": {
        "start": "node index.js",
        "server": "nodemon index.js --ignore tests",
        "client": "npm run start --prefix client",
        "dev": "concurrently \"npm run server\" \"npm run client\"",
        "build": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client",
        "heroku-postbuild": "npm run build"
    }`

## Launch the dev build after you include your own MongoDB URI, and reference an instance of REDIS running on your local machine with:
`npm run dev`

