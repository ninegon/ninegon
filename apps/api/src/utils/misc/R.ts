import {
  ascend,
  compose,
  concat,
  curryN,
  descend,
  eqBy,
  filter,
  isEmpty,
  isNil,
  lensPath,
  mapObjIndexed,
  mergeDeepWith,
  omit,
  over,
  pluck,
  prop,
  set,
  sortWith,
  tail,
  unionWith,
  uniq,
  uniqBy,
  view,
} from 'ramda';

// This class exists to prevent issues if ramda is removed
export class R {
  static ascend = ascend;
  static concat = concat;
  static compose = compose;
  static curryN = curryN;
  static descend = descend;
  static eqBy = eqBy;
  static filter = filter;
  static isEmpty = isEmpty;
  static isNil = isNil;
  static lensPath = lensPath;
  static mapObjIndexed = mapObjIndexed;
  static mergeDeepWith = mergeDeepWith;
  static omit = omit;
  static over = over;
  static pluck = pluck;
  static prop = prop;
  static set = set;
  static sortWith = sortWith;
  static tail = tail;
  static unionWith = unionWith;
  static uniq = uniq;
  static uniqBy = uniqBy;
  static view = view;
}
