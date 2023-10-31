export enum CacheTTLSeconds {
    ONE_MINUTE = 60,
    ONE_HOUR = 60 * 60,
    ONE_DAY = 60 * 60 * 24,
    ONE_WEEK = 7 * 24 * 60 * 60,
  }
  
  export type Inclusivity = '()' | '[)' | '(]' | '[]'
  export type ResetToDuration = 'days' | 'hours' | 'minutes' | 'seconds'
  export type IsSameOrBeforeDuration = 'years' | 'days' | 'hours'
  export type IsSameOrAfterDuration = 'years' | 'days' | 'hours'
  export type IsBetweenDuration = 'days' | 'hours'
  export type CallbackFunction = (...args: any[]) => void | any
  
  export enum IncrementType {
    PCT = 'PCT',
    QTY = 'QTY',
  }
  
  export interface ArbitraryObj {
    [key: string]: any
    [key: number]: any
  }
  
  export interface ObjWithId {
    [key: string]: any
    [key: number]: any
    id: number
  }
  
  export type DateRangeOptions = {
    limitFrom?: boolean
    limitTo?: boolean
    inclusivity?: Inclusivity
  }
  
  export type ObjWithSpaceSubTypeId = {
    [key: string]: any
    [key: number]: any
    spaceSubtypeId: number
  }
  
  export type ObjWithRateId = {
    [key: string]: any
    [key: number]: any
    rateId: number
  }
  
  export type ObjWithSpaceRateIdAndSubTypeId = ObjWithSpaceSubTypeId & ObjWithRateId
  export type ObjForRateCosts = ObjWithSpaceRateIdAndSubTypeId & {
    seasonId: number
  }
  
  export type ObjForTree = ObjWithSpaceRateIdAndSubTypeId & {
    date: Date
  }
  
  export type ObjForPaxIncrements = ObjWithSpaceRateIdAndSubTypeId & {
    pax: number
  }
  
  export type ObjForDietIncrements = ObjForPaxIncrements & {
    diet: number
  }
  
  export type ObjForRateIntelligentRules = ObjForRateCosts
  
  export type ExtraPax = {
    adults: number
    children: number
  }
  
  export type TaxCost = {
    cost: number
    quantity: number
  }
  
  export type DateTree<T> = {
    [key: string]: T
  }
  
  export type WeekDays = {
    Mo: boolean
    Tu: boolean
    We: boolean
    Th: boolean
    Fr: boolean
    Su: boolean
    Sa: boolean
  }
  
  