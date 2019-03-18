export class Order {
    constructor(
        public id : number, 
        public date : any,
        public user : string, 
        public city : string,
        public street : string, 
        public total : number,
        public card : number
    ) {}
}