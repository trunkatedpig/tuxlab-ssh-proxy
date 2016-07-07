/**
  SSH Tunnel Example using RedRouter
**/

// Imports
var fs = require('fs');

// Import RedRouter Core
var redrouter = require('redrouter').create;

// Import RedRouter Components
var backend_etcd = require('redrouter.backend.etcd');
var agent_ssh = require('redrouter.agent.ssh-proxy');
var agent_wetty = require('redrouter.agent.wetty');
var resolver_ssh = require('redrouter.resolver.ssh');
var middleware_docker = require('redrouter.middleware.docker');

/*
  Define a RedRouter Instance
*/
var proxy = new redrouter({
  ssl : {
    key : fs.readFileSync('/root/local/host.key'),
    cert : fs.readFileSync('/root/local/host.key.pub')
  },
  backend : {
    constructor: backend_etcd,
    options: {
      etcd_host: "172.17.0.1:2379",
      etcd_conn_opts: {}
    }
  },
  resolvers: [
    { constructor: resolver_ssh,
      options: {
        defaults: {
          allowed_auth: ['password']
        }
      }
    }
  ],
  middleware: [
    { constructor: middleware_docker,
      options: {
        docker_url: "tcp://172.17.0.1:2375"
      }
    }
  ],
  agents: [
    {
      constructor: agent_wetty,
      options: {
        host: 'localhost',
        port: 80
      }
    },
    { constructor: agent_ssh,
      options: {
        host: 'localhost',
        port: 22
      }
    }
  ]
});
