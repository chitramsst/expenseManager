export interface Income{
    id : number,
    user_id : number,
    amount : number,
    title : string,
    description : string,
    date : Date
}

export interface Expense{
    id : number,
    user_id : number,
    amount : number,
    title : string,
    description : string,
    category_id : number,
    date : Date
}