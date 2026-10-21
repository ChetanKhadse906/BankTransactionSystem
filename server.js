import app from './src/app.js'
import ConnectDB from './src/config/db.js';

import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

const port=4000;

ConnectDB();

app.listen(port, ()=>{

    console.log("Server is running on port: ", port)
})
