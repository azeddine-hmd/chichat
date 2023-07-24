import cookieParser from 'cookie-parser';

export const cookieParserMiddleware = cookieParser(process.env.COOKIE_SECRET);
