const request = require('supertest');
const app = require('../src/app');

describe('Tasks API', () => {
  it('GET /api/health - should return OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('GET /api/tasks - should return empty array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks - should create a task', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Test Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });

  it('POST /api/tasks - should fail without title', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
  });
});
