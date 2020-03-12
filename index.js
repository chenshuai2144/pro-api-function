/** @format */

// [START functions import]
const express = require('express');

const matchMock = require('./mock/matchMock');
const getAvatarList = require('./getAvatarList');

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

app.get('/doc/getAvatarList', async (req, res, next) => {
  const { filename, repo, owner } = req.query;
  if (filename && repo && owner) {
    const list = await getAvatarList({
      filename,
      repo,
      owner,
    });
    res.json(list);
  } else {
    res.json({
      error: "'Please pass a name on the query string or in the request body'",
    });
  }
});

app.listen(process.env.PORT || 80, () => {
  console.log('服务已启动');
});
