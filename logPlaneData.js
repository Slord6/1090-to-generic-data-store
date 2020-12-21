// uses generic-data-store running locally and dump1090 running on zerohero to log plane data

const http = require('http');
const { setInterval } = require('timers');

const getBody = (res, cb) => {
    let body = '';
    res.on('data', chunk => {
        body += chunk.toString();
    });
    res.on('end', () => cb(body));
}

const getData = () => {
    http.get(new URL("http://zerohero.broadband:8080/dump1090/data.json"), (res) => {
        getBody(res, (body) => {
            const dataArr = JSON.parse(body);
            console.log(`${dataArr.length} current`);
            dataArr.forEach(planeInfo => {
                console.log('Sending ' + planeInfo.hex);
                planeInfo.timestamp = Date.now();
                try {
                    http.request("http://localhost/planeData?key=6782109gguh89awyda9k9a", {
                        method: "POST"
                    }, (res) => {
                        getBody(res, (resBody) => {
                            console.log(`RES: ${res.statusCode} - ${resBody}`);
                        })
                    }).end(JSON.stringify(planeInfo));
                } catch (error) {
                    console.error(`Failed to send to server: ${error}`)
                }
            });
        });
    });
}

getData();
setInterval(getData, 10000);