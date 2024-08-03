import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Routes from "../../../utils/routing/routes";
import {Link} from "react-router-dom";
import {serverAsset} from "../../../services/connectionConfig";
import dLoad from "../../../assets/img/image-loading-failed-02.png";
import {LoadingComponent} from "../../../components/basincComponents";

const ProductPageModal = () => {

    const onClose = () => {
        //await to close the modal then go back
        setIsOpen(false);
        setTimeout(() => {
            window.history.back();
        }, 300);
    }

    const [isOpen, setIsOpen] = React.useState(false);
    let totalPriceCount: number = 0;

    //on page load open the modal
    React.useEffect(() => {
        setIsOpen(true);
    }, []);

    //get productPage
    const {product, loading} = useSelector((state: RootState) => state.productPage);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();



    return (
        <div> {loading || product == null ? (
            <div className="">
                <LoadingComponent/>
            </div>
        ) : (
            <div className={''}>

                <Link to={Routes.products.path} className={'cursor-pointer md:hidden flex mt-6 px-4'}>

                    <span className={'mr-2'}>{product.title}</span>
                </Link>
                <div className="px-4">
                    <div className="mt-4">
                        {product.media.length == 0 ? <img
                                className="w-full h-full object-cover"
                                src={dLoad}
                                alt={""}/> :
                            <img className="w-full h-full object-cover"
                                 src={serverAsset(product.media[0].url)}
                                 alt={product.title}/>}
                    </div>
                    <div className={'flex justify-between w-full'}>
                        <div className={'flex flex-col py-4 border-b border-b-[#F7F7F7] w-full'}>
                        <span className={'text-[14px] font-normal'}>{product.title}</span>
                            <span className={'text-[14px] font-normal mt-1 text-[#737373]'}>{product.price}</span>
                        </div>
                        {/*<span*/}
                        {/*    className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer">*/}
                        {/*  {product.category.title}*/}
                        {/*</span>*/}
                        {/*            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">*/}
                        {/*                {product.title}*/}
                        {/*            </h1>*/}
                        {/*            <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">*/}
                        {/*                {product.description}*/}
                        {/*            </p>*/}
                    </div>
                    <div className={'w-full mt-[12px]'}>
                        <div className={'w-full cursor-pointer rounded-lg bg-[#4192EF] flex justify-center py-[4px] text-[14px] font-normal text-white '}>افزودن به سبد
                            خرید
                        </div>
                    </div>
                </div>
                <div className={'w-full bg-[#F7F7F7] h-2 mt-[20px]'}></div>
                <div className={'px-2 w-full mt-[20px]'}>
                    <p>{product.description != null ? product.description : <span>توضیحاتی ندارد.</span>}</p>
                </div>
                <div className={'h-20 '}></div>
            </div>

        )}</div>
    );
};


export default ProductPageModal;
