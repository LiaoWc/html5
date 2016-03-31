var os = require('os');

function getLocalIP() {
    var map = [];
    var ifaces = os.networkInterfaces();
    // console.log(ifaces);
    for (var dev in ifaces) {
        // console.log(ifaces[dev])
        var temp = ifaces[dev];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].family == 'IPv4') {
                var ip = temp[i].address
                if (ip != '127.0.0.1') {
                    return ip;
                }
            }
        }
    }
    return '127.0.0.1';
}

exports.ip = getLocalIP();