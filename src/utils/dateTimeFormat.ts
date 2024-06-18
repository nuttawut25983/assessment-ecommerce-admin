import { isUndefined } from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

dayjs.locale('th');

export const dateTimeFormat = (timestamp: any, format: string) =>
  !isUndefined(timestamp) ? dayjs(timestamp).format(format) : ``;
