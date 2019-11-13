/*
 *
 * (C) 2019-20 - Samuele Sabella
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const httpsLocalhost = require("https-localhost")()

let https_enabled = true;
let dmsg = 'Cowserved!';
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

