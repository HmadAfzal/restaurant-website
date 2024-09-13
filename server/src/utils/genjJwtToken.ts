import jwt from "jsonwebtoken";
import { Response } from "express";

const genJwtToken = async (id:string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 24 * 60 * 60 * 100,
    });
  return token;
};

export default genJwtToken;