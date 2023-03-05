import Input from '@/components/input';
import Layout from '@/components/layout/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IEditProfileForm {
  name?: string;
  about?: string;
  formErrors?: string;
}

interface IEditProfileResponse {
  ok: boolean;
}

export default function Edit() {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<IEditProfileForm>();
  const [editProfile, { loading }] =
    useMutation<IEditProfileResponse>(`/api/users/me`, 'PUT');

  useEffect(() => {
    setValue('name', user?.name!);
    setValue('about', user?.about!);
  }, [setValue, user]);

  const onValid = ({ name, about }: IEditProfileForm) => {
    if (loading) return;
    if (name === '' || about === '') {
      return setError('formErrors', {
        message: '빈 칸을 채워주세요.',
      });
    }
    editProfile({ name, about });
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-modal px-4 py-8">
          <h4>내 정보 수정</h4>
          <form className="py-10" onSubmit={handleSubmit(onValid)}>
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 rounded-full bg-slate-500" />
              <label
                htmlFor="picture"
                className="cursor-pointer rounded-md border border-indigo-500 py-2 px-3 text-sm font-medium text-indigo-500 shadow-sm hover:bg-indigo-100"
              >
                이미지 설정
                <input
                  id="picture"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="mt-6 space-y-6">
              <div className="space-x-5">
                <span>이메일</span>
                <span>{user?.email}</span>
              </div>
              <Input
                register={register('name')}
                required={false}
                label="이름 수정"
                name="name"
                type="text"
                kind="text"
              />
              <Input
                register={register('about')}
                required={false}
                label="소개글 수정"
                name="about"
                type="text"
                kind="text"
              />
            </div>
            {errors.formErrors ? (
              <div className="my-2 flex justify-between">
                <span className="font-medium text-red-500">
                  {errors.formErrors.message}
                </span>

                <button
                  className="flex rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700"
                  onClick={() => clearErrors('formErrors')}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="mr-1 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    ></path>
                  </svg>{' '}
                  다시 시도
                </button>
              </div>
            ) : null}
            <button className="mt-12 rounded bg-indigo-500 px-8 py-4 text-base hover:bg-indigo-700">
              {loading ? '수정하는 중' : '프로필 수정하기'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
