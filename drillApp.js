const express = require('express');
const morgan = require('morgan');
const drillApp = express();

drillApp.use(morgan('common'));

drillApp.get('/', (req, res) => {
    res.send('hello from drill!')
})


drillApp.get('/frequency', (req, res) => {
    const { s } = req.query;
    const reg = /[^a-zA-Z0-9]/g 
   
    if(!s) {
        return res.status(400).send('invalid request');
    };
    
    if(reg.test(s)){
        throw Error('please use only letters and numbers');
      }

    
      const counts = s.toLowerCase()
                      .split('')
                      .reduce((acc, curr) => {
                        if(acc[curr]) {
                            acc[curr] ++;
                        } else {
                            acc[curr] = 1;
                        }
                        return acc;
                        }, {});

    const unique = Object.keys(counts).length;
    const average = s.length / unique;
    let highest = '';
    let highestVal = 0;

    
    Object.keys(counts).sort().forEach(k => {
        if (counts[k] > highestVal) {
          highestVal = counts[k];
          highest = k;
        }
      });
      
      console.log(s.length)
      counts.unique = unique;
      counts.average = average;
      counts.highest = highest;
      res.json(counts);
})
module.exports = drillApp;