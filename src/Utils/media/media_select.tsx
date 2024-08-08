//media select image or video and show preview of it
import React, {useState} from "react";
import Media from "../../models/media";
import media, {MediaType} from "../../models/media";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import "swiper/css";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setCrop, setCropResult} from "../../redux/tools/cropSlice";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {serverAsset} from "../../services/connectionConfig";
import {NetworkImage} from "../funcions";
import DefaultModal from "../../components/modal";
import {remMediaView, setMediaView} from "../../redux/tools/viewMediaSlice";
import {IconPlus} from "@tabler/icons-react";

const MediaSelect: React.FC<{ mediaTypes: MediaType[], onFileSelect: (file: File[] | null) => void, isDeletable?: boolean, initialMedia?: Media[], onInitialMediaDelete?: (index: number) => void }> =
    ({mediaTypes, onFileSelect, isDeletable = true, initialMedia, onInitialMediaDelete}) => {

        const [media, setMedia] = React.useState<File[] | null>(null);
        const dispatch = useAppDispatch();
        const cropResult = useAppSelector(state => state.crop.result);
        const [editIndex, setEditIndex] = React.useState<number | null>(null);
        const [canSlideNext, setCanSlideNext] = React.useState<boolean>((initialMedia?.length ?? 0) > 1);
        const [canSlidePrev, setCanSlidePrev] = React.useState<boolean>(false);

        const [initialData, setInitialData] = React.useState<Media[]>(initialMedia ? initialMedia : []);

        const settingIsCanSlideNext = (files: File[], data?: Media[]) => {
            setCanSlideNext((files.length + (data ?? initialData).length) > 1);
        }

        const settingMedia = (files: File[]) => {
            setMedia(files.length ? files : null);
            onFileSelect(files.length ? files : null);
            settingIsCanSlideNext(files);
        }

        React.useEffect(() => {
            if (cropResult && editIndex != null) {
                const newMedia = media ? [...media] : [];
                newMedia[editIndex] = cropResult;
                // settingMedia(newMedia);
                dispatch(setCropResult(undefined));
            }
        }, [cropResult]);

        return (
            <div className={`flex flex-col w-full ${media == null ? 'min-w-[300px]' : ''}`}>

                {(media || (initialMedia && initialMedia.length)) && <div className={`flex flex-col relative w-full`}>
                    <div className="flex flex-row flex-wrap w-full min-w-[300px]">

                        <Swiper
                            onSlideChange={(swiper) => {
                                setCanSlideNext(!swiper.isEnd);
                                setCanSlidePrev(!swiper.isBeginning);
                            }}
                            className="w-full rounded-xl">
                            {canSlideNext && (<SlideNextButton/>)}
                            {canSlidePrev && (<SlidePrevButton/>)}
                            {
                                initialData && initialData.map((file, index) => {
                                    return (
                                        <SwiperSlide className="relative w-full" key={'initial_media' + index}>
                                            {isDeletable ? (<div className="absolute top-0 right-0 block">
                                                <div className="btn btn-sm btn-danger"
                                                     onClick={() => {
                                                         onInitialMediaDelete && onInitialMediaDelete(file.id);
                                                         const newMedia = initialData ? [...initialData] : [];
                                                         newMedia.splice(index, 1);
                                                         setInitialData(newMedia);
                                                         settingIsCanSlideNext(media ?? [], newMedia);
                                                     }}>
                                                    حذف
                                                </div>
                                            </div>) : null}
                                            <img src={serverAsset(file.thumbnail)} className="md:w-[330px] w-full h-full rounded-xl"/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            {media && media.map((file, index) => {
                                return (
                                    <SwiperSlide className="relative w-full" key={'media' + index}>
                                        {isDeletable ? (<div className="absolute top-0 right-0 md:block hidden">
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={() => {
                                                        const newMedia = media ? [...media] : [];
                                                        newMedia.splice(index, 1);
                                                        settingMedia(newMedia);
                                                    }}>
                                                حذف
                                            </button>
                                        </div>) : null}
                                        <SwiperSlide className="relative w-full" key={'media' + index}>
                                            {/*background grey with opacity*/}
                                            {isDeletable ? (<div className="absolute top-2 right-2">
                                                <button
                                                    className="btn btn-sm bg-gray-300 bg-opacity-80 rounded-xl w-10 h-10 flex justify-center items-center border-none"
                                                    onClick={() => {
                                                        const newMedia = media ? [...media] : [];
                                                        newMedia.splice(index, 1);
                                                        settingMedia(newMedia);
                                                        settingIsCanSlideNext(newMedia);
                                                    }}>
                                                    <svg fill="#ff0000" version="1.1" id="Capa_1"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width={18}
                                                         viewBox="0 0 408.483 408.483">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                           strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <g>
                                                                <g>
                                                                    <path
                                                                        d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path>
                                                                    <path
                                                                        d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>) : null}

                                            <img src={URL.createObjectURL(file)} alt=""
                                                 className="w-full h-[350px]"/>
                                            {/*<div className="absolute bottom-0 left-0 w-full md:flex hidden justify-center pb-2">*/}
                                            {/*    <div className="btn flex btn-sm">*/}
                                            {/*        <button className="text-[#808080]">ویرایش</button>*/}
                                            {/*        <svg fill="#808080" width="18px" version="1.1" id="Capa_1"*/}
                                            {/*             xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*             viewBox="0 0 348.882 348.882" stroke="#808080">*/}
                                            {/*            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>*/}
                                            {/*            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"*/}
                                            {/*               strokeLinejoin="round"></g>*/}
                                            {/*            <g id="SVGRepo_iconCarrier">*/}
                                            {/*                <g>*/}
                                            {/*                    <path*/}
                                            {/*                        d="M333.988,11.758l-0.42-0.383C325.538,4.04,315.129,0,304.258,0c-12.187,0-23.888,5.159-32.104,14.153L116.803,184.231 c-1.416,1.55-2.49,3.379-3.154,5.37l-18.267,54.762c-2.112,6.331-1.052,13.333,2.835,18.729c3.918,5.438,10.23,8.685,16.886,8.685 c0,0,0.001,0,0.001,0c2.879,0,5.693-0.592,8.362-1.76l52.89-23.138c1.923-0.841,3.648-2.076,5.063-3.626L336.771,73.176 C352.937,55.479,351.69,27.929,333.988,11.758z M130.381,234.247l10.719-32.134l0.904-0.99l20.316,18.556l-0.904,0.99 L130.381,234.247z M314.621,52.943L182.553,197.53l-20.316-18.556L294.305,34.386c2.583-2.828,6.118-4.386,9.954-4.386 c3.365,0,6.588,1.252,9.082,3.53l0.419,0.383C319.244,38.922,319.63,47.459,314.621,52.943z"></path>*/}
                                            {/*                    <path*/}
                                            {/*                        d="M303.85,138.388c-8.284,0-15,6.716-15,15v127.347c0,21.034-17.113,38.147-38.147,38.147H68.904 c-21.035,0-38.147-17.113-38.147-38.147V100.413c0-21.034,17.113-38.147,38.147-38.147h131.587c8.284,0,15-6.716,15-15 s-6.716-15-15-15H68.904c-37.577,0-68.147,30.571-68.147,68.147v180.321c0,37.576,30.571,68.147,68.147,68.147h181.798 c37.576,0,68.147-30.571,68.147-68.147V153.388C318.85,145.104,312.134,138.388,303.85,138.388z"></path>*/}
                                            {/*                </g>*/}
                                            {/*            </g>*/}
                                            {/*        </svg>*/}

                                            {/*    </div>*/}
                                            {/*    <div className="w-3"></div>*/}
                                            {/*    <div className="btn flex btn-sm" onClick={*/}
                                            {/*        async () => {*/}
                                            {/*            //change current media by index*/}
                                            {/*            const files: File[] | null = await handleMediaSelection(mediaTypes);*/}
                                            {/*            if (files) {*/}
                                            {/*                const newMedia = media ? [...media] : [];*/}
                                            {/*                newMedia[index] = files[0];*/}
                                            {/*                settingMedia(newMedia);*/}
                                            {/*            }*/}
                                            {/*        }*/}
                                            {/*    }>*/}
                                            {/*        <div className="text-[#808080]">تغییر</div>*/}
                                            {/*        <svg fill="#808080" width="18px" version="1.1" id="Capa_1"*/}
                                            {/*             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"*/}
                                            {/*             stroke="#808080">*/}
                                            {/*            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>*/}
                                            {/*            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"*/}
                                            {/*               strokeLinejoin="round"></g>*/}
                                            {/*            <g id="SVGRepo_iconCarrier">*/}
                                            {/*                <path*/}
                                            {/*                    d="M550.208 960H209.28A81.792 81.792 0 0 1 128 877.76V146.24A81.92 81.92 0 0 1 209.344 64h613.632a81.92 81.92 0 0 1 81.28 82.432v405.76a29.824 29.824 0 1 1-59.584 0V146.56a22.272 22.272 0 0 0-21.76-22.656H209.408a22.08 22.08 0 0 0-21.696 22.528v731.52a21.76 21.76 0 0 0 21.44 22.464h341.056a29.824 29.824 0 0 1 0.064 59.584z m196.352-600.96H285.824a29.824 29.824 0 1 1 0-59.712h460.8a29.824 29.824 0 1 1 0 59.712z m-204.8 156.8H285.824a29.824 29.824 0 1 1 0-59.712h255.936a29.824 29.824 0 1 1 0 59.648z m179.2 391.936c-101.12 0-183.424-83.84-183.424-186.624a29.824 29.824 0 1 1 59.712 0c0 70.016 55.552 126.976 123.584 126.976 17.408 0 34.24-3.712 50.048-10.88a29.888 29.888 0 0 1 24.768 54.336c-23.552 10.688-48.64 16.192-74.688 16.192z m153.6-156.8a29.824 29.824 0 0 1-29.824-29.824c0-70.016-55.552-126.976-123.648-126.976-16.32 0-32.384 3.2-47.36 9.6a29.888 29.888 0 0 1-23.424-54.912 180.224 180.224 0 0 1 70.784-14.336c101.12 0 183.424 83.84 183.424 186.624a30.016 30.016 0 0 1-29.952 29.824z m-204.8-104.576h-51.264a29.76 29.76 0 0 1-25.28-14.08 30.144 30.144 0 0 1-1.536-28.928l25.6-52.352a29.696 29.696 0 0 1 53.632 0l25.6 52.352a29.696 29.696 0 0 1-1.472 28.928 29.504 29.504 0 0 1-25.28 14.08z m127.552 269.568h-1.024a29.696 29.696 0 0 1-24.896-14.848l-25.6-44.288a29.888 29.888 0 0 1 23.808-44.672l58.048-4.032c11.392-0.704 22.144 5.12 27.904 14.848a30.016 30.016 0 0 1-1.024 31.616l-32.448 48.256a29.824 29.824 0 0 1-24.768 13.12z"*/}
                                            {/*                    fill="#808080"></path>*/}
                                            {/*            </g>*/}
                                            {/*        </svg>*/}

                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </SwiperSlide>

                                        <div
                                            className="absolute bottom-0 left-0 w-full md:flex hidden  justify-center pb-2">
                                            <div className="btn flex btn-sm" onClick={() => {
                                                dispatch(setCrop(file));
                                                setEditIndex(index);
                                            }}>
                                                <button className="text-[#808080]">ویرایش</button>
                                                <svg fill="#808080" width="18px" version="1.1" id="Capa_1"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 348.882 348.882" stroke="#808080">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                       strokeLinejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <g>
                                                            <path
                                                                d="M333.988,11.758l-0.42-0.383C325.538,4.04,315.129,0,304.258,0c-12.187,0-23.888,5.159-32.104,14.153L116.803,184.231 c-1.416,1.55-2.49,3.379-3.154,5.37l-18.267,54.762c-2.112,6.331-1.052,13.333,2.835,18.729c3.918,5.438,10.23,8.685,16.886,8.685 c0,0,0.001,0,0.001,0c2.879,0,5.693-0.592,8.362-1.76l52.89-23.138c1.923-0.841,3.648-2.076,5.063-3.626L336.771,73.176 C352.937,55.479,351.69,27.929,333.988,11.758z M130.381,234.247l10.719-32.134l0.904-0.99l20.316,18.556l-0.904,0.99 L130.381,234.247z M314.621,52.943L182.553,197.53l-20.316-18.556L294.305,34.386c2.583-2.828,6.118-4.386,9.954-4.386 c3.365,0,6.588,1.252,9.082,3.53l0.419,0.383C319.244,38.922,319.63,47.459,314.621,52.943z"></path>
                                                            <path
                                                                d="M303.85,138.388c-8.284,0-15,6.716-15,15v127.347c0,21.034-17.113,38.147-38.147,38.147H68.904 c-21.035,0-38.147-17.113-38.147-38.147V100.413c0-21.034,17.113-38.147,38.147-38.147h131.587c8.284,0,15-6.716,15-15 s-6.716-15-15-15H68.904c-37.577,0-68.147,30.571-68.147,68.147v180.321c0,37.576,30.571,68.147,68.147,68.147h181.798 c37.576,0,68.147-30.571,68.147-68.147V153.388C318.85,145.104,312.134,138.388,303.85,138.388z"></path>
                                                        </g>
                                                    </g>
                                                </svg>

                                            </div>
                                            <div className="w-3"></div>
                                            <div className="btn flex btn-sm" onClick={async () => {
                                                const files: File[] | null = await handleMediaSelection(mediaTypes);
                                                if (files) {
                                                    // @ts-ignore
                                                    settingMedia([...(media?.length ? media : []), ...files]);
                                                }
                                            }}>

                                                {/*<div*/}
                                                {/*    className="w-full flex cursor-pointer btn bg-transparent  justify-center items-center w-1/2 h-[150px] border border-dashed border-gray-300 rounded-lg mt-4"*/}
                                                {/*    onClick={async () => {*/}
                                                {/*        const files: File[] | null = await handleMediaSelection(mediaTypes);*/}
                                                {/*        if (files) {*/}
                                                {/*            // @ts-ignore*/}
                                                {/*            settingMedia([...(media?.length ? media : []), ...files]);*/}
                                                {/*        }*/}
                                                {/*    }}*/}
                                                {/*>*/}
                                                {/*    <div className="flex flex-col justify-center items-center"*/}
                                                {/*    >انتخاب فایل*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="text-[#808080]">افزودن</div>
                                                <IconPlus size={18}/>

                                            </div>
                                            <div className="w-3"></div>
                                            <div className="btn flex btn-sm" onClick={
                                                async () => {
                                                    //change current media by index
                                                    const files: File[] | null = await handleMediaSelection(mediaTypes);
                                                    if (files) {
                                                        const newMedia = media ? [...media] : [];
                                                        newMedia[index] = files[0];
                                                        settingMedia(newMedia);
                                                    }
                                                }
                                            }>
                                                <div className="text-[#808080]">تغییر</div>
                                                <svg fill="#808080" width="18px" version="1.1" id="Capa_1"
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                                                     stroke="#808080">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                       strokeLinejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M550.208 960H209.28A81.792 81.792 0 0 1 128 877.76V146.24A81.92 81.92 0 0 1 209.344 64h613.632a81.92 81.92 0 0 1 81.28 82.432v405.76a29.824 29.824 0 1 1-59.584 0V146.56a22.272 22.272 0 0 0-21.76-22.656H209.408a22.08 22.08 0 0 0-21.696 22.528v731.52a21.76 21.76 0 0 0 21.44 22.464h341.056a29.824 29.824 0 0 1 0.064 59.584z m196.352-600.96H285.824a29.824 29.824 0 1 1 0-59.712h460.8a29.824 29.824 0 1 1 0 59.712z m-204.8 156.8H285.824a29.824 29.824 0 1 1 0-59.712h255.936a29.824 29.824 0 1 1 0 59.648z m179.2 391.936c-101.12 0-183.424-83.84-183.424-186.624a29.824 29.824 0 1 1 59.712 0c0 70.016 55.552 126.976 123.584 126.976 17.408 0 34.24-3.712 50.048-10.88a29.888 29.888 0 0 1 24.768 54.336c-23.552 10.688-48.64 16.192-74.688 16.192z m153.6-156.8a29.824 29.824 0 0 1-29.824-29.824c0-70.016-55.552-126.976-123.648-126.976-16.32 0-32.384 3.2-47.36 9.6a29.888 29.888 0 0 1-23.424-54.912 180.224 180.224 0 0 1 70.784-14.336c101.12 0 183.424 83.84 183.424 186.624a30.016 30.016 0 0 1-29.952 29.824z m-204.8-104.576h-51.264a29.76 29.76 0 0 1-25.28-14.08 30.144 30.144 0 0 1-1.536-28.928l25.6-52.352a29.696 29.696 0 0 1 53.632 0l25.6 52.352a29.696 29.696 0 0 1-1.472 28.928 29.504 29.504 0 0 1-25.28 14.08z m127.552 269.568h-1.024a29.696 29.696 0 0 1-24.896-14.848l-25.6-44.288a29.888 29.888 0 0 1 23.808-44.672l58.048-4.032c11.392-0.704 22.144 5.12 27.904 14.848a30.016 30.016 0 0 1-1.024 31.616l-32.448 48.256a29.824 29.824 0 0 1-24.768 13.12z"
                                                            fill="#808080"></path>
                                                    </g>
                                                </svg>

                                            </div>

                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>}


                {
                    media?.length == null ? <div
                        className="w-full flex cursor-pointer btn bg-transparent  justify-center items-center w-1/2 h-[150px] border border-dashed border-gray-300 rounded-lg mt-4"
                        onClick={async () => {
                            const files: File[] | null = await handleMediaSelection(mediaTypes);
                            if (files) {
                                // @ts-ignore
                                settingMedia([...(media?.length ? media : []), ...files]);
                            }
                        }}
                    >
                        <div className="flex flex-col justify-center items-center"
                        >انتخاب فایل
                        </div>
                    </div> : <div></div>
                }

            </div>
        );
    };


export const MediaView: React.FC<{ initialMedia: Media[] }> = ({initialMedia}) => {

    const [canSlideNext, setCanSlideNext] = React.useState<boolean>(initialMedia.length > 1);
    const [canSlidePrev, setCanSlidePrev] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();


    return (
        <div
            className={`flex flex-col cursor-pointer transition-all relative w-full`}>
            <div className="flex flex-row flex-wrap w-full">

                <Swiper
                    onSlideChange={(swiper) => {
                        setCanSlideNext(!swiper.isEnd);
                        setCanSlidePrev(!swiper.isBeginning);
                    }}
                    className="w-full rounded-xl">
                    {canSlideNext && (<SlideNextButton/>)}
                    {canSlidePrev && (<SlidePrevButton/>)}
                    {
                        initialMedia.map((file, index) => {
                            return (
                                <SwiperSlide onClick={() => dispatch(setMediaView({media: initialMedia, index: index}))}
                                             className="relative w-full" key={'initial_media' + index}>
                                    <NetworkImage alt="" url={serverAsset(file.thumbnail)}
                                                  className="w-full h-full rounded-xl"/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export const FullscreenMedia: React.FC<{ media: Media[], selectedIndex: number }> = ({media, selectedIndex}) => {

    const [canSlideNext, setCanSlideNext] = React.useState<boolean>(media.length > 1);
    const [canSlidePrev, setCanSlidePrev] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (<DefaultModal handleIsOpen={
            (e) => {
                if (!e) {
                    dispatch(remMediaView());
                }
            }
        } id='viewMedia' isOpen={media.length > 0}
                          modalBoxClasses={`!w-screen !h-screen !max-w-6xl !max-h-none z-[100000] bg-black`}>
            {media.length && <div className="h-full">
                <Swiper
                    onSlideChange={(swiper) => {
                        setCanSlideNext(!swiper.isEnd);
                        setCanSlidePrev(!swiper.isBeginning);
                    }}
                    className="w-full rounded-xl h-full">
                    {canSlideNext && (<SlideNextButton/>)}
                    {canSlidePrev && (<SlidePrevButton/>)}
                    {
                        media.map((file, index) => {
                            return (
                                <SwiperSlide defaultChecked={index == selectedIndex} className="relative w-full"
                                             key={'initial_media' + index}>
                                    <NetworkImage alt="" url={serverAsset(file.thumbnail)}
                                                  className="w-full h-full object-contain rounded-xl"/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>}
        </DefaultModal>
    );
};


function SlideNextButton() {
    const swiper = useSwiper();

    return (
        //    a shadow on left side of swiper
        (<div className="absolute top-10 bottom-10 left-2 w-10 z-10 flex items-center">
            <div className="rounded-full shadow flex p-3 bg-white cursor-pointer" onClick={() => swiper.slideNext()}>
                <AiOutlineLeft/>
            </div>
        </div>)
    );
}

function SlidePrevButton() {
    const swiper = useSwiper();
    return (
        //    a shadow on right side of swiper
        swiper.isBeginning ? <></> : (
            <div className="absolute top-10 bottom-10 right-2 w-10 z-10 flex items-center">
                <div className="rounded-full shadow flex p-3 bg-white cursor-pointer"
                     onClick={() => swiper.slidePrev()}>
                    <AiOutlineRight/>
                </div>
            </div>
        )
    );
}

const getListOfFileFromFileList = (fileList: FileList): File[] => {
    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i) as File);
    }
    return files;
}

export const handleMediaSelection = (mediaTypes: MediaType[]): Promise<File[]> => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = mediaTypes.join(',');
        input.multiple = true;
        input.click();
        input.onchange = () => {
            const files = input.files;
            if (files) {
                resolve(getListOfFileFromFileList(files));
            } else {
                reject();
            }
        };
    });
}



export default MediaSelect;

