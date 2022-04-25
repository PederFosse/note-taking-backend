import session from 'express-session';
import { SessionUser } from '../src/types';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
