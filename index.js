/** @format */

// [START functions import]
const express = require('express');
const fetch = require('node-fetch');
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

const tagList = ['success', 'processing', 'error', 'default', 'warning'];
const getTag = () => {
  return tagList[(Math.random() * 5).toFixed()];
};

app.get('/github/issues', async (req, res, next) => {
  const params = req.query;
  const data = await fetch('https://api.github.com/repos/ant-design/ant-design-pro/issues', {
    params: {
      ...params,
      access_token: 'c17b1cb63754f4e97a926950a3eb9a7d10660199',
      page: params.current,
      per_page: params.pageSize,
    },
  }).then((msg) => msg.json());
  const totalObj = await fetch(
    'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1&access_token=c17b1cb63754f4e97a926950a3eb9a7d10660199',
    {
      params,
    }
  ).then((msg) => msg.json());
  res.json({
    data: data.map((item) => ({
      ...item,
      labels: item.labels.map((tag) => ({ ...tag, color: getTag() })),
      state: item.labels.find((tag) => tag.name.includes('Progress')) ? 'processing' : item.state,
    })),
    page: params.current,
    success: true,
    total: (totalObj[0] || { number: 0 }).number - 56,
  });
});

app.listen(process.env.PORT || 80, () => {
  console.log('服务已启动');
});
