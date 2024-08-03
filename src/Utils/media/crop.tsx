import React, {ReactNode} from "react";
import DefaultModal from "../../components/modal";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {remCrop, setCropResult} from "../../redux/tools/cropSlice";
import 'react-advanced-cropper/dist/style.css';
import {Cropper, CropperRef} from 'react-advanced-cropper'

const ImageCropper: React.FC<{ file?: File }> = ({file}) => {

    const dispatch = useAppDispatch();
    // const crop = useAppSelector(state => state.crop.img);
    let canvas: HTMLCanvasElement | undefined;

    const onChange = (cropper: CropperRef) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
        // dispatch(remCrop());
        //convert canvas to File
        canvas = cropper.getCanvas() ?? undefined;
    };

    const onCrop = () => {
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'cropped-image.png', {type: 'image/png'});
                    dispatch(remCrop());
                    dispatch(setCropResult(file));
                }
            });
        }else {
            dispatch(remCrop());
            dispatch(setCropResult(file));
        }
    }

    return (
        <DefaultModal handleIsOpen={
            (e) => {
                if (!e) {
                    dispatch(remCrop());
                }
            }
        } id='cropImage' modalBoxClasses={`md:!max-w-3xl md:!w-max lg:!min-h-50-screen lg:min-w-31/100 z-[100000]`}>
            {file && <Cropper
                style={{maxHeight: "70vh", width: 'auto'}}
                aspectRatio={{minimum: 1, maximum: 1}}
                src={URL.createObjectURL(file)} onChange={onChange} className={'cropper'}/>}
            <div className="modal-action absolute bottom-0 w-full bg-white justify-start p-3">
                <label
                    htmlFor={'cropImage'}
                    onClick={() => onCrop()}
                    className="btn btn-success text-white">تایید</label>
            </div>
        </DefaultModal>
    );

}

export default ImageCropper;