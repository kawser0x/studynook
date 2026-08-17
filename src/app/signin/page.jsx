"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FaEnvelope,
  FaLock,
  FaBookOpen,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Email/Password Login
  const onSubmit = async (data) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Welcome back!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid credentials");
        },
      },
    );
  };

  // Google Social Login
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md border border-base-300 bg-base-200/50 shadow-xl backdrop-blur-sm">
        <div className="card-body p-6 sm:p-8">
          {/* Header & Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl text-white shadow-md shadow-primary/30 mb-3">
              <FaBookOpen />
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-base-content">
              Welcome back to <span className="text-primary">StudyNook</span>
            </h2>
            <p className="mt-1 text-xs text-base-content/70">
              Sign in to manage and book your study spaces
            </p>
          </div>

          {/* Social Sign-In */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full gap-2 border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 text-xs sm:text-sm font-medium">
              <FaGoogle className="text-error" /> Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="divider text-xs uppercase text-base-content/40 my-4">
            or sign in with email
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaEnvelope className="h-3.5 w-3.5" />
                </span>
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="mt-1 text-[11px] text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <div className="flex items-center justify-between">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    Password
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="link link-hover text-[11px] text-primary">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaLock className="h-3.5 w-3.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-base-content focus:outline-none">
                  {!showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="mt-1 text-[11px] text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-white shadow-md shadow-primary/20 hover:brightness-105">
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-base-content/70">
            Don't have an account?{" "}
            <Link href="/signup" className="link link-primary font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
