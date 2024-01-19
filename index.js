const koa = require('koa');
const serve = require('koa-static');

const app = new koa();
// 使用http2
const http2 = require('http2');
const fs = require('fs');

app.use(async (ctx, next) => {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    }); // 1
    await next();
})

app.use(serve(__dirname + '/public'));

http2.createSecureServer({
    key: fs.readFileSync(`${__dirname}/localhost-privkey.pem`),
    cert: fs.readFileSync(`${__dirname}/localhost-cert.pem`),
}, app.callback()).listen(3000);