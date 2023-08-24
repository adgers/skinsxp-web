import { getBoxListUsingGET } from '@/services/front/kaixiangxiangguan';
import { useRequest,history } from '@umijs/max';

export default function Case() {
  const { data: boxList } = useRequest(() =>
    getBoxListUsingGET({
      boxType: 1,
      moduleId: 5,
    }),
  );
  console.log('boxList', boxList);
  return (
    <>
      {boxList?.map((t, i) => (
        <>
          <div className="relative mb-10 flex border-b border-light" key={i}>
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
                  {t.themeName}
                </div>
              </h2>
            </div>
            <div className="flex w-1/6 items-end sm:w-1/3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-16 px-4">
            {t.boxList?.map((v, idx) => (
              <div
                key={idx}
                // style={{ backgroundImage:`url(${v?.boxImage})`}}
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
                  <div className="absolute bottom-0 left-0 w-full flex justify-center items-center text-white text-base h-[60px] bg-black bg-opacity-50 backdrop-blur-[1px]">
                    {v?.boxName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </>
  );
}
