import { rest } from 'msw';
import {
  GET_ORGANIZATION_FILES_URL,
  GET_ORGANIZATIONS_URL,
  GET_USER_URL,
  INVITE_USER_URL,
  LOGIN_URL,
  PASSWORD_CHANGE_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL,
  UPLOAD_FILE_URL
} from '../common/constants';

type RequestUser = {
  body: {
    username: string;
    password: string;
  };
};
type RequestRegister = {
  body: {
    email: string;
    username: string;
    password: string;
    token: string;
  };
};

type RequestPasswordChange = {
  body: {
    username: string;
    password: string;
    confirmPassword: string;
    token: string;
  };
};

const validUser = {
  username: 'admin',
  password: 'admin'
};

const validRegistration = {
  email: 'admin@domen.com',
  username: 'admin',
  password: 'Admin1234$',
  token: 'token'
};

const existingUser = {
  email: 'eadmin@domen.com',
  username: 'admin',
  password: 'Admin1234$',
  token: 'token'
};

const validEmail = {
  email: 'admin@domen.com'
};

const dummyJWTToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9.rFcqI_6iHyIx450Esqa3yXqyZLhPhKt9eKeHcnjYujQ';

const dummyRefreshToken = 'xs123nR5cCI6IkpXVCJ9.eyJ1c2Vybm213dsax';

const newAccessToken = 'New AccessToken from the backend! ';

export const handlers = [
  rest.get(`${process.env.REACT_APP_BASE_USER_API_URL}${GET_USER_URL}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: 'Admin',
        email: 'admin@domen.com',
        roles: [{ name: 'ROLE_ADMIN' }]
      })
    );
  }),

  rest.post(
    `${process.env.REACT_APP_BASE_USER_API_URL}${LOGIN_URL}`,
    (req: RequestUser, res, ctx) => {
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
    }
  ),

  rest.get(`${process.env.REACT_APP_BASE_USER_API_URL}/${REFRESH_TOKEN_URL}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: newAccessToken,
        userId: 1
      })
    );
  }),
  rest.post(
    `${process.env.REACT_APP_BASE_USER_API_URL}${REGISTER_URL}`,
    (req: RequestRegister, res, ctx) => {
      const checkIfValid =
        validRegistration.email == req.body.email &&
        validRegistration.username == req.body.username &&
        validRegistration.password == req.body.password;

      const checkIfExists =
        existingUser.email == req.body.email &&
        existingUser.username == req.body.username &&
        existingUser.password == req.body.password &&
        existingUser.token == req.body.token;

      if (checkIfExists) {
        return res(
          ctx.status(409),
          ctx.json({
            message: 'err008'
          })
        );
      }
      if (!(validRegistration.token == req.body.token)) {
        return res(
          ctx.status(404),
          ctx.json({
            message: 'err006'
          })
        );
      }
      if (!checkIfValid) {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'err017'
          })
        );
      }
      return res(
        ctx.status(201),
        ctx.json({
          id: 123,
          username: 'admin',
          email: 'admin@domen.com'
        })
      );
    }
  ),

  rest.post(`${process.env.REACT_APP_BASE_USER_API_URL}/${INVITE_USER_URL}`, (req, res, ctx) => {
    if (typeof req === 'string') {
      const reqObject = JSON.parse(req);

      if (!reqObject.email || !reqObject.role) {
        return res(
          ctx.status(401),
          ctx.json({
            message: 'err004'
          })
        );
      }
    }

    return res(
      ctx.status(401),
      ctx.json({
        message: 'err004'
      })
    );
  }),
  rest.post(
    `${process.env.REACT_APP_BASE_USER_API_URL}/forgot-password`,
    (req: RequestRegister, res, ctx) => {
      const check = validEmail.email == req.body.email;

      if (!check) {
        return res(
          ctx.status(404),
          ctx.json({
            message: 'err003'
          })
        );
      }
      return res(
        ctx.status(200),
        ctx.json({
          userEmail: 'admin@domen.com'
        })
      );
    }
  ),

  rest.post(
    `${process.env.REACT_APP_BASE_USER_API_URL}${PASSWORD_CHANGE_URL}`,
    (req: RequestPasswordChange, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.post(
    `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${UPLOAD_FILE_URL}`,
    (req, res, ctx) => {
      const check =
        '1' == req.url.searchParams.get('UserId') &&
        '1' == req.url.searchParams.get('organizationId') &&
        'Knjaz Milos DOO' == req.url.searchParams.get('organizationName');

      if (check) {
        return res(ctx.status(200));
      }
      return res(
        ctx.status(403),
        ctx.json({
          message: 'err104'
        })
      );
    }
  ),

  rest.get(
    `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${GET_ORGANIZATIONS_URL}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          userOrganizations: [
            {
              organization: {
                id: 1,
                name: 'Knjaz Milos DOO'
              },
              permission: 'OWNERS'
            },
            {
              organization: {
                id: 7,
                name: 'New folder'
              },
              permission: 'OWNERS'
            }
          ]
        })
      );
    }
  ),

  rest.get(
    `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${GET_ORGANIZATION_FILES_URL}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          content: [
            {
              id: 1,
              name: 'desktop1.jpg',
              fileSize: 237000,
              createdAt: [2022, 7, 13, 12, 17, 23, 436823000],
              appUserId: 1,
              fileType: 'STANDARD'
            },
            {
              id: 2,
              name: 'desktop2.py',
              fileSize: 237000,
              createdAt: [2022, 7, 13, 12, 17, 23, 436823000],
              appUserId: 1,
              fileType: 'CODE'
            }
          ],
          pageable: {
            sort: {
              empty: true,
              sorted: false,
              unsorted: true
            },
            offset: 0,
            pageSize: 1,
            pageNumber: 0,
            paged: true,
            unpaged: false
          },
          last: false,
          totalElements: 10,
          totalPages: 10,
          size: 1,
          number: 0,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          first: true,
          numberOfElements: 1,
          empty: false
        })
      );
    }
  )
];
