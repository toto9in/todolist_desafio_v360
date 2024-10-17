import jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signJwt = async (payload: any, expiresIn = "1d") => {
  const token = await jwt.sign(payload, process.env.APP_JWT_SECRET, {
    algorithm: "HS512",
    expiresIn,
  });
  return token;
};

export const verifyJwt = (token: string) => {
  const data = jwt.verify(token, process.env.APP_JWT_SECRET, {
    algorithms: ["HS512"],
  });
  return data;
};
