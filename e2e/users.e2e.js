const request = require('supertest');
const createApp = require('../src/app');

describe('tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe('GET /users', () => {
    // tests for /users
  });

  describe('POST /users', () => {
    test('should return a 400 BadRequest with password invalid', async () => {
      // Arrange
      const inputData = {
        email: 'andres@gmail.com',
        password: '----',
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test('should return a 400 BadRequest with email invalid', async () => {
      // Arrange
      const inputData = {
        email: '---',
        password: 'aksljdsd123456',
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });
  });

  describe('PUT /users', () => {
    // tests for /users
  });

  describe('DELETE /users', () => {
    // tests for /users
  });

  afterEach(() => {
    server.close();
  });
});
