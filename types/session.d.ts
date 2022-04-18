import session from 'express-session';
import { User } from '../src/types';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
