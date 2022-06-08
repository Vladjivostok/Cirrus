import { rest } from 'msw';

export const handlers = [
  rest.post('/api/v1/login', (req, res, ctx) => {
    const goodUser = {
      username: 'admin',
      password: 'admin'
    };

    const stringObj = JSON.stringify(goodUser);
    const stringBody = JSON.stringify(req.body);

    if (stringObj !== stringBody) {
      return res(ctx.status(400, 'Bad Request'));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            access_token: 'json_web_token'
          }
        })
      );
    }
  })
];
