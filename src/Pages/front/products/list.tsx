import EditProductModal from './edit';
import React, {useState} from 'react';
import {RootState} from "redux/store";
import {useAppSelector} from "redux/hooks";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {DeleteModal} from "../../../components/modal";
import {DefaultResponse} from "../../../redux/mainSlice";
import {serverAsset} from "../../../services/connectionConfig";

import {remove} from "../../../redux/dashboard/products/productsAction";
import dLoad from "../../../assets/img/image-loading-failed-02.png";
import Product from "../../../models/product";
// import {post} from "axios";


const ProductsList = () => {
    const {products} = useAppSelector((state: RootState) => state.adminProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [editingItem, setEditingItem] = useState<Product | null>(null);
    // const [deletedId, setDeletedId] = useState<number>(0);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // const {pathname} = location;

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

    return (
        <div>

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
            <div className='w-full flex justify-center'>

                <div
                    className={`flex flex-wrap ${products.length > 3 ? 'justify-between' : 'justify-start'} pb-1.5 w-full mb-12`}>
                    {products.map((product, i) => (
                        <div className="group aspect-square relative w-full mt-2 ">
                            <div className={'flex items-start mt-2'}>

                            </div>
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
                                    </div>
                            </div>

                            <div className={'border border-[#F7F7F7] mt-2'}>
                                {
                                    product.media.length == 0 ? <img
                                            className="w-full h-full object-cover"
                                            src={dLoad}
                                            alt={""}/> :
                                        <img className="w-full h-full object-cover"
                                             src={serverAsset(product.media[0].url)}
                                             alt={product.title}/>

                                }
                            </div>
                            <div className={'lg:px-4 px-2 mt-6 mb-4'}>
                                <span>

                    <p>{product.description != null ? product.description : <span>توضیحاتی ندارد.</span>}</p>
                            </span>

                                <div className={'mt-[12px] w-full flex justify-end'}>
                                    <div
                                         className={'btn btn-guest cursor-pointer border-none rounded-lg bg-[#4192EF] flex justify-center py-2 text-[14px] font-normal text-white '}>
                                        <span className={'mr-2'}>
                                        افزودن به سبد خرید
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/*<img className="w-full h-full object-cover" src={serverAsset(product.media[0].url)}*/}
                            {/*     alt={product.title}/>*/}
                        </div>

                    ))}
                </div>
            </div>

        </div>

    );
};

export default ProductsList;