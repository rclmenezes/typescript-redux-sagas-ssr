import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import User from "../db/models/User";

export const SALT_LENGTH = 10;

export async function get(req: Request, res: Response) {
  const user: User = req.user;

  if (user) {
    const { id, email } = user;
    res.json({ id, email });
  } else {
    res.sendStatus(400);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const email: string | undefined = req.body.email;
  const password: string | undefined = req.body.password;

  if (!email) {
    res.status(400).json({
      email: "Email is a required field",
    });
    return;
  }

  const atLocation = email.search("@");
  if (atLocation < 1 || atLocation === email.length) {
    res.status(400).json({
      email: "Please enter a valid email",
    });
    return;
  }
  if (!password) {
    res.status(400).json({
      password: "Password is a required field",
    });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({
      password: "Password must be at least 8 characters",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, SALT_LENGTH);
  const user = new User({ email, passwordHash });
  try {
    await user.save();
  } catch (e) {
    if (e instanceof UniqueConstraintError) {
      res.status(400).json({
        email: "Email is already taken",
      });
      return;
    } else {
      throw e;
    }
  }

  req.login(user, err => {
    if (err) {
      return next(err);
    }
    const { id } = user;
    res.json({
      email,
      id,
    });
  });
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  const user: User = req.user;
  const password: string | undefined = req.body.password;

  if (!password) {
    res.status(400).json({
      password: "Password is a required field",
    });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({
      password: "Password must be at least 8 characters",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, SALT_LENGTH);
  await User.update({ passwordHash }, { where: { id: user.id } });

  const { id, email } = user;
  req.login(user, err => {
    if (err) {
      return next(err);
    }
    res.json({
      email,
      id,
    });
  });
}
