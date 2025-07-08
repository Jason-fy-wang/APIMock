import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import {logger}  from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logger.info('__filename:', __filename);
logger.info('__dirname:', __dirname);

const dirconfig = path.join(__dirname, 'config');

async function loadConfig(filename) {
    const filePath = path.join(dirconfig, filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        logger.error('Error loading config:', error);
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
    config.mock.forEach((route) => {
        app[route.method.toLowerCase()](route.url, (req, res) => {
            // Set headers
            if (route.response.headers) {
                Object.entries(route.response.headers).forEach(([key, value]) => {
                    logger.info(`Setting header: ${key} = ${value}`);
                    res.setHeader(key, value);
                });
            }
            logger.info("Response headers:", res.getHeaders());
            res.status(route.response.status).json(route.response.body);
        });
    });
    return app;
}

function fetchHttpFields() {
    let fields = []
    try {
        const filepath = path.join(dirconfig, "field-names.csv")
        const csv = fs.readFileSync(filepath, {encoding: 'utf-8', flag: 'r'})
        const lines = csv.split(/\r?\n/).filter(line => line.length > 0).slice(1)
        fields = lines.reduce((acc, line)=> {
            acc.push({"value": line.split(",")[0]})
            return acc;
        }, [])
    }catch(err) {
        logger.error("fetchHttpFields error: ", err)
    }
    return fields
}


function fetchApplicationValues() {
    let fields = []
    try {
        const filepath = path.join(dirconfig, "application.csv")
        const csv = fs.readFileSync(filepath, {encoding: 'utf-8', flag: 'r'})
        const lines = csv.split(/\r?\n/).filter(line => line.length > 0).splice(1)
        fields = lines.reduce((arr, line) => {
            arr.push({"value": line.split(",")[1]})
            return arr;
        },[])
    }catch(error) {
        logger.error("fetchApplicationValues errors: ", error)
    }
    return fields
}

function configCommonFunction(app){
    app.get('/', (req, res) => {
        res.redirect("/index.html")
        }
    );
    app.get('/health', (req, res) => {
        res.status(200).send('Server is healthy!');
    });

    app.get('/api/v1/keys', async (req, res) => {
        const keys = fetchHttpFields()
        res.status(200).json(keys)
    })

    app.get('/api/v1/values', async (req, res)=>{
        const values= fetchApplicationValues()
        res.status(200).json(values)
    })
    // accept config
    app.post('/api/v1/config', async (req, res) => {
        const data = req.body;
        logger.info('Received config data:', data);
        if (typeof data !== 'object' || data === null) {
            return res.status(400).json({ error: 'Invalid config format' });
        }
        try {
            const exConfig = await loadConfig('mock.json')
            exConfig.mock.push(data);

            logger.info('Updated config:', exConfig);
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
    app.listen(PORT,'0.0.0.0', () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
}

export {start, app};
