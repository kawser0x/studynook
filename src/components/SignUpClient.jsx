"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBookOpen,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaImage,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SignUpClient = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully! Welcome to StudyNook.");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Try again.");
        },
      },
    );
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md border border-base-300 bg-base-200/50 shadow-xl backdrop-blur-sm">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl text-white shadow-md shadow-primary/30 mb-3">
              <FaBookOpen />
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-base-content">
              Join <span className="text-primary">StudyNook</span>
            </h2>
            <p className="mt-1 text-xs text-base-content/70">
              Create an account to book and list private study spaces
            </p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="btn btn-outline w-full gap-2 border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 text-xs sm:text-sm font-medium">
              <FaGoogle className="text-error" /> Sign up with Google
            </button>
          </div>

          <div className="divider text-xs uppercase text-base-content/40 my-4">
            or sign up with email
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaUser className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <span className="mt-1 text-[11px] text-error">
                  {errors.name.message}
                </span>
              )}
            </div>

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

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Profile Photo URL{" "}
                  <span className="text-base-content/50 font-normal">
                    (Optional)
                  </span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaImage className="h-3.5 w-3.5" />
                </span>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input input-bordered input-sm sm:input-md w-full pl-9"
                  {...register("image")}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Password
                </span>
              </label>
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

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaLock className="h-3.5 w-3.5" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 pr-10 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-base-content focus:outline-none">
                  {!showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="mt-1 text-[11px] text-error">
                  {errors.confirmPassword.message}
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
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-base-content/70">
            Already have an account?{" "}
            <Link href="/signin" className="link link-primary font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpClient;
