export interface IDisck {
  available: string;
  capacity: string;
  total: string;
  used: string;
}


export interface IDisckResponse {
  data: IDisck;
  success: boolean;
}
