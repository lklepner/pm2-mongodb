var shelljs = require('shelljs');
var pmx = require('pmx');
var probe = pmx.probe();

setInterval(function(){
  var top_cpu_process = shelljs.exec('mongostat -n 1', { async : true, silent:true}, function(err, out) {
    if (err) {
      return console.error('Fail: could not retrieve mongostat metrics', err);
    }
    var lines = out.split("\n");
    var str_info = lines[1].replace( /[\s\n\r]+/g,' ');
    var data = str_info.split(' ');
    insert.set(data[1]);
    query.set(data[2]);
    update.set(data[3]);
    deleted.set(data[4]);
    command.set(data[6]);
    mapped.set(data[8]);
    vsize.set(data[9]);
    netIn.set(data[14]);
    netOut.set(data[15]);
    conn.set(data[16]);
  });
}, 5000);

var insert = probe.metric({
  name: 'Insert',
  value: 'N/A'
});

var query = probe.metric({
  name: 'Query',
  value: 'N/A'
});

var update = probe.metric({
  name: 'Update',
  value: 'N/A'
});

var deleted = probe.metric({
  name: 'Delete',
  value: 'N/A'
});

var netIn = probe.metric({
  name: 'netIn',
  value: 'N/A'
});
var netOut = probe.metric({
  name: 'netOut',
  value: 'N/A'
});

var conn = probe.metric({
  name: 'Connections',
  value: 'N/A'
});

var mapped = probe.metric({
  name: 'Mapped',
  value: 'N/A'
});

var vsize = probe.metric({
  name: 'Vsize',
  value: 'N/A'
});

var command = probe.metric({
  name: 'Command',
  value: 'N/A'
});