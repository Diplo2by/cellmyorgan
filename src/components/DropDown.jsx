import React, { useState } from 'react';
import Link from 'next/link';
import useComponentVisible from "../hooks/useComponentVisible";

const DropDown = ({ options }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const toggle = () => {
        setIsComponentVisible(!isComponentVisible);
    }

    return (
      <>
        <div className="flex justify-center items-center" ref={ref}>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggle}
                className="inline-flex w-full justify-center gap-x-1.5 rounded bg-[#4b42f5] hover:bg-[#009AF3] text-[#f4f7fb] px-3 py-2 text-lg font-extrabold duration-200"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Options
                <svg
                  className="-mr-1 h-5 w-5"
                  viewBox="0 0 15 15"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {isComponentVisible && (
              <div
                className="fadeIn absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#fffaff] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {options &&
                    options.map((option, i) => (
                      <Link
                        key={i}
                        href={option.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                        role="menuitem"
                      >
                        {option.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
};

export default DropDown;