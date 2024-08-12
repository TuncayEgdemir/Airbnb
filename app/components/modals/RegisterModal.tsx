"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

;
  

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success('Success')
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toogle= useCallback(()=> {
    registerModal.onClose()
    loginModal.onOpen()
  },[loginModal , registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcone to Airbnb" subtitle="Create an account!" />
      <Input
        register={register}
        id="email"
        label="email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="name"
        label="name"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        required
        type="password"
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=>signIn('google')}/>
        <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=>signIn('github')}/>
        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="flex flex-row  justify-center items-center gap-2 ">
            <div>
             Already have an account ?
            </div>
            <div
              onClick={toogle}
            className="text-neutral-800 cursor-pointer hover:underline">
              Log in
            </div>
          </div>
        </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      body={bodyContent}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
