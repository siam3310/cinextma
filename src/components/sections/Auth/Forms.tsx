'use client';

import { addToast, Card, CardBody, CardHeader } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useEffect } from 'react';

import Brand from '@/components/ui/other/BrandLogo';
import { SpacingClasses } from '@/utils/constants';
import { cn } from '@/utils/helpers';

import AuthForgotPasswordForm from './ForgotPassword';
import AuthLoginForm from './Login';
import AuthRegisterForm from './Register';
import AuthResetPasswordForm from './ResetPassword';

const ValidForms = ['login', 'register', 'forgot'] as const;

export interface AuthFormProps {
  setForm: (form: (typeof ValidForms)[number]) => void;
}

const AuthForms: React.FC = () => {
  const pathname = usePathname();
  const reset = pathname === '/auth/reset-password';

  const [error, setError] = useQueryState('error', parseAsBoolean.withDefault(false));
  const [form, setForm] = useQueryState(
    'form',
    parseAsStringLiteral(ValidForms).withDefault('login'),
  );

  useEffect(() => {
    if (error) {
      addToast({
        title: 'An error occurred. Please try again.',
        color: 'danger',
      });
      setError(null);
    }
  }, [error, setError]);

  return (
    <div
      className={cn(
        'relative z-50 flex h-screen w-screen flex-col items-center justify-center overflow-hidden',
        SpacingClasses.reset,
      )}
    >
      <div className="pointer-events-none relative z-50 mx-auto flex w-full max-w-lg flex-col items-center justify-center p-3">
        <Card
          shadow="lg"
          className="border-foreground-200 bg-background/70 dark:bg-background/80 pointer-events-auto w-full border-2 p-1 backdrop-blur-md md:p-3"
        >
          <CardHeader className="relative flex items-center justify-center">
            <Brand className="text-3xl md:text-4xl" animate />
          </CardHeader>

          <CardBody>
            {reset ? (
              <AuthResetPasswordForm />
            ) : (
              {
                login: <AuthLoginForm setForm={setForm} />,
                register: <AuthRegisterForm setForm={setForm} />,
                forgot: <AuthForgotPasswordForm setForm={setForm} />,
              }[form]
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AuthForms;
