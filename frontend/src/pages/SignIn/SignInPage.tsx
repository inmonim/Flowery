import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  //비회원 주문 Modal을 띄우기 위한 변수
  const [showModal, setShowModal] = useState<string>("");

  const navigate = useNavigate();

  // 로그인 시도
  const checkSignIn = () => {
    navigate("/reservation");
  };

  // 회원가입
  const goToSignUp = () => {
    navigate("/signup");
  };

  // 비회원주문
  const goToNonmember = () => {
    navigate("/nonmember");
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 flex items-center justify-center">
      <div className="container h-screen px-4 py-8 lg:p-10">
        <div className="g-6 flex h-full flex-wrap  justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={require("../../assets/logo.png")}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        시들지 않는 추억을 선물하세요
                      </h4>
                    </div>

                    <form>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300"
                          id="exampleFormControlInput1"
                          placeholder=" "
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="absolute cursor-text text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          아이디
                        </label>
                      </div>

                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  focus:border-neutral-300"
                          id="exampleFormControlInput11"
                          placeholder=" "
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="absolute cursor-text text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          비밀번호
                        </label>
                      </div>

                      <div className="mb-3 pb-1 pt-1 text-center">
                        <button
                          onClick={checkSignIn}
                          className="mb-3 inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-red-300 text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        >
                          로그인
                        </button>
                      </div>
                      <div className="flex">
                        <p
                          onClick={goToNonmember}
                          className="text-blue-600 text-sm ml-auto mb-3 mr-2 cursor-pointer"
                        >
                          비회원 주문
                        </p>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <div className="ml-auto">
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={goToSignUp}
                            className="inline-block items-center w-full rounded-2xl border-2 px-6 text-sm font-medium leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
                          >
                            회원가입
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <img
                  src={require("../../assets/example1.jpg")}
                  alt=""
                  className="hidden items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none lg:block"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
