type Response = {
  statusCode: number;
  timestamp: string;
  httpStatus: string;
  message: string;
  error?: string;
  data: {
    user: {
      username: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
  };
};

type User = {
  username: string;
  password: string;
};

export type { User, Response };
