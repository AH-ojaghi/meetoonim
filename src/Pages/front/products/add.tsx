import React from 'react';
import {DefaultInput, DefaultSelect, DefaultTextArea} from "../../../components/fieilds";
import {Form, Formik, FormikHelpers} from "formik";
import DefaultModal from "../../../components/modal";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useAppSelector} from "../../../redux/hooks";
import {RootState} from "../../../redux/store";
import MediaSelect from "../../../utils/media/media_select";
import {getMediaTypes, MediaType} from "../../../models/media";
import {defaultModal, NetworkImage, toastError} from "../../../utils/funcions";
import {ProductCreateCredentials, submit} from "../../../redux/dashboard/products/productsAction";


interface values {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    highLightId: number;
    quantity: number;
    // highLight: HighLight;
}


const AddProductModal = () => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {submitLoading} = useAppSelector((state: RootState) => state.adminProducts);
    const products = useAppSelector((state: RootState) => state.adminProducts);
    const [media, setMedia] = React.useState<File[] | null>(null);
    const [cover, setCover] = React.useState<File[] | null>(null);
    // const highLights = useAppSelector((state: RootState) => state.HighLight.highLights);
    // console.log('weukhfufre', products.products.map((category) => {
    //     return {
    //         label: category.category.title,    value: category.id
    //     }
    // }));
    return (
        <DefaultModal id='addProduct' modalBoxClasses={`md:!max-w-3xl md:!w-max  lg:min-w-31/100 md:h-max h-full overflow-x-hidden`}>
            <label className={'flex cursor-pointer w-max'} htmlFor={'addProduct'}>
                <span>برگشت</span>
            </label>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: 0,
                    categoryId: 0,
                    quantity: 0,
                    highLightId: 0,
                    // name: '',
                }}
                onSubmit={
                    (values: values, {setSubmitting}: FormikHelpers<values>) => {
                        console.log('values', values);
                        try {
                            const credentials: ProductCreateCredentials = {
                                mediaUrls: media!,
                                cover: cover!,
                                coverTypes: getMediaTypes(cover!),
                                mediaTypes: getMediaTypes(media!),
                                ...values,
                            };
                            dispatch(submit(credentials));
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
                //validation
                validate={(values: values) => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'عنوان محصول را وارد کنید';
                    }
                    if (!values.description) {
                        errors.description = 'توضیحات محصول را وارد کنید';
                    }
                    if (!values.price) {
                        errors.price = 'قیمت محصول را وارد کنید';
                    }
                    if (!values.categoryId) {
                        errors.categoryId = 'دسته بندی محصول را انتخاب کنید';
                    }
                    if (!values.quantity) {
                        errors.quantity = 'تعداد محصول را وارد کنید';
                    }
                    if (!media) {
                        toastError('لطفا یک رسانه انتخاب کنید')
                    }
                    return errors;
                }}>
                <div className={'md:h-max h-full w-full items-center flex'}>

                    <Form method="dialog" className={'w-full h-full'}>
                        <h3 className="font-bold text-lg flex justify-center">ایجاد محصول جدید</h3>
                        <div className="flex md:flex-row justify-around flex-col">
                            <div className={`${media ? 'md:w-1/2' : 'w-full'}`}>
                                <MediaSelect mediaTypes={[MediaType.image, MediaType.video]}
                                             onFileSelect={(files: File[] | null) => {
                                                 console.log('mediax', media);
                                                 setMedia(files);
                                             }}></MediaSelect>
                            </div>
                            {media &&
                                <div className="md:w-5"></div>}
                            {media &&
                                <div className="md:w-1/2">
                                    <div className='flex-wrap justify-start items-center w-full flex'>

                                        <DefaultInput
                                            label='عنوان محصول'
                                            name="title"
                                            type="text"
                                            placeholder='عنوان محصول'
                                        ></DefaultInput>

                                        <DefaultInput
                                            label='قیمت محصول'
                                            name="price"
                                            type="number"
                                            placeholder='قیمت محصول را وارد کنید'
                                        ></DefaultInput>

                                        <DefaultInput
                                            label='تعداد محصول'
                                            name="quantity"
                                            type="number"
                                            placeholder='تعداد محصول را وارد کنید'
                                        ></DefaultInput>
                                        <DefaultInput
                                            label='عنوان برچسب'
                                            name="highLightId"
                                            type="text"
                                            placeholder='عنوان برچسب'
                                        ></DefaultInput>

                                        <div className={'flex items-center'}>
                                            <span
                                                className={'text-[11px] mr-2 mt-2'}>اگر قصد افزودن به برچسب های موجود دارید نام برچسب را به دقت وارد کنید در غیر اینصورت نام جدید را وارد کنید.</span>
                                        </div>

                                        <div className={`${cover ? 'md:w-1/2' : 'w-full'}`}>
                                            <MediaSelect mediaTypes={[MediaType.image]}
                                                         onFileSelect={(files: File[] | null) => {
                                                             console.log('mediax', cover);
                                                             setCover(files);
                                                         }}></MediaSelect>
                                        </div>

                                        <DefaultTextArea
                                            name="description"
                                            label="توضیحات محصول"
                                            placeholder="توضیحات محصول را وارد کنید"
                                        ></DefaultTextArea>


                                        {/*<DefaultInput*/}
                                        {/*    label='عنوان محصول'*/}
                                        {/*    name="title"*/}
                                        {/*    type="text"*/}
                                        {/*    placeholder='عنوان محصول'*/}
                                        {/*></DefaultInput>*/}

                                        {/*<div className={'flex justify-between py-4 border-b border-b-[#e3e3e3] w-full'}>*/}
                                        {/*    <span className={'text-[14px] '}>قیمت</span>*/}

                                        {/*    <div className={'flex'}>*/}
                                        {/*        <input className={'flex text-left outline-none min-w-[50px] w-[100px]'}*/}
                                        {/*               type="text" name='price' placeholder={'10000'}/>*/}
                                        {/*        <span*/}
                                        {/*            className={'text-[#121212] text-[10px] font-bold mt-1 mr-2'}>تومان</span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        {/*<DefaultSelect*/}
                                        {/*    label='دسته بندی محصول'*/}
                                        {/*    label2='انتخاب'*/}
                                        {/*    name="categoryId"*/}
                                        {/*    placeholder='دسته بندی والد'*/}
                                        {/*    options={categories.map((category) => {*/}
                                        {/*        return {*/}
                                        {/*            label: category.title,*/}
                                        {/*            value: category.id*/}
                                        {/*        }*/}
                                        {/*    }) as any}*/}
                                        {/*></DefaultSelect>*/}

                                        {/*<DefaultInput*/}
                                        {/*    label='تعداد محصول'*/}
                                        {/*    name="quantity"*/}
                                        {/*    type="number"*/}
                                        {/*    placeholder='تعداد محصول را وارد کنید'*/}
                                        {/*></DefaultInput>*/}

                                        {/*<DefaultInput*/}
                                        {/*    label='عنوان برچسب'*/}
                                        {/*    name="highLightId"*/}
                                        {/*    type="text"*/}
                                        {/*    placeholder='عنوان برچسب'*/}
                                        {/*></DefaultInput>*/}

                                        {/*<div className={'flex items-center'}>*/}
                                        {/*    <IconInfoSquare color={'#DE0000'} size={18}/>*/}
                                        {/*    <span*/}
                                        {/*        className={'text-[11px] mr-2 mt-2'}>اگر قصد افزودن به برچسب های موجود دارید نام برچسب را به دقت وارد کنید در غیر اینصورت نام جدید را وارد کنید.</span>*/}
                                        {/*</div>*/}

                                        {/*<DefaultTextArea*/}
                                        {/*    name="description"*/}
                                        {/*    label="توضیحات محصول"*/}
                                        {/*    placeholder="توضیحات محصول را وارد کنید"*/}
                                        {/*></DefaultTextArea>*/}


                                    </div>
                                    <div className="modal-action w-full flex justify-start">

                                        <label
                                            htmlFor="addProduct"
                                            className="btn bg-[#DE0046] text-white hover:scale-102 hover:shadow-soft-xs active:opacity-85">بستن
                                        </label>
                                        <button type="submit"
                                                className={`btn text-white ${submitLoading ? 'bg-gray-400' : "bg-[#4192EF] hover:scale-102 hover:shadow-soft-xs active:opacity-85"}`}>
                                            ایجاد کردن
                                        </button>
                                    </div>
                                </div>}
                        </div>
                    </Form>
                </div>
            </Formik>
        </DefaultModal>
    );
};

export default AddProductModal;
