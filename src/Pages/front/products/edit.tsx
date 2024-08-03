import React, {useEffect} from 'react';
import {DefaultInput, DefaultSelect, DefaultTextArea} from "../../../components/fieilds";
import {Form, Formik, FormikHelpers} from "formik";
import DefaultModal from "../../../components/modal";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useAppSelector} from "../../../redux/hooks";
import {RootState} from "../../../redux/store";
import Product from "../../../models/product";
import {DefaultResponse} from "../../../redux/mainSlice";
import {getMediaTypes, MediaType} from "../../../models/media";
import MediaSelect from "../../../utils/media/media_select";
import {ProductUpdateCredentials, update} from "../../../redux/dashboard/products/productsAction";


interface values {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    quantity: number;
    // highLightId: number,
}


const EditProductModal: React.FC<{ product: Product | null, onClose: (isOpen: boolean) => void }> = ({
                                                                                                         product,
                                                                                                         onClose
                                                                                                     }) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {submitLoading} = useAppSelector((state: RootState) => state.adminProducts);
    const [media, setMedia] = React.useState<File[] | null>(null);
    const [mediaDeleted, setMediaDeleted] = React.useState<number[]>([]);

    const [cover, setCover] = React.useState<File[] | null>(null);
    //edit
    const handleEditConfirm = async (values: values) => {
        // Todo: fix this error in the future
        const credentials: ProductUpdateCredentials = {
            mediaUrls: media!,
            mediaTypes: getMediaTypes(media ?? []),
            id: product!.id,
            cover: cover!,
            coverTypes: getMediaTypes(cover!),
            deleteMediaIds: mediaDeleted,
            ...values,
        };
        const result: DefaultResponse = (await dispatch(update(credentials))).payload as DefaultResponse;
        console.log('result', result);
        console.log('result', result.status);
        if (result.status === 200 || result.status === 201) {
            console.log('yes')
            onClose(true);
        }
    }
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', categories.map((e) => e.title))

    //use effect for product and reset everything
    useEffect(() => {
        setMedia(null);
        setMediaDeleted([]);
}, [product]);

    return (
        <DefaultModal id='editProduct' isOpen={!!product} handleIsOpen={onClose} modalBoxClasses={`md:!max-w-3xl md:!w-max lg:!min-h-50-screen lg:min-w-31/100`}>
            {product ? (<Formik
                initialValues={{
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    categoryId: product.categoryId,
                    quantity: product.quantity,
                    // highLightId: 0,
                }}
                onSubmit={
                    (values: values, {setSubmitting}: FormikHelpers<values>) => {
                        console.log('values', values);
                        try {
                            handleEditConfirm(values);
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
                    console.log('errors', errors);
                    return errors;
                }}>
                <Form method="dialog">
                    <h3 className="font-bold text-lg flex justify-start">ویرایش محصول جدید</h3>
                    <div className="flex md:flex-row justify-around items-start flex-col mt-6">
                        <div className="md:w-1/2">
                            <MediaSelect
                                onInitialMediaDelete={(media) => {
                                        setMediaDeleted([...mediaDeleted, media]);
                                }}
                                initialMedia={product.media}
                                isDeletable={((media?.length ?? 0) + (product.media.length - mediaDeleted.length)) > 1}
                                mediaTypes={[MediaType.image, MediaType.video]}
                                onFileSelect={(files: File[] | null) => {
                                    console.log('mediax', media);
                                    setMedia(files);
                                }}></MediaSelect>
                        </div>
                        <div className="md:w-5"></div>

                        <div className="md:w-1/2">
                            <div className='flex-wrap justify-start w-full flex'>

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
                                <DefaultTextArea
                                    name="description"
                                    label="توضیحات محصول"
                                    placeholder="توضیحات محصول را وارد کنید"
                                ></DefaultTextArea>


                            </div>
                            <div className="modal-action w-full flex justify-start">

                                <label
                                    htmlFor="editProduct"
                                    className="btn bg-[#DE0000] text-white hover:scale-102 hover:shadow-soft-xs active:opacity-85">بستن
                                </label>
                                <button type="submit"
                                        className={`btn text-white ${submitLoading ? 'bg-gray-400' : "bg-[#4192EF] hover:scale-102 hover:shadow-soft-xs active:opacity-85"}`}>
                                    ویرایش
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>) : null}
        </DefaultModal>
    );
};

export default EditProductModal;
