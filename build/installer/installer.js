var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'CommandSender',
  description: 'The Viz Command Sender App.',
  script: 'C:\\Dev\\CommandSender_Files\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();