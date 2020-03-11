/** @format */

// [START functions import]
const express = require('express');

const matchMock = require('./mock/matchMock');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(matchMock);

app.listen(process.env.PORT || 80, () => {
  console.log('服务已启动');
});
