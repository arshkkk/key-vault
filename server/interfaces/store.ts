import { ManipulateType } from "dayjs";

export type IPrimitiveValue = string | number;
export type IStoreKey = string;

export type IStoreSetValue = Set<string | number>;
export type IStoreValue =
  | IPrimitiveValue
  | Array<string | number>
  | IStoreSetValue;

export type IStoreValueConfig = { expiresAt?: number };

export type IStoreValueItem = { v: IStoreValue; c?: IStoreValueConfig };

export type IStoreDeleteConfig = { returnDeletedValue: boolean };

// day	d	Day
// week	w	Week
// month	M	Month
// quarter	Q	Quarter ( dependent QuarterOfYear plugin )
// year	y	Year
// hour	h	Hour
// minute	m	Minute
// second	s	Second
// millisecond

type IExpiryUnit = ManipulateType;

export type IStoreSetValueConfig = {
  expiresIn?: {
    unit: IExpiryUnit;
    value: number;
  };
  expiresAt?: number;
};
