const sequelize = require('./config/connection');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const helpers = require('./utils/helpers');
// const sequelize = require('sequelize');
const routes = require('./controllers');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const hbs = exphbs.create({ helpers });


const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: { maxAge: 7200000 },
    resave: false, 
    saveUninitialized: true,
    store: new sequelizeStore({ db: sequelize })
};


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session(sess));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
