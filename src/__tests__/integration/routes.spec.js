import { app } from '../../server.js';
import superTest from 'supertest';

describe('End Points', () => {
  describe('/itens', () => {
    test('should return itens with status 200 and object key correctly', async () => {
      const response = await superTest(app).get('/itens').send({});
      const data = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(data).toEqual(
        expect.objectContaining({
          itens: expect.any(Array),
          count: expect.any(Number),
          qnt: expect.any(Number),
        })
      );
    });
  });
  describe('/orgaos', () => {
    test.todo('should return orgaos with status 200');
  });
});
