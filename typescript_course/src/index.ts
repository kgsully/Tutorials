import { isStringObject } from "util/types";

type Pizza = {
    id: number,
    name: string,
    price: number,
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed",
}

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
];

const orderHistory: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id"> ): Pizza { // originally explicitly returned void as return of new pizza object was not in place.
    const newPizza: Pizza = { id: nextPizzaId++, ...pizzaObj}
    menu.push(newPizza);
    return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`);
        return;
    }
    cashInRegister += selectedPizza.price;
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderHistory.push(newOrder);
    return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderHistory.find(order => order.id === orderId);
    if (order) {
        order.status = "completed";
        return order;
    }
    console.error(`Order id ${orderId} not found in the order queue`);
    return;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === 'string') {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
    } else if (typeof identifier === 'number') {
        return menu.find(pizza => pizza.id === identifier);
    } else {
        throw new TypeError("Parameter 'identifier' must be either a string or a number");
    }
}

function addToArray<T>(array: T[], item: T): T[] {
    array.push(item);
    return array;
}

// addNewPizza({ name: "Chicken Bacon Ranch", price: 12});
// addNewPizza({ name: "BBQ Chicken", price: 12});
// addNewPizza({ name: "Spicy Sausage", price: 11});

addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 });
addToArray<Order>(orderHistory, { id: nextOrderId++, pizza: menu[2], status: "completed" });

// placeOrder("Chicken Bacon Ranch");
// completeOrder(1);

console.log("Menu: ", menu);
console.log("Cash in Register: ", cashInRegister);
console.log("Order Queue: ", orderHistory);

// console.log(getPizzaDetail(1));
// console.log(getPizzaDetail("Veggie"));
