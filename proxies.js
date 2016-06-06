var proxy = require('redbird')({port: 22});

proxy.register("jeff.tuxlab.com", "http://10.1.100.10:32768");
