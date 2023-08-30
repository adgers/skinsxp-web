import { getHostListUsingGET } from '@/services/front/duizhanxiangguan';
import { getBoxListUsingGET } from '@/services/front/kaixiangxiangguan';
import { history, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import BattleItem from './battleItem';

export default function Case() {
    const [realBoxList, setRealBoxList] = useState<API.BoxThemeListVo[]>([]);
    const { data: boxList } = useRequest(() =>
        getBoxListUsingGET({
            boxType: 1,
            moduleId: 5,
        }),
    );
    const { data: battleList } = useRequest(() => getHostListUsingGET());
    console.log(battleList, 'battleList');
    useEffect(() => {
        if (boxList?.length && battleList?.length) {
            let newBoxList = JSON.parse(JSON.stringify(boxList));
            newBoxList.splice(1, 0, { boxList: battleList });

            setRealBoxList(newBoxList);
        }
    }, [boxList, battleList]);
    console.log('realBoxList', realBoxList);
    return (
        <>
            {realBoxList?.map((t, i) => {
                if (i === 1) {
                    return (
                        <div className="px-4" key={i}>
                            <div className="relative mb-10 flex border-b border-light">
                                <div className="flex w-1/6 items-end sm:w-1/3"></div>
                                <div className="flex w-4/6 items-center sm:w-1/3">
                                    <h2
                                        className="row-start-1 row-end-1 -mb-px ml-auto mr-auto mt-10 border-b border-green px-6 pb-5 text-center text-base font-semibold uppercase text-white sm:text-lg lg:col-start-2 lg:col-end-2 lg:max-w-xs "
                                        style={{
                                            background:
                                                'var(--j-1, linear-gradient(0deg, rgba(54, 122, 46, 0.68) 0%, rgba(0, 0, 0, 0.00) 98.14%))',
                                        }}
                                    >
                                        <div className="flex h-7 items-center sm:h-8">
                                            Top battles
                                        </div>
                                    </h2>
                                </div>
                                <div className="flex w-1/6 items-end sm:w-1/3"></div>
                            </div>
                            <div className="relative flex h-full">
                                <div className="flex w-full snap-x snap-mandatory overflow-x-auto xl:grid xl:snap-none xl:grid-cols-4 opacity-100">
                                    {t?.boxList?.map((item, index) => {
                                        return <BattleItem data={item} key={index} index={index} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="px-4" key={i}>
                        <div className="relative mb-10 flex border-b border-light">
                            <div className="flex w-1/6 items-end sm:w-1/3"></div>
                            <div className="flex w-4/6 items-center sm:w-1/3">
                                <h2
                                    className="row-start-1 row-end-1 -mb-px ml-auto mr-auto mt-10 border-b-[3px] border-green px-7 pb-[20px] pt-[5px] text-center text-base font-semibold uppercase text-white sm:text-lg lg:col-start-2 lg:col-end-2 lg:max-w-xs "
                                    style={{
                                        background:
                                            ' var(--j-1, linear-gradient(0deg, rgba(54, 122, 46, 0.68) 0%, rgba(0, 0, 0, 0.00) 98.14%))',
                                    }}
                                >
                                    <div className="flex  items-center leading-[28px]">
                                        {t.themeName}
                                    </div>
                                </h2>
                            </div>
                            <div className="flex w-1/6 items-end sm:w-1/3"></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-16">
                            {t.boxList?.map((v, idx) => (
                                <div
                                    key={idx}
                                    className="w-full h-full bg-no-repeat bg-cover relative"
                                    onClick={() => {
                                        history.push(`/case/${v?.id}`);
                                    }}
                                >
                                    <img
                                        src={v?.boxImage}
                                        alt=""
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="w-full h-full absolute top-0 left-0">
                                        {/* <div className="absolute top-[1.5] left-[1.75] text-green">New !</div> */}
                                        <div className="absolute top-[20px] right-0 bg-white/[0.2] text-white px-2 py-1 font-num text-sm">
                                            ${v?.discount}
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm py-3 px-2">
                                            <div className="w-full text-white truncate text-center">
                                                {v?.boxName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
