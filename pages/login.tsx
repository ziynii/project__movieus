import Image from 'next/image';
import React from 'react';

export default function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr  from-gray-900 to-indigo-900">
      <div className="flex flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-80 p-12">
        <div>
          <Image src="/logo.svg" alt="logo" width={256} height={72} />
        </div>
        <p className="mt-6 text-2xl font-bold">LOGIN</p>
        <form className="mt-6 flex w-full flex-col">
          <label htmlFor="email">이메일</label>
          <div className="mt-2 flex">
            <input
              id="email"
              required={true}
              placeholder="이메일을 입력해주세요"
              className=" flex-grow rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
            <button className="ml-2 flex h-12 w-20 hover:bg-indigo-50 items-center justify-center rounded bg-white text-indigo-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        <form className="mt-4 flex w-full flex-col items-center">
          <div className="flex w-full flex-col">
            <label htmlFor="token">인증번호</label>
            <input
              id="token"
              required={true}
              placeholder="메일로 발송된 인증번호를 입력해주세요"
              className="mt-2 flex-grow rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
          </div>
          <button className="mt-8 h-14 w-48 rounded-full bg-indigo-500 hover:bg-indigo-700 ">
            로그인
          </button>
        </form>
        <p className="mt-6 text-xs">
          MOVIEUS는 이메일을 이용한 일회성 로그인을 지원합니다
        </p>
      </div>
    </div>
  );
}
