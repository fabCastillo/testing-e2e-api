const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/seed');

describe('tests for /profile path', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('POST /my-user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        // @ts-ignore
        email: user.email,
        password: 'admin123',
      };
      const { body } = await api.post('/api/v1/auth/login').send(inputData);
      accessToken = body.accessToken;
    });
    test('should return a 401', async () => {
      // Arrange
      // Act
      const { statusCode } = await api.get('/api/v1/profile/my-user').set({
        Authorization: 'Bearer 123123',
      });
      // Assert
      expect(statusCode).toBe(401);
    });
    test('should return a user with access token valid', async () => {
      // Arrange
      const user = await models.User.findByPk('1');
      // Act
      const { statusCode, body } = await api.get('/api/v1/profile/my-user').set({
        Authorization: `Bearer ${accessToken}`,
      });
      // Assert
      expect(statusCode).toEqual(200);
      // check DB
      // @ts-ignore
      expect(body.email).toEqual(user.email);
    });
    afterAll(() => {
      accessToken = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
