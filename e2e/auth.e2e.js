const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');

describe('tests for /auth path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe('POST /login', () => {
    test('should return a 401', async () => {
      // Arrange
      const inputData = {
        email: 'emailfake@gmail.com',
        password: 'klajsdkl123',
      };
      // Act
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(401);
    });
    test('should return a 200', async () => {
      const user = await models.User.findByPk(1);
      // Arrange
      const inputData = {
        // @ts-ignore
        email: user.email,
        password: 'admin123',
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(200);
      expect(body.accessToken).toBeTruthy();
      // @ts-ignore
      expect(body.user.email).toEqual(user.email);
      expect(body.user.password).toBeUndefined();
    });
  });

  afterAll(() => {
    server.close();
  });
});