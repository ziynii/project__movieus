import Link from 'next/link';
import React from 'react';

interface IList {
  link: string;
  value: string;
}

interface ITabListProps {
  list: IList[];
  item: string;
  page: string;
}

export default function TabList({ list, item, page }: ITabListProps) {
  return (
    <div>
      <ul className="flex justify-between ">
        {list &&
          list.map((tab, i) => (
            <li
              className={
                (item === tab.value
                  ? 'border-indigo-500 font-bold'
                  : 'border-gray-900') +
                ' h-14 w-full cursor-pointer border-b-2 text-sm md:text-lg text-indigo-500'
              }
              key={i}
            >
              <Link
                href={`/${page}/${tab.link}`}
                className="flex h-full w-full items-center justify-center"
              >
                {tab.value}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
