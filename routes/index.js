const express = require('express');
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
   router.get('/', (request, response) => {

       if (!request.session.visitcount) {
           request.session.visitcount = 0;
       }
       request.session.visitcount += 1;
       console.log(`Number of visits: ${request.session.visitcount}`);

       response.render('pages/index.html', {pageTitle: 'Welcome'});
    });

   router.use('/speakers', speakerRoute(params));
   router.use('/feedback', feedbackRoute(params));

   return router;
}