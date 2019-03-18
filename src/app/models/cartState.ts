import { product } from './product';

export interface CartState {
            done: number,
            products : product[],
            totalPrice : number,
            date: any,
            name: string
}