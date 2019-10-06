const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const httpsLocalhost = require("https-localhost")()

let https_enabled = true;
let dmsg = 'Cowserve by samuelesabella';
const PORT = (process.env.port ? process.env.port : 8080); 
const EMSG = process.env.msg; 

if (EMSG) {
  https_enabled = !EMSG.includes('::http::');
  const aus = EMSG.replace(/::\w+::/g, '').trim();
  if (aus)
    dmsg = aus;
} 

process.on('SIGINT', function() {
  process.exit();
});

// ----- SERVE ----- //
function cowserve (req, res) {
  const arg = (req.url=='/' ? dmsg : req.url.substr(1));
  const safe_arg = arg.replace(/[^\w,\.\ ]+/g, '');
  exec(`cowsay ${safe_arg}`, (error, stdout, stderr) => { 
    res.write(stdout);
    res.end();
  });
}

async function servestart () {
  console.log(`Service started (https ${https_enabled ? 'on' : 'off'})`);
  if (https_enabled) {
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

