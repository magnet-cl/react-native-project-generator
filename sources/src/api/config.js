import { Platform } from 'react-native';
import {
  SERVICE_PROTOCOL,
  SERVICE_HOST,
  SERVICE_BASE_PATH,
  SERVICE_PORT,
} from 'react-native-dotenv';

export const PROTOCOL = SERVICE_PROTOCOL;
export const HOST = SERVICE_HOST === 'localhost' ? Platform.select({
  ios: 'localhost',
  android: '10.0.2.2',
}) : SERVICE_HOST;
export const BASE_PATH = SERVICE_BASE_PATH;
export const PORT = SERVICE_PORT;
