export type PizzaObj = {
    name: string,
    price: number,
}

export type PizzaOrder = {
    id: number,
    pizza: PizzaObj,
    status: string,
}
