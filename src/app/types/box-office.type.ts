import {BoxOfficeItemType} from './box-office-item.type';

export type BoxOfficeType = {
  total: number,
  items: BoxOfficeItemType[],
}
