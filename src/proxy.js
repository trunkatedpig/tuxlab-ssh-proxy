/* TuxLab - Reverse Proxy
   This server is a combination reverse SSH proxy and
   web socket to SSH bridge, allowing users to connect to
   their respective docker containers.
*/

/* Read Settings */
  var fs = require('fs');
  var settings = JSON.parse(fs.readFileSync("/root/settings.json"));

/* Start RedBird */
    // Register Port Forwarding
      var redbird = require('redbird')({port : settings.ssh_port});

    // Enable etcd registration
      require('redbird').etcd(redbird,settings.etcd_conf);

/* Create WebSSH Listener */

    // Create Wetty server
      var pty = require('pty.js');
      var wetty = require('http').createServer(handler).listen(settings.webssh_port, function() {
        console.log('listening for WebSSH Connections on '+settings.webssh_port);
      });
      var io = require('socket.io')(wetty,{path : '/ssh'});

    // HTTP Request Handler
      function handler (req,res){
        // Set Headers
          if (res.headers.host = "localhost"){
            res.setHeader("Access-Control-Allow-Origin", "null");
          }
          else{
            res.setHeader("Access-Control-Allow-Origin", "*");
          }
          res.setHeader("Access-Control-Allow-Credentials","true")

        // Write Results
          res.writeHead(200);
          res.end();
      }

    // WebSSH Request Handler
      io.set('origins', '*:80');
      io.on('connection', function(socket){
        var request = socket.request;

        // Validate SSH Request
        var request_domain = request.headers.domain;
        if (request_domain.indexOf(webssh_root, request_domain - webssh_root.length) !== -1){
            var username = request_domain.replace("."+request_domain,"");
            var ssh_hostname = username + "@" + request_domain;
        }
        else{
            socket.emit('exception', {errorMessage: 'Invalid Host'})
        }

        var term = pty.spawn('ssh', [ssh_hostname,"-p",settings.ssh_port],{
          name : 'xterm-256color',
          cols: 80,
          rows: 30
        });

        // Set Data Passthrough
        console.log((new Date()) + " PID=" + term.pid)
        term.on('data', function(data) {
            socket.emit('output', data);
        });
        term.on('exit', function(code) {
            console.log((new Date()) + " PID=" + term.pid + " ENDED")
        });
        socket.on('resize', function(data) {
            term.resize(data.col, data.row);
        });
        socket.on('input', function(data) {
            term.write(data);
        });
        socket.on('disconnect', function() {
            term.end();
        });
      })

// Verify Route
var pattern = '\.'.concat(settings.webssh_root);
