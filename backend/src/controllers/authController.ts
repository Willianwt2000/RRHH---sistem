import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sha512 } from "js-sha512";
import { listOfAccount, listOfTokens } from "../data/data";

const SECRET_KEY = "SECRET_KEY";

type UserData = {
  id: number;
  username: string;
  password: string;
};

type Token = {
  userId: number;
  token: string;
};

const saveToken = (token: Token) => {
  listOfTokens.push({
    tokenId: listOfTokens.length + 1,
    userId: token.userId,
    token: token.token,
    creationDate: Date.now().toString(),
    expiresIn: "1d",
    active: true,
  });
};

const genToken = (userdata: UserData): Token => {
  const tokenJWT: string = jwt.sign(
    {
      userid: userdata.id,
      username: userdata.username,
      password: userdata.password,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  const token: Token = {
    userId: userdata.id,
    token: tokenJWT,
  };

  return token;
};

export const login = (req: Request, res: Response) => {
  try {
    const username: string = String(req.body.username);
    const password: string = String(req.body.password);

    if (!username) {
      res.status(400).json({
        success: false,
        message: "Username is required.",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password is required.",
      });
      return;
    }

    const user = listOfAccount.find((user) => user.username === username);
    if (!user) {
      res.status(404).json({
        success: false,
        message: `User: ${username} not found!`,
      });
      return;
    }

    if (!user.active) {
      res.status(404).json({
        success: false,
        message: `Please, contact with the IT manager.`,
      });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({
        success: false,
        message: "Credentials incorrect.",
      });
      return;
    }

    const hashedPassword = sha512(password);
    const token = genToken({
      id: user.id,
      username: username,
      password: hashedPassword,
    });

    saveToken(token);

    res.status(200).json({
      success: true,
      message: "Access Granted!",
      token: token.token,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};