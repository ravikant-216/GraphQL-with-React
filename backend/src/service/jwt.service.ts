import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
}

const jwt_secret = "jsonsecret";
const jwt_expires_in = "1d";

export const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: jwt_expires_in,
  });
  return token;
};

export const decodeJwtToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
