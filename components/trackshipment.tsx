import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'
import { MdOutlineError } from 'react-icons/md'
import moment from 'moment';
import 'moment/locale/ar';
import { useTranslation } from 'react-i18next'

interface CurrentStatus {
    state: string;
    timestamp: string;
}

interface Data {
    provider: string;
    CurrentStatus: CurrentStatus;
    PromisedDate: string;
    TrackingNumber: string;
}

const Trackshipment = () => {

    const [data, setData] = useState<Data | null>(null);;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trackid, setTrackId] = useState();
    const [trackid2, setTrackId2] = useState();
    const [date, setDate] = useState<string | null>(null);
    const [diffindays, setDiff] = useState(0);
    const [time, setTime] = useState("");
    const { t, i18n } = useTranslation();
    const txt: string = t("about4");
    const txt2: string = t("about16");

    const handleClick = () => {
        setLoading(true);
    };

    useEffect(() => {
        console.log(trackid);
        const fetchData = async () => {
            try {
                const response = await fetch('https://tracking.bosta.co/shipments/track/' + trackid);
                const data = await response.json();
                setData(data);
                setLoading(false);
                setError(null);
                setTrackId2(trackid);
                if (data) {
                    moment.locale(i18n.language === 'ar' ? 'ar' : 'en');
                    setDate(moment(data?.CurrentStatus.timestamp.substring(0, 24)).format("ddd, DD MMMM YYYY"));
                    setDiff(moment().locale('en').diff(moment(data?.CurrentStatus.timestamp.substring(0, 10)).locale('en').format("ddd, DD MMMM YYYY"), 'days'));
                    setTime(moment(data?.PromisedDate.substring(0, 24)).format("h:mm A"));
                }
            } catch (error: any) {
                setLoading(false);
                setTrackId2(trackid);
                setData(null);
                setError(error);
            }
        };

        if (trackid !== undefined)
            fetchData();

    }, [loading, i18n.language]);

    return (
        <div className='mt-36 items-center flex justify-center flex-col'>
            <h1 className='text-[#475467] font-semibold md:text-2xl block mb-[24px]'>{t("about3")}</h1>
            <div className='flex justify-center'>
                <input
                    onChange={(e: any) => setTrackId(e.target.value)}
                    type="text"
                    placeholder={txt}
                    className={`h-16 w-full md:w-[395px]  rounded-xl p-5 ${txt2 === 'ltr' ? 'border-r-0 rounded-r-none' : 'border-l-0 rounded-l-none'} border-[1px] border-[#e4e7ec] text-sm outline-none ease-in-out duration-500 focus:border-[#0098a5]`}
                />
                <button className={`rounded-xl ${txt2 === 'ltr' ? 'rounded-l-none' : 'rounded-r-none'} w-16 h-16 bg-[#e30613] flex justify-center items-center text-3xl text-white hover:scale-110`}
                    onClick={handleClick}
                >
                    <BsSearch />
                </button>
            </div>
            {loading ? <div>loading</div>
                : error ?
                    <div className='flex flex-col items-center mt-20 w-[50%] gap-4'>
                        <h1 className='text-base text-[#667085] font-semibold'>{t("about4")} {trackid2}</h1>
                        <div className='p-4 bg-[#fef3f2] border-[1px] border-[#fecdca] rounded flex items-baseline gap-3 text-[15px]'>
                            <span className='text-red-500'><MdOutlineError /></span>
                            <p>{t("about17")}</p>
                        </div>
                    </div>
                    : date &&
                    <div className='flex flex-col items-center mt-16 w-[70%]'>
                        <h1 className='text-base text-[#667085] font-semibold'>{t("about5")} {trackid2}</h1>
                        <h1 className='md:text-5xl text-4xl font-bold opacity-90'>{
                            data?.CurrentStatus.state !== "DELIVERED_TO_SENDER" ?
                                t("about6") : t("about13")}
                        </h1>
                        <div className='flex gap-1 mt-10 w-full justify-center'>
                            <button className='bg-[#0098a5] w-[50%] rounded-xl rounded-r-none h-[6px] md:w-[208px] cursor-default'></button>
                            <button className='bg-[#0098a5] h-[6px] w-[50%] md:w-[208px] cursor-default'></button>
                            <button
                                className={`${data?.CurrentStatus.state !== "DELIVERED_TO_SENDER" ? 'bg-opacity-100' : 'bg-opacity-20'} bg-[#0098a5] rounded-xl rounded-l-none h-[6px] w-[50%] md:w-[208px] cursor-default`}></button>
                        </div>
                        <h1 className='mt-9 md:text-lg font-semibold'>
                            {data?.CurrentStatus.state !== "DELIVERED_TO_SENDER" ?
                                t("about7") :
                                t("about14")}
                            <span className='text-[#0098a5]'> {date}</span></h1>
                        <p className='text-[#667085] mt-2 mb-8 text-sm border-b-[1px] border-b-gray-300 w-full text-center pb-8'>({t("about8") + " "}  {diffindays}  {" " + t("about8.5")}).</p>
                        <div className='flex flex-col w-full mb-6'>
                            <h1 className='mb-8 text-[#667085] text-sm uppercase'>{t("about9")}</h1>
                            <div className='flex gap-3 items-center'>
                                <h1 className='bg-[#d0d5dd] w-4 h-4 rounded-full'></h1>
                                <h1 className='text-[17px] font-semibold'>{date.substring(0, date.length - 5)}</h1>
                            </div>
                            <div className='flex gap-[20px] items-center'>
                                <h1 className={`bg-[#d0d5dd] w-[2px] h-[74px] ${txt2 === 'ltr' ? 'ml-[7px]' : 'mr-[7px]'}`}></h1>
                                <div className='flex flex-col rounded-lg border-[1px] border-[#e4e7ec] py-2 px-4 text-sm'>
                                    <h1>{data?.CurrentStatus.state !== "DELIVERED_TO_SENDER" ?
                                        t("about7") :
                                        t("about14")}</h1>
                                    <p className='text-[#667085]'>{time}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
        </div>
    )
}

export default Trackshipment