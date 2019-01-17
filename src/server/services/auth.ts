import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { BASE_URL, JWT_SECRET } from "../../settings";
import User from "../db/models/User";
import sendMail from "../utils/email";

export async function login(req: Request, res: Response) {
  const { email, id } = req.user;
  res.json({
    email,
    id,
  });
}

export async function logout(req: Request, res: Response) {
  req.logout();
  res.sendStatus(200);
}

export async function forgotPassword(req: Request, res: Response) {
  const email: string | undefined = req.body.email;

  if (!email) {
    res.status(400).json({
      email: "Email is a required field",
    });
    return;
  }

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    res.status(400).json({
      email: "Email not found",
    });
    return;
  }
  res.sendStatus(200);

  const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
  const changePasswordUrl = `http://${BASE_URL}/reset-password?token=${token}`;
  const text = `Hi,

Click the following link to reset your password: ${changePasswordUrl}

Thanks!

YourApp Team
`;

  sendMail({
    from: "email@yourapp.com",
    subject: "Reset your password",
    text,
    to: email,
  });
}
