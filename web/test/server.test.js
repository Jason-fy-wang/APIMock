import request from 'supertest';
import { app,setupApp } from '../server.js'; // Adjust the path as necessary


describe('API Mock Server', () => {
    beforeEach(async () => {
        setupApp(app, 'example.json');
    });

    it('should return a 200 response for GET /', async () => {        
        const response = await request(app).get('/');
        //console.log('Response Headers:', response.headers, response.status, response.text);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Welcome to the server!');
    });

    it ('should return 200 for health check', async () => {
        const response = await request(app).get('/health');
        //console.log('Health Check Response:', response.headers, response.status, response.text);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Server is healthy!');
    });

    it ('mock /api/v2/example should return 200', async () => {
        const response = await request(app).get('/api/v2/example');
        //console.log('Mock Response:', response.headers, response.status, response.body);
        expect(response.status).toBe(200);
        expect(response.headers['X-Test-header'.toLocaleLowerCase()]).toContain('test-valuev2');
        expect(response.body).toEqual({});
    });
});

