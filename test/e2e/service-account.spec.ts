import request from 'supertest';
import {an_authenticated_user, AuthenticatedUser} from '../libs/cognito';
import {dateRegex} from '../libs/date.regex';
import {prisma} from "../../src/libs/prisma";
import app from "../../src/app";

describe('/service-account', () => {
  describe('GET /', () => {
    let user: AuthenticatedUser;
    beforeAll(async () => {
      user = await an_authenticated_user();
      await prisma.serviceAccount.createMany({
        data: [
          {
            id: 'test1',
            userId: user.sub,
            name: 'test11',
            status: 'NORMAL',
            accountInfo: {
              username: 'test123',
              password: 'test234',
            },
            serviceName: 'ESM',
          },
          {
            id: 'test2',
            userId: user.sub,
            name: 'test22',
            status: 'NORMAL',
            accountInfo: {},
            serviceName: 'coupang',
          },
        ],
      });
    });
    it('로그인하지 않은 사용자는 401', async () => {
      await request(app).get('/service-account').expect(401);
    });
    it('로그인 한사용자는 목록 반환', async () => {
      const res = await request(app)
        .get('/service-account')
        .set('Authorization', `Bearer ${user.accessToken}`)
        .expect(200);
      expect(res.body.length).toBe(2);
      expect(res.body).toStrictEqual([
        {
          id: 'test1',
          userId: user.sub,
          name: 'test11',
          status: 'NORMAL',
          accountInfo: {
            username: 'test123',
            password: 'test234',
          },
          serviceName: 'ESM',
          createdAt: expect.stringMatching(dateRegex),
          updatedAt: expect.stringMatching(dateRegex),
        },
        {
          id: 'test2',
          userId: user.sub,
          name: 'test22',
          status: 'NORMAL',
          accountInfo: {},
          serviceName: 'coupang',
          createdAt: expect.stringMatching(dateRegex),
          updatedAt: expect.stringMatching(dateRegex),
        },
      ]);
    });
  });

  describe('POST /', () => {
    let user: AuthenticatedUser;
    beforeAll(async () => {
      user = await an_authenticated_user();
    });
    it('로그인하지 않은 사용자는 401', async () => {
      await request(app)
        .post('/service-account')
        .send({
          serviceName: 'ESM',
          name: '내 ESM',
          accountInfo: {
            username: 'test',
            password: 'testPassword',
          },
        })
        .expect(401);
    });
    it('서비스 계정 추가시 추가된 계정 반환', async () => {
      const res = await request(app)
        .post('/service-account')
        .send({
          serviceName: 'ESM',
          name: '내 ESM',
          accountInfo: {
            username: 'test',
            password: 'testPassword',
          },
        })
        .set('Authorization', `Bearer ${user.accessToken}`)
        .expect(200);
      expect(res.body).toStrictEqual({
        id: expect.any(String),
        userId: user.sub,
        serviceName: 'ESM',
        name: '내 ESM',
        accountInfo: {
          username: 'test',
          password: 'testPassword',
        },
        status: 'NORMAL',
        createdAt: expect.stringMatching(dateRegex),
        updatedAt: expect.stringMatching(dateRegex),
      });
    });
  });

  describe('PUT /', () => {
    let user: AuthenticatedUser;
    beforeAll(async () => {
      user = await an_authenticated_user();
      await prisma.serviceAccount.createMany({
        data: [
          {
            id: 'ID_SA_PUT',
            userId: user.sub,
            name: 'test11',
            status: 'NORMAL',
            accountInfo: {
              username: 'test123',
              password: 'test234',
            },
            serviceName: 'ESM',
          },
        ],
      });
    });
    it('로그인하지 않은 사용자는 401', async () => {
      await request(app)
        .put('/service-account')
        .send({
          id: 'ID_SA_PUT',
          serviceName: 'ESM',
          name: '내 ESM2',
        })
        .expect(401);
    });
    it('서비스 계정 추가시 추가된 계정 반환', async () => {
      const res = await request(app)
        .put('/service-account')
        .send({
          id: 'ID_SA_PUT',
          serviceName: 'ESM',
          name: '내 ESM2',
        })
        .set('Authorization', `Bearer ${user.accessToken}`)
        .expect(200);
      expect(res.body).toStrictEqual({
        id: 'ID_SA_PUT',
        userId: user.sub,
        serviceName: 'ESM',
        name: '내 ESM2',
        accountInfo: {
          username: 'test123',
          password: 'test234',
        },
        status: 'NORMAL',
        createdAt: expect.stringMatching(dateRegex),
        updatedAt: expect.stringMatching(dateRegex),
      });
    });
  });
});
