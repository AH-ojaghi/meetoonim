import AddProductModal from './add';
import ProductsList from "./list";
import ProductsBigList from "./bigList";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {RootState} from "../../../redux/store";
import {Link, useLocation} from "react-router-dom";
import Routes from "../../../utils/routing/routes";
import dLoad from "../../../assets/img/image-loading-failed-02.png";
import {serverAsset} from "../../../services/connectionConfig";
import Auth from "../../../services/savedData/auth";
import {IPath} from "../../../utils/types";
import EditProductModal from "./edit";
import Product from "../../../models/product";
import ProductPageModal from "../productPage";


function Index() {

    return (
        <div className={'flex flex-col'}>


            <label htmlFor='addProduct'
                   className='flex flex-col justify-center items-cetner mr-2 cursor-pointer'>افزودن</label>
            <div
                className="border-b-0 border-b-solid rounded-t-2xl border-b-transparent flex justify-between items-center">
                <AddProductModal/>
                {/*end add post modal*/}

            </div>
            <div className={'flex w-full h-full'}>

                <div
                    className={`flex flex-col mr-2`}>
                    <ProductsList></ProductsList>
                </div>

            </div>

        </div>
    )
        ;
}

export default Index;