node-project-seed
===================
This is a project seed for nodejs based projects. Its uses express server, handlebar as the templating engine, mysql as the db, dotenv to load environment variables and gulp as the task automator. Requirejs optimizer and babel to convert ES6 to ES5 are also included.

###Prerequisites
 1. nodejs (Version 5.6.0 or higher)
 2. npm
 3. bower
 4. git

###Installation
1. Install gulp and bower
	`sudo npm install -g gulp bower`
	
2. Install project dependencies

	`npm install`

	`bower install`

###Running in development mode
Use the command `gulp dev`

###Running in production mode
Build your project using the command `gulp prod` or simply `gulp`
Run the server using `npm start`


####To access the local server, enter the following url in your browser
`http://localhost:3006`



##Directory Layout

	bin/www                 --> file to start server
	client/                 --> all of the client files
	  assets/               --> public asset files
	    css/                --> css files
	    img/                --> image files
	    font/               --> font files
	    js/                 --> js files
	  less/                 --> less files
	schema/                 --> db schema
	server/                 --> all of the server files
	  config/               --> server config
	  controllers/          --> application controllers
	  helpers/              --> helpers for views
	  middleware/           --> middleware for express
	  models/               --> data models
	  routes/               --> routes
	  views/                --> view files
	  app.js                --> application
	  logger.js             --> help to log
	bower.json              --> config file for bower
	.bowerrc                --> bower configuration
	config.js               --> default config file. 
	gulpfile.js             --> gulp file
	sample.env                    --> load environment variables from this file(Rename to .env)
	package.json            --> config file for npm
	
