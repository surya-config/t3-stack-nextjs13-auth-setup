"use client";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { trpc } from "src/clients/trpc";
import Link from "next/link";
import { useAuthStore } from "src/store/auth";

interface RegisterFormData {
  email: string;
  password: string;
  role: "sales" | "admin";
}

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { mutate } = trpc.auth.registerUser.useMutation();
  const registerUser = useAuthStore((state: any) => state.register);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    // mutate(data, {
    //   onSuccess: () => {
    //     router.push("/");
    //   },
    //   onError: (error: unknown) => {
    //     console.error(error);
    //   },
    // });
    const { email, password, role = "sales" } = data;
    await registerUser(email, password, role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-2 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none  rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">Email is required</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none  rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  Password is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                required
                className="relative block w-full appearance-none  rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("role", { required: true })}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="sales">Sales</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-xs text-red-500">Role is required</p>
              )}
            </div>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 3.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L6.707 8.707a1 1 0 11-1.414-1.414l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
