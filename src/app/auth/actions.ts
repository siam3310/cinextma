"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  ForgotPasswordFormInput,
  ForgotPasswordFormSchema,
  LoginFormInput,
  LoginFormSchema,
  RegisterFormInput,
  RegisterFormSchema,
  ResetPasswordFormInput,
  ResetPasswordFormSchema,
} from "@/schemas/auth";
import type { AuthError } from "@supabase/supabase-js";

type AuthResponse = Promise<AuthError | null>;

export const signIn = async (formData: LoginFormInput): AuthResponse => {
  const supabase = await createClient();

  const { data, error: parseError } = LoginFormSchema.safeParse(formData);

  if (!data) return { message: parseError.message } as AuthError;

  if (!data.captchaToken) {
    return { message: "Captcha is required" } as AuthError;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.loginPassword,
    options: {
      captchaToken: data.captchaToken,
    },
  });

  if (error) return error;

  revalidatePath("/", "layout");
  return redirect("/");
};

export const signUp = async (formData: RegisterFormInput): AuthResponse => {
  const supabase = await createClient();

  const { data, error: parseError } = RegisterFormSchema.safeParse(formData);

  if (!data) return { message: parseError.message } as AuthError;

  if (!data.captchaToken) {
    return { message: "Captcha is required" } as AuthError;
  }

  // Check username availability
  const { data: usernameExists, error: usernameError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", data.username)
    .maybeSingle();

  console.log({ usernameExists, usernameError });

  if (usernameExists) {
    return { message: "Username already taken" } as AuthError;
  }

  // Insert user account data
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      captchaToken: data.captchaToken,
    },
  });

  if (error) return error;

  // Insert username
  if (user) {
    const userId = user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: userId, username: data.username }]);

    if (profileError) throw profileError;
  }

  return null;
};

export const signOut = async (): AuthResponse => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return error;

  revalidatePath("/", "layout");
  return redirect("/auth");
};

export const sendResetPasswordEmail = async (formData: ForgotPasswordFormInput): AuthResponse => {
  const supabase = await createClient();

  const { data, error: parseError } = ForgotPasswordFormSchema.safeParse(formData);

  if (!data) return { message: parseError.message } as AuthError;

  if (!data.captchaToken) {
    return { message: "Captcha is required" } as AuthError;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    captchaToken: data.captchaToken,
  });

  if (error) return error;

  return null;
};

export const resetPassword = async (formData: ResetPasswordFormInput): AuthResponse => {
  const supabase = await createClient();

  const { data, error: parseError } = ResetPasswordFormSchema.safeParse(formData);

  if (!data) return { message: parseError.message } as AuthError;

  if (!data.captchaToken) {
    return { message: "Captcha is required" } as AuthError;
  }

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) return error;

  revalidatePath("/", "layout");
  return redirect("/");
};
