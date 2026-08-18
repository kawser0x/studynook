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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.exec(value))
      return "Password must contain at least one uppercase letter (A-Z)";
    if (!/[a-z]/.exec(value))
      return "Password must contain at least one lowercase letter (a-z)";
    return true;
  };

  const onSubmit = async (data) => {
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          image: data.image,
        },
        {
          onSuccess: async () => {
            toast.success("Registration successful! Please login.");
            // Set JWT cookie on server as well
            try {
              const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
              if (backendUrl) {
                await fetch(`${backendUrl}/jwt`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: data.email,
                    userId: data.email,
                  }),
                });
              }
            } catch (e) {
              console.error("JWT sync error:", e);
            }
            router.push("/login");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Registration failed. Please try again."
            );
          },
        }
      );
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign up failed");
    }
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
              <FaGoogle className="text-error" /> Continue with Google
            </button>
          </div>

          <div className="divider text-xs uppercase text-base-content/40 my-4">
            or sign up with email
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Full Name <span className="text-error">*</span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaUser className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", {
                    required: "Name is required",
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
                  Email Address <span className="text-error">*</span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaEnvelope className="h-3.5 w-3.5" />
                </span>
                <input
                  type="email"
                  placeholder="student@university.edu"
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
                  Photo URL <span className="text-error">*</span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                  <FaImage className="h-3.5 w-3.5" />
                </span>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  className={`input input-bordered input-sm sm:input-md w-full pl-9 ${
                    errors.image ? "input-error" : ""
                  }`}
                  {...register("image", {
                    required: "Photo URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Must be a valid image URL starting with http/https",
                    },
                  })}
                />
              </div>
              {errors.image && (
                <span className="mt-1 text-[11px] text-error">
                  {errors.image.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Password <span className="text-error">*</span>
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
                    validate: validatePassword,
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
                <span className="mt-1 text-[11px] text-error font-medium">
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
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-base-content/70">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpClient;
