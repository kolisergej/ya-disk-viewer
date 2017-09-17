import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'request';

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');

const [staticUrl, devToolsHTML] = (process.env.NODE_ENV === 'production') ?
  ['', ''] : ['http://localhost:9000', '<div id="dev-tools"></div>'];
const PORT = process.env.PORT || 3001;

function renderHTML() {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <title>Test</title>
        <link href="${staticUrl}/styles/styles.css" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        ${devToolsHTML}
        <script src="${staticUrl}/js/app.js"></script>
      </body>
    </html>
  `;
}

function encode(obj) {
  return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}

app.get('/auth', (req, res) => {
  const params = {
    response_type: 'code',
    client_id: '89c64dca5b1b46338336cec1b5279419',
  };
  res.redirect(`https://oauth.yandex.ru/authorize?${encode(params)}`);
});
app.get('/verification_code', (req, res) => {
  const payload = {
    grant_type: 'authorization_code',
    code: req.query.code,
    client_id: '89c64dca5b1b46338336cec1b5279419',
    client_secret: '3b7ecafa76ba46378778fd1ed107df2d',
  };
  request.post({
    url: 'https://oauth.yandex.ru/token',
    formData: payload,
  }, (err, response) => {
    if (err || response.error) {
      console.log('Error: ', err.response || err);
      res.redirect('/');
      return;
    }
    const json = JSON.parse(response.body);
    const { token_type, access_token, expires_in, refresh_token } = json;
    const params = {
      'token-type': token_type,
      'access-token': access_token,
      expiry: expires_in,
      refresh_token,
    };
    res.cookie('authHeaders', params, { maxAge: expires_in });
    res.redirect(`${req.headers.referer}?${encode(params)}`);
  });
});
app.get('/validate', (req, res) => {
  // For make redux-oauth lib happy
  res.send({
    success: true,
    data: {},
  });
});
app.get('/', (req, res) => {
  res.end(renderHTML());
});

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
