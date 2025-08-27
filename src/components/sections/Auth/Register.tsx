import { signUp } from "@/app/auth/actions";
import { Google, LockPassword, Mail, User } from "@/utils/icons";
import { addToast, Button, Divider, Input, Link } from "@heroui/react";
import { AuthFormProps } from "./Forms";
import { RegisterFormSchema } from "@/schemas/auth";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useState } from "react";
import { isEmpty } from "@/utils/helpers";

const AuthRegisterForm: React.FC<AuthFormProps> = ({ setForm }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isEmpty(data.captchaToken)) {
      setIsVerifying(true);
      return;
    }

    const error = await signUp(data);

    if (error) {
      setValue("captchaToken", undefined);
      setIsVerifying(false);
    }

    return addToast({
      title: error ? "Registration failed" : "Registration successful",
      description: error ? error?.message : "Please check your email to verify your account",
      color: error ? "danger" : "success",
      timeout: error ? undefined : Infinity,
    });
  });

  const onCaptchaSuccess = useCallback(
    (token: string) => {
      setValue("captchaToken", token);
      setIsVerifying(false);
      onSubmit();
    },
    [setValue, setIsVerifying, onSubmit],
  );

  const getButtonText = useCallback(() => {
    if (isSubmitting) return "Signing Up...";
    if (isVerifying) return "Verifying...";
    return "Sign Up";
  }, [isSubmitting, isVerifying]);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <p className="mb-4 text-center text-small text-foreground-500">
          Join to track your favorites and watch history
        </p>
        <Input
          {...register("username")}
          isInvalid={!!errors.username?.message}
          errorMessage={errors.username?.message}
          isRequired
          label="Username"
          placeholder="Enter your username"
          variant="underlined"
          startContent={<User className="text-xl" />}
          isDisabled={isSubmitting || isVerifying}
        />
        <Input
          {...register("email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
          isRequired
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          variant="underlined"
          startContent={<Mail className="text-xl" />}
          isDisabled={isSubmitting || isVerifying}
        />
        <PasswordInput
          withStrengthMeter
          value={watch("password")}
          {...register("password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          isRequired
          variant="underlined"
          label="Password"
          placeholder="Enter your password"
          startContent={<LockPassword className="text-xl" />}
          isDisabled={isSubmitting || isVerifying}
        />
        <PasswordInput
          {...register("confirm")}
          isInvalid={!!errors.confirm?.message}
          errorMessage={errors.confirm?.message}
          isRequired
          variant="underlined"
          label="Confirm Password"
          placeholder="Confirm your password"
          startContent={<LockPassword className="text-xl" />}
          isDisabled={isSubmitting || isVerifying}
        />
        {isVerifying && (
          <Turnstile
            className="flex justify-center"
            siteKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
            onSuccess={onCaptchaSuccess}
          />
        )}
        <Button
          className="mt-3 w-full"
          color="primary"
          type="submit"
          variant="shadow"
          isLoading={isSubmitting || isVerifying}
        >
          {getButtonText()}
        </Button>
      </form>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <Button
        startContent={<Google width={24} />}
        variant="faded"
        isDisabled={isSubmitting || isVerifying}
      >
        Continue with Google
      </Button>
      <p className="text-center text-small">
        Already have an account?
        <Link
          isBlock
          onClick={() => setForm("login")}
          size="sm"
          className="cursor-pointer"
          isDisabled={isSubmitting || isVerifying}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default AuthRegisterForm;
