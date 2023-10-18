export enum CustomPropertyEntityType {
  User = "User",
}

export enum CustomPropertyDataType {
  String = "string",
  Number = "number",
  Date = "date",
  Link = "link",
}

export interface CustomProperty {
  id: number;
  name: string;
  data_type: CustomPropertyDataType;
}

export interface GetCustomPropertiesRequest {
  entity_type: CustomPropertyEntityType;
}
