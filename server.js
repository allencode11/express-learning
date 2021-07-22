const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

const port = 3000;

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const searchService = new FeedbackService('./data/search.json');

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.views'))
app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['Gh', 'h1']
}));

app.use(express.static(path.join(__dirname, './static')))
app.use('/', routes({ feedbackService, searchService }));

app.listen(port, () => {
    console.log(`Express server listenning on port: ${port}`);
})