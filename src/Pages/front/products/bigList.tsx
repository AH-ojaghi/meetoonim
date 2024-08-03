import {Link, useLocation} from "react-router-dom";
import EditProductModal from './edit';
import React, {useState} from 'react';
import {RootState} from "redux/store";
import {useAppSelector} from "redux/hooks";
import Product from "../../../models/product";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {DeleteModal} from "../../../components/modal";
import {DefaultResponse} from "../../../redux/mainSlice";
import {serverAsset} from "../../../services/connectionConfig";
import dLoad from "../../../assets/img/image-loading-failed-02.png";

import Routes from "../../../utils/routing/routes";
import {remove} from "../../../redux/dashboard/products/productsAction";


const ProductsBigList = () => {

    const {products} = useAppSelector((state: RootState) => state.adminProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [editingItem, setEditingItem] = useState<Product | null>(null);
    // const [deletedId, setDeletedId] = useState<number>(0);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const location = useLocation();
    const {pathname} = location;

    const handleDeleteClick = (product: Product) => {
        setSelectedItem(product);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedItem) {
            // setDeletedId(selectedItem.id);
            setSelectedItem(null);
            setIsModalOpen(false);
            const result: DefaultResponse = (await dispatch(remove(selectedItem.id))).payload as DefaultResponse;
            if (result.status !== 200 && result.status !== 201) {
                // setDeletedId(0);
            }
        }
    };
    // const changeCartItemNewQuantityValue = (id: number, quantity: 1) => {
    //     dispatch(setCartQuantity({
    //         productId: id,
    //         quantity: 1
    //     }));
    // }
    // const {cart, submitLoading} = useSelector((state: RootState) => state.cart);
    // const changeCartValues = (id: number, quantity: 1) => {
    //     if (submitLoading) return;
    //     changeCartItemNewQuantityValue(id, 1);
    //     dispatch(changeCart({
    //         quantity: 1,
    //         productId: id
    //     }));
    // }



    return (
        <div className='w-full flex justify-center'>

            <DeleteModal
                title="حذف محصول"
                message="آیا از حذف این محصول مطمئن هستید؟"
                onSubmit={handleDeleteConfirm}
                isOpen={isModalOpen}
                handleIsOpen={setIsModalOpen}
            ></DeleteModal>
            <EditProductModal
                product={editingItem}
                onClose={(isOpen: boolean) => {
                    setEditingItem(null);
                }}
            ></EditProductModal>
            <div className='mb-12 flex flex-wrap justify-start pb-1.5 w-full'>
                {products.map((product, i) => (
                    <div className="group aspect-square relative w-1/3 md:p-0.5 p-[0.5px]">
                        {/*title on bottom of product*/}
                            <div
                                className="absolute bottom-0 right-0 left-0 top-0 flex cursor-pointer w-4 h-4 transition-all duration-300">

                                    <div className="absolute top-2 right-2 rounded-lg">
                                        <div className="dropdown dropdown-bottom p-1 rounded-lg bg-[#4192EF]">
                                            <label tabIndex={0} className="bg-transparent cursor-pointer ">
                                            </label>
                                            <ul tabIndex={0}
                                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44">
                                                <li
                                                    onClick={() => {
                                                        setEditingItem(product);
                                                    }}
                                                    className="px-1 p-0 bg-transparent border-none cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 rounded-lg items-start">
                                                    <div className="px-1">

                                                        ویرایش
                                                    </div>
                                                </li>
                                                <li

                                                    onClick={() => {
                                                        handleDeleteClick(product);
                                                    }}
                                                    className="px-1 p-0 bg-transparent border-none cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 rounded-lg items-start">
                                                    <div className="px-1 text-[#DE0000]">
                                                        حذف
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>)
                            </div>

                        <Link to={Routes.productPage(product.id).path}>
                            {
                                    product.media.length == 0 ? <img
                                            className="w-full h-full object-cover"
                                            src={dLoad}
                                            alt={""}/> :
                                        <img className="w-full h-full object-cover"
                                             src={serverAsset(product.media[0].url)}
                                             alt={product.title}/>

                            }
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProductsBigList;