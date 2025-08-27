import { resetPassword } from "@/app/auth/actions";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { ResetPasswordFormSchema } from "@/schemas/auth";
import { isEmpty } from "@/utils/helpers";
import { LockPassword } from "@/utils/icons";
import { addToast, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const AuthResetPasswordForm: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isEmpty(data.captchaToken)) {
      setIsVerifying(true);
      return;
    }

    const error = await resetPassword(data);

    if (error) {
      setValue("captchaToken", undefined);
      setIsVerifying(false);
    }

    return addToast({
      title: error ? "Reset password failed" : "Password reset successful",
      color: error ? "danger" : "success",
      description: error?.message,
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
    if (isSubmitting) return "Resetting Password...";
    if (isVerifying) return "Verifying...";
    return "Reset Password";
  }, [isSubmitting, isVerifying]);

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <p className="mb-4 text-center text-small text-foreground-500">
        Please enter your new password to continue your streaming journey
      </p>
      <PasswordInput
        withStrengthMeter
        {...register("password")}
        value={watch("password")}
        isInvalid={!!errors.password?.message}
        errorMessage={errors.password?.message}
        isRequired
        variant="underlined"
        label="New Password"
        placeholder="Enter your new password"
        startContent={<LockPassword className="text-xl" />}
      />
      <PasswordInput
        {...register("confirm")}
        isInvalid={!!errors.confirm?.message}
        errorMessage={errors.confirm?.message}
        isRequired
        variant="underlined"
        label="Confirm Password"
        placeholder="Confirm your new password"
        startContent={<LockPassword className="text-xl" />}
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
  );
};

export default AuthResetPasswordForm;
