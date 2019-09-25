// const app = require('./app');
const drillApp = require('./drillApp');

// app.listen(8000, () => {
//     console.log('server started on port 8000');
// });

drillApp.listen(8100, () => {
    console.log('server started on port 8100');
});



const express = require('express');
const morgan = require('morgan');

const app = express();
const appList = require('./appsList');

app.use(morgan('dev'));



app.listen(8000, () => {
    console.log('server is listening on port 8000')
});

app.get('/apps', (req, res) => {
    const genresArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
     
    let { sort, genres } = req.query;
    let results;
    sort = sort.toLowerCase();
    
    if(sort) {
        if(!['app','rating'].includes(sort)) {
            return res.status(400).send('Sort must be one of app or rating');
        };
        if(sort === 'app') {
            console.log(sort, 'HERE 2')
            results = appList.sort((a,b) => {
                return a[sort] > b[sort]? 1 : a[sort] < b[sort]? -1 : 0;
            })
        }
        if(sort === 'rating') {
            console.log(sort, 'HERE 3')
            results = appList.sort((a,b) => a.Rating-b.Rating);
        }
    }
    
    if(genres) {
        let genre = genresArr.find(genre => {
            console.log(genre, genres)
            return genre.toLowerCase() === genres.toLowerCase();
        })
        console.log(genre);
        if(!genre) {
            return res.status(400).send('genre not valid')
        } 
        results = appList.filter(app => {
            return app.Genres === genre;
              
         });

    } else {
        results = appList;
    }
    
    res.json(results);
})