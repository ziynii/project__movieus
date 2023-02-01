import Link from 'next/link';
import React from 'react';

interface IList {
  link: string;
  value: string;
}

interface ITabListProps {
  list: IList[];
  item: string;
}

export default function TabList({ list, item }: ITabListProps) {
  console.log(list);
  return (
    <div className="mt-12">
      <ul className="flex justify-between ">
        {list &&
          list.map((tab, i) => (
            <li
              className={
                (item === tab.value
                  ? 'border-indigo-500 font-bold'
                  : 'border-gray-900') +
                ' h-14 w-full cursor-pointer border-b-2  text-sm'
              }
              key={i}
            >
              <Link
                href={`/movie/${tab.link}`}
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
