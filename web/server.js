import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename);
console.log('__dirname:', __dirname);

const dirconfig = path.join(__dirname, 'config');

async function loadConfig(filename) {
    const filePath = path.join(dirconfig, filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading config:', error);
        throw error;
    }
}

async function configRouteFromcFile(app, configfile){
    // empty existing routes
    if (app._router && app._router.stack) {
        app._router.stack = app._router.stack.filter(
            (layer) => !(layer.route) // keep only middleware, remove routes
        );
    }
    const config  = await loadConfig(configfile);
    //console.log('Loaded example config:', JSON.stringify(config));
    config.mock.forEach((route) => {
        app[route.method.toLowerCase()](route.url, (req, res) => {
            // Set headers
            if (route.response.headers) {
                Object.entries(route.response.headers).forEach(([key, value]) => {
                    console.log(`Setting header: ${key} = ${value}`);
                    res.setHeader(key, value);
                });
            }
            console.log("Response headers:", res.getHeaders());
            res.status(route.response.status).json(route.response.body);
        });
    });
    return app;
}

function configCommonFunction(app){
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to the server!');
        }
    );
    app.get('/health', (req, res) => {
        res.status(200).send('Server is healthy!');
    });

    return app;
}

function middileware(app, middlewareFunction){
    app.use(middlewareFunction);
    return app;
}

// absolute path of folder
function staticConfig(app, folder){
    app.use(express.static(folder));

    return app;
}
    const app = express();

export async function setupApp(app){
    await configRouteFromcFile(app, 'example.json');
    configCommonFunction(app);

    staticConfig(app, path.join(__dirname, 'public'));
}
async function start(){
    await setupApp(app);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export {start, app};
