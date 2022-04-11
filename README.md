IMPORTANT NOTE -
This project does not have a mongoDB connection setup. Setup the connection based on the environments below.

local development: create a config file (make sure to name it .env), which exports:  
DB_CONNECT ->  add your MongoDB URI, local or Atlas
SECRET_KEY -> create a secret key for yout jwt
JWT_COOKIE_EXPIRES_IN -> limit for jwt cookie
JWT_EXPIRES_IN= limit for jwt
API_KEY= add the api key that you will have from TMBD API
URL_ORIGIN=http://localhost:3000
PORT=5000


This file will be ignored by git so your db credentials will be kept safe when the app is deployed.
production: Since the config file is not pushed when you deploy your app, you must specifiy your db uri in heorku. Set the uri in heroku as specified in this resource. Make sure you name the environement variable "DB_CONNECT".


## Getting Started

First run `npm install` from the root to instal all the dependencies for server app.
Then, run `npm run client` from the root to instal all the dependencies for client app.


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `styles` - This folder holds all the CSS of the client app.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client


- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `util` - This holds all validation process
- #### `app.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
