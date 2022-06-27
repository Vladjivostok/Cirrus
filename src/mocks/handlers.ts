import { rest } from 'msw';
import { LOGIN_URL, REFRESH_TOKEN_URL } from '../common/constants';

type RequestUser = {
  body: {
    username: string;
    password: string;
  };
};

const validUser = {
  username: 'admin',
  password: 'admin'
};

const dummyJWTToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9.rFcqI_6iHyIx450Esqa3yXqyZLhPhKt9eKeHcnjYujQ';

const dummyRefreshToken = 'xs123nR5cCI6IkpXVCJ9.eyJ1c2Vybm213dsax';

const newAccessToken = 'New AccessToken from the backend! ';

export const handlers = [
  rest.post(`${process.env.REACT_APP_BASE_API_URL}/${LOGIN_URL}`, (req: RequestUser, res, ctx) => {
    const check =
      validUser.password == req.body.password && validUser.username == req.body.username;

    if (!check) {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'err003'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: 123,
        accessToken: dummyJWTToken,
        refreshToken: dummyRefreshToken
      })
    );
  }),

  rest.get(`${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: newAccessToken,
        userId: 1
      })
    );
  })
];
