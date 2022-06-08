import { rest } from 'msw';
import { User } from '../common/types';

export const handlers = [
  rest.post('/api/v1/login', (req, res, ctx) => {
    // sessionStorage.setItem('is-authenticated', 'true');

    const isAuth = sessionStorage.getItem('user');

    if (!isAuth) {
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
