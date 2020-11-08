
import app from './app';
import * as https from 'http';
import { environment } from './environment';
const PORT = environment.port;

const httpsOptions = {}

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
