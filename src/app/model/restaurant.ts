export interface Irestaurant {
  id: number;
  name: string;
  email: string;
  addresse: string;
}

export class Restaurant implements Irestaurant {
  id: number;
  name: string;
  email: string;
  addresse: string;
}
