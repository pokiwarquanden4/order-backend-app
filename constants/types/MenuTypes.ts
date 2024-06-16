export interface IIngredient {
    _id?: string
    name: string,
    type: boolean,
    number: number,
}

export interface IDish {
    id?: string
    name: string,
    menu: string,
    imgUrl: string,
    ingredient: IIngredient[],
    ingredientConsumer: number[],
    recommend: boolean,
    description?: string,
    price: number
}

export interface IMenu {
    _id?: string
    name: string,
}