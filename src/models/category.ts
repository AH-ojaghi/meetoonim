import Product from "./product";

interface CategoryInterface {
    id: number;
    title: string;
    parentId?: number;
    products?: Product[];
}

class Category {

    id: number;
    title: string;
    parentId?: number;
    products?: Product[];

    constructor(data: CategoryInterface) {
        this.id = data.id;
        this.title = data.title;
        this.parentId = data.parentId;
        this.products = data.products;
    }

}

export default Category;