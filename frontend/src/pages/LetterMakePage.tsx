import { useEffect, useState } from 'react';
import { FrameType, Letter, StudioDetail, fontTemplate } from '../types/type';
import { getTemplate, getFont, getBgm } from '../api/template';
import { httpStatusCode } from '../util/http-status';

export default function LetterMakePage() {
    //mode - 0:영상리스트, 1:프레임, 2:텍스트, 3:오디오
    const [mode, setMode] = useState<number>(0);

    ///////////////////////////////////////////////초기 설정////////////////////////////////////////////////////////

    //영상리스트 with 스튜디오 정보
    const [studioDetailInfo, setStudioDetailInfo] = useState<StudioDetail>({
        studioId: '',
        studioTitle: '',
        studioOwner: '',
        isCompleted: false,
        clipInfoList: [],
        studioFrameId: -1,
        studioFontId: -1,
        studioBGMId: -1,
    });

    // 수정 정보
    const [studioModify, setStudioModify] = useState<Letter>({
        studioId: '',
        usedClipList: [
            {
                clipId: '',
                clipVolume: 0,
            },
        ],
        unusedClipList: [''],
        studioFrameId: '',
        studioFont: {
            fontId: '',
            fontSize: 10,
            isBold: false,
        },
        studioBGM: '',
        studioVolume: 50,
    });

    //프레임 리스트
    const [frameList, setFrameList] = useState<FrameType[]>([]);

    //폰트 리스트
    const [fontList, setFontList] = useState<fontTemplate[]>([]);

    //BGM 리스트
    const [bgmList, setBGMList] = useState([]); //추후 구현

    // 선택한 프레임
    const [selectImgUrl, setSelectImgUrl] = useState<string>(
        '/src/assets/frames/frame1.png'
    );

    /** 선택한 프레임 적용 */
    const selectImg = (source: string) => {
        setSelectImgUrl(source);
    };
    useEffect(() => {
        /**initSetting()
         * 초기 설정
         */
        const initSetting = async () => {
            getFont()
                .then((res) => {
                    if (res.status === httpStatusCode.OK) {
                        console.log(res.data);
                        setFontList([...res.data.fontTemplate]);
                    } else {
                        console.log('Network Error!');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            getTemplate()
                .then((res) => {
                    if (res.status === httpStatusCode.OK) {
                        console.log(res.data);
                        setFrameList([...res.data.frameTemplate]);
                    } else {
                        console.log('Network Error');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        initSetting();
    }, []);

    /////////////////////////////////////mode에 따른 사이드바 추가////////////////////////////////////////////////////
    let sideBar = <></>;

    switch (mode) {
        case 0:
            sideBar = (
                <div className="w-full flex justify-start text-xl ">
                    <p>선택하지 않은 영상</p>
                </div>
            );
            break;
        case 1:
            sideBar = (
                <div className="w-full flex flex-col justify-start text-xl ">
                    <p>프레임</p>
                    <div className="flex flex-wrap text-center cursor-pointer">
                        {frameList.map((frame) => {
                            const source = `/src/assets/frames/frame${frame.frameId}.png`;
                            return (
                                <div
                                    className="px-1 py-2 hover:bg-gray-100"
                                    key={frame.frameId}
                                    onClick={() => {
                                        selectImg(source);
                                    }}
                                >
                                    <img
                                        className="w-24 h-14 border rounded-md"
                                        src={source}
                                        alt=""
                                    />
                                    {/* <p>{frame.frameTitle}</p> */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
            break;
        case 2:
            sideBar = (
                <div className="w-full text-xl ">
                    <div className="w-full text-2xl">글꼴</div>
                    <p className="text-sm">글꼴 스타일</p>
                    <select name="font" className="w-full">
                        {fontList.map((font) => {
                            return (
                                <option
                                    key={font.fontId}
                                    value={font.fontFamily}
                                >
                                    {font.fontTitle}
                                </option>
                            );
                        })}
                        ;
                    </select>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm">글꼴 크기</p>
                            <div>
                                <button>-</button>
                                <input
                                    type="number"
                                    defaultValue={32}
                                    className="w-10"
                                ></input>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">글꼴 꾸미기</p>
                            <div>
                                <button className="font-bold">B</button>
                                <button className="italic">I</button>
                                <button>
                                    <u>U</u>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
            break;
        case 3:
            sideBar = (
                <div className="w-full flex justify-start text-xl ">
                    <p>BGM</p>
                </div>
            );
            break;
    }

    /////////////////////////////////////////////openvidu이용 화상 공유/////////////////////////////////////////////

    ///////////////////////////////////////////////렌더링///////////////////////////////////////////////////////////
    return (
        <section className="relative section-top pt-16">
            <div className="h-20 w-full px-12 color-text-black flex justify-between items-center">
                <div className="flex items-center">
                    <span className="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                    <p className="text-3xl">studio1</p>
                    <div className="ml-20" />
                    <p>2024-01-14-02:12AM</p>
                </div>
                <a
                    href="/studiomain"
                    className="btn-cover color-bg-blue3 text-white"
                >
                    편집하기
                </a>
            </div>

            {/* 중앙 섹션 */}
            <div className="flex w-full editor-height">
                {/* 좌측부분 */}
                <div className="w-1/4 editor-height flex">
                    {/* 카테고리 */}
                    <div className="w-1/5 ">
                        <div
                            className={`h-28 bg-orange-100 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-200 ${
                                mode === 0 ? 'categori-selected' : ''
                            }`}
                            onClick={() => setMode(0)}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                movie_edit
                            </span>
                            <p className="font-bold">영상</p>
                        </div>
                        <div
                            className={`h-28 bg-orange-100 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-200 ${
                                mode === 1 ? 'categori-selected' : ''
                            }`}
                            onClick={() => setMode(1)}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                kid_star
                            </span>
                            <p className="font-bold">프레임</p>
                        </div>
                        <div
                            className={`h-28 bg-orange-100 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-200 ${
                                mode === 2 ? 'categori-selected' : ''
                            }`}
                            onClick={() => setMode(2)}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                <span className="material-symbols-outlined">
                                    title
                                </span>
                            </span>
                            <p className="font-bold">텍스트</p>
                        </div>
                        <div
                            className={`h-28 bg-orange-100 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-200 ${
                                mode === 3 ? 'categori-selected' : ''
                            }`}
                            onClick={() => setMode(3)}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                <span className="material-symbols-outlined">
                                    volume_up
                                </span>
                            </span>
                            <p className="font-bold">오디오</p>
                        </div>
                    </div>
                    {/* 카테고리 선택에 따라 */}
                    <div className="w-4/5 flex flex-col items-center p-6 overflow-y-scroll">
                        {sideBar}
                    </div>
                </div>
                {/* 우측부분 */}
                <div className="w-3/4 h-full editor-height bg-gray-50 flex flex-col justify-between">
                    <div className="w-full h-3/4 px-4 py-4 flex flex-col justify-center items-center">
                        <div className="movie-width flex justify-start items-center mt-0">
                            <p className="text-2xl">은쮸</p>
                        </div>
                        {/* 폰트 테스트 */}
                        <p>폰트 테스트</p>
                        <div className="relative w-full h-full flex flex-col justify-center items-center">
                            <img
                                className="bg-white border"
                                style={{ width: '640px', height: '400px' }}
                                src="/src/assets/images/nothumb.png"
                            />
                            <img
                                src={selectImgUrl}
                                className="absolute top-0 lef-0"
                                style={{ width: '640px', height: '400px' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="w-full h-1/4 bg-white border-2 flex justify-center items-center">
                        <div className="w-full flex items-center my-4">
                            <div className=" w-1/12 flex justify-center items-center">
                                <span className="material-symbols-outlined me-1 text-4xl">
                                    play_circle
                                </span>
                            </div>
                            <div className="w-11/12 flex items-center overflow-x-scroll">
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                                <div className="w-28 flex flex-col justify-center mx-2">
                                    <img
                                        className="w-28"
                                        src="/src/assets/images/nothumb.png"
                                        alt=""
                                    />
                                    <p>선재</p>
                                    <input
                                        className="w-28"
                                        type="range"
                                        min={1}
                                        max={100}
                                        defaultValue={50}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
