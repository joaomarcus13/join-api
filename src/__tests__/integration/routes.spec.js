import axios from 'axios';
jest.setTimeout(30000);

describe('End Points', () => {
  describe('/itens', () => {
    test.skip('should return itens with status 200 and object key correctly', async () => {
      const query = {};
      const response = await axios({
        url: 'http://localhost:3333/itens',
        method: 'GET',
        params: query,
      });
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        expect.objectContaining({
          itens: expect.any(Array),
          count: expect.any(Number),
          qnt: expect.any(Number),
        })
      );
    });
    test('should return 400', async () => {
      const query = { cidadeFilter: 'altos' };
      let response;
      try {
        response = await axios({
          url: 'http://localhost:3333/itens',
          method: 'GET',
          params: query,
        });
      } catch (error) {
        console.log(error);
        response = error.response;
      }

      expect(response.status).toBe(400);
    });
  });
  describe('/orgaos', () => {
    test.todo('should return orgaos with status 200');
  });
});
