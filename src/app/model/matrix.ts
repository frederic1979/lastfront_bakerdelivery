export interface Imatrix {
  id: number;

  mondayQuantity: number;

  tuesdayQuantity: number;

  wednesdayQuantity: number;

  thursdayQuantity: number;

  fridayQuantity: number;

  saturdayQuantity: number;

  sundayQuantity: number;

  startDate: string;

  endDate: string;

  restaurantId: number;
}

export class Matrix implements Imatrix {
  id: number;

  mondayQuantity: number;

  tuesdayQuantity: number;

  wednesdayQuantity: number;

  thursdayQuantity: number;

  fridayQuantity: number;

  saturdayQuantity: number;

  sundayQuantity: number;

  startDate: string;

  endDate: string;

  restaurantId: number;


}
