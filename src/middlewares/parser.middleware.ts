import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const dataParser = [bodyParser.urlencoded({ extended: true }), bodyParser.json()];
export const cookiesParser = cookieParser();
