import Input from '@/components/input';
import Loading from '@/components/loading';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IEmailForm {
  email: string;
}

interface ITokenForm {
  token: string;
}

export interface IMutationResponse {
  ok: boolean;
}

export default function Login() {
  const user = useUser();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [login, { loading: loginLoading, data: loginData, error: loginError }] =
    useMutation<IMutationResponse>('/api/users/login');
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IMutationResponse>('/api/users/confirm');
  const { register: emailRegister, handleSubmit: emailHandleSubmit } =
    useForm<IEmailForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<ITokenForm>();

  const onEmailValid = (data: IEmailForm) => {
    if (loginLoading) return;
    login(data);
  };
  const onTokenValid = (data: ITokenForm) => {
    if (tokenLoading) return;
    confirmToken(data);
  };

  useEffect(() => {
    if (loginData?.ok === true) {
      setDisabled(true);
    }
  }, [loginData]);

  useEffect(() => {
    if (tokenData?.ok) {
      router.push('/');
    }
    if (tokenData?.ok === false) {
      setCorrect(true);
    }
  }, [tokenData, router]);

  useEffect(() => {
    if (user && user.user !== null && user.user !== undefined) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr  from-gray-900 to-indigo-900">
      <div className="flex flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-80 p-12">
        <div>
          <Image src="/logo.svg" alt="logo" width={256} height={72} />
        </div>
        <p className="mt-6 text-2xl font-bold">LOGIN</p>

        <form
          onSubmit={emailHandleSubmit(onEmailValid)}
          className="mt-6 flex w-full flex-col"
        >
          <div className="flex items-end">
            <Input
              register={emailRegister('email', {
                required: true,
              })}
              name="email"
              type="email"
              label="이메일"
              kind="email"
              placeholder="이메일을 입력해주세요"
              required
              disabled={disabled}
            />

            <button
              type="submit"
              disabled={disabled}
              className="ml-2 flex h-12 w-20 items-center justify-center rounded bg-white text-indigo-500 disabled:opacity-70 hover:bg-indigo-50 disabled:hover:bg-white"
            >
              {loginLoading ? (
                <Loading />
              ) : (
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
              )}
            </button>
          </div>
        </form>

        <form
          onSubmit={tokenHandleSubmit(onTokenValid)}
          className="mt-4 flex w-full flex-col items-center"
        >
          <div className="flex w-full flex-col">
            <Input
              register={tokenRegister('token', {
                required: true,
              })}
              name="token"
              type="text"
              label="인증번호"
              kind="text"
              placeholder="메일로 발송된 인증번호를 입력해주세요"
              required
            />
            {correct && (
              <p className="mt-2 text-xs text-red-400">
                잘못된 인증번호입니다. 다시 입력해주세요
              </p>
            )}
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
