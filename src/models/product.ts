import Media from "./media";
import Category from "./category";

interface ProductInterface {
    id: number;
    title: string;
    description: string;
    code: string;
    price: number;
    quantity: number;
    category_id: number;
    category: Category;
    media: Media[];
    cover?: Media;
}

class Product {

    id: number;
    title: string;
    description: string;
    code: string;
    price: number;
    quantity: number;
    categoryId: number;
    category: Category;
    media: Media[];
    cover?: Media;

    constructor(data: ProductInterface) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.code = data.code;
        this.price = data.price;
        this.quantity = data.quantity;
        this.categoryId = data.category_id;
        this.category = data.category;
        this.media = data.media;
        this.cover = data.cover;
    }

}

export default Product;