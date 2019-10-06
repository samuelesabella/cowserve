const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const httpsLocalhost = require("https-localhost")()

let HTTPS = false;
let MSG = 'Cowserve by samuelesabella';
const PORT = (process.env.port ? process.env.port : 8080); 
if (process.env.msg) {
  HTTPS = process.env.msg.includes('::https::');
  const aus = process.env.msg.replace(/::\w+::/g, '').trim();
  if (aus)
    MSG = aus;
} 

process.on('SIGINT', function() {
  process.exit();
});

// ----- SERVE ----- //
function cowserve (req, res) {
  const arg = (req.url=='/' ? MSG : req.url.substr(1));
  const safe_arg = arg.replace(/[^\w,\.\ ]+/g, '');
  exec(`cowsay ${safe_arg}`, (error, stdout, stderr) => { 
    res.write(stdout);
    res.end();
  });
}

async function servestart () {
  console.log(`Service started (https ${HTTPS ? 'on' : 'off'})`);
  if (HTTPS) {
    const certs = await httpsLocalhost.getCerts()
    console.log('Certificate generated, now serving...');
    https.createServer(certs, cowserve).listen(PORT)
  } 
  else {
    console.log('Serving...');
    http.createServer(cowserve).listen(PORT);
  }
}
servestart();

