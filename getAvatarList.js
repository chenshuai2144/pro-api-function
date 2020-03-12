/** @format */
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getAvatarList = async ({ filename, owner, repo }) => {
  const sourcePath = `https://github.com/${owner}/${repo}/contributors-list/master/`;
  const url = `${sourcePath}${filename}`;
  const html = await fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.text();
      }
      return Promise.resolve(null);
    })
    .catch(e => console.log(e));
  if (!html) {
    return [];
  }
  const $ = cheerio.load(html || '');
  const data = [];
  $('li a').map((_, ele) => {
    data.push({
      username: $(ele)
        .text()
        .trim(),
      url: $(ele)
        .children('img')
        .attr('src'),
    });
    return false;
  });
  return data;
};

module.exports = getAvatarList;
