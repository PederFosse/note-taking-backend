import express from 'express';
import { SessionUser } from '../src/types';

declare global {
  namespace Express {
    interface Request {
      user: SessionUser;
    }
  }
}
