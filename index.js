express = require('express');
app = express();
app.set('view engine', 'ejs');

path = __dirname + '/templates/';
views = require('./views');

app.get('/', views.main);
app.get('/obj/:id/', views.arcObject);
app.get('/list/:id/', views.listObjects);

app.use(express.static('static'));
app.use(views.error404);
port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Listening on ' + port);
});
