var http = require('http');
var url = require('url');

var proxyServer = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  // please code here ···

  if (parsedUrl.pathname === '/') {
    http.get('http://apis.juhe.cn/simpleWeather/query?' + parsedUrl.query, res => {
      var body = '';

      res.on('data', data => {
        body += data;
    });

      res.on('end', () => {
        response.end(body);
      });

    }).on('error', error => {
      console.log('代理失败:' + error.message)
    });
  } else {
    response.writeHead(400);
    response.end('请求正确的地址');
  }

});

proxyServer.listen(7777, () => {
  console.log('The proxyServer is running at http://localhost:7777');
});