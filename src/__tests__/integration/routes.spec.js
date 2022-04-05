import { jest, expect, test, describe } from '@jest/globals';
import { app } from '../../server.js';
import superTest from 'supertest';

describe('Get itens', () => {
  test('should return itens', async () => {
    const query = {};
    const response = await superTest(app).get('/itens').query(query);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('itens');
  });
});
