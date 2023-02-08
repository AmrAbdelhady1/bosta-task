import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {

  const [arrow, setArrow] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };


  const handleMouseLeave = () => {
    clicked ? setArrow(false) : setArrow(true);
  };


  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setClicked(false);
      setArrow(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [])

  return (
    <div className='bg-white flex justify-between items-center px-16 py-5 fixed top-0 right-0 left-0'>
      <Link href={'/'} className='inline-flex items-center gap-2'>
        <Image
          alt=''
          src={'/icon.png'}
          width={40}
          height={40}
          priority
        />
        <h1 className='text-2xl text-red-600 font-bold'>{t("about1")}</h1>
      </Link>

      {/* dropdown menu */}
      <div ref={dropdownRef} className="relative xl:inline-block text-left pr-20 hidden">
        <button
          className={`inline-flex  gap-1 items-end hover:text-red-600 font-medium text-lg  ${clicked ? `text-red-600` : `text-black`} `}
          onMouseEnter={() => setArrow(false)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setClicked(!clicked)}>
          {t("about2")}
          {arrow ? <RiArrowDownSLine className='text-gray-400' size={23} /> : <RiArrowRightSLine size={23} />}
        </button>
        <div className={`absolute rounded-md bg-white shadow-2xl ${clicked ? 'visible duration-500 ease-in-out' : 'hidden duration-500 ease-in-out'}`}>
          <div className='py-2 text-center px-2'>
            <a href="#" className='block px-2 py-2 text-sm hover:bg-gray-200'
              onClick={() => changeLanguage("en")}>{t("about11")}</a>
            <a href="#" className='block px-2 py-2 text-sm hover:bg-gray-200'
              onClick={() => changeLanguage("ar")}>{t("about12")}</a>
          </div>
        </div>
      </div>
      {/*  */}

      <div className=" text-[#475467] xl:hidden" onClick={() => setToggle(!toggle)}>
        {(toggle) ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={toggle ? 'xl:hidden fixed bg-white text-xl h-full w-full pt-6 pl-2 left-0 top-24 ease-in-out duration-500' : ' fixed left-[-100%]'}>
        <li className='p-4 border-b border-dotted border-gray-600 mx-4'>العربية</li>
      </ul>

    </div>
  )
}

export default Navbar