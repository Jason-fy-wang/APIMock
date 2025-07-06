import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';

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

async function configRouteFromcFile(app, config){
    // empty existing routes
    if (app._router && app._router.stack) {
        app._router.stack = app._router.stack.filter(
            (layer) => !(layer.route) // keep only middleware, remove routes
        );
    }
    //const config  = await loadConfig(configfile);
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

    // accept config
    app.post('/api/v1/config', async (req, res) => {
        const data = req.body;
        console.log('Received config data:', data);
        if (typeof data !== 'object' || data === null) {
            return res.status(400).json({ error: 'Invalid config format' });
        }
        try {
            const exConfig = await loadConfig('mock.json')
            exConfig.mock.push(data);

            console.log('Updated config:', exConfig);
            await configRouteFromcFile(app, exConfig);
            res.status(200).json({ message: 'Config updated successfully' });
        } catch (error) {
            console.error('Error updating config:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
    return app;
}

function middileware(app){
    // config cross region
    app.use(cors(
        {
            origin: '*', // Allow all origins
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
            allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
            credentials: true // Allow credentials
        }
    ));
    // json middleware for body parsing
    app.use(express.json());
    // urlencoded middleware for form data parsing  
    app.use(express.urlencoded({ extended: true }));
    return app;
}

// absolute path of folder
function staticConfig(app, folder){
    app.use(express.static(folder));

    return app;
}

const app = express();

export async function setupApp(app, configfile = 'mock.json') {
    middileware(app);
    const config  = await loadConfig(configfile);
    configCommonFunction(app);
    await configRouteFromcFile(app, config);
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
