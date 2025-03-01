import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/core/Button";
import { useLogin } from "../../services/users";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormType = z.infer<typeof schema>;

type Props = {
  onSuccess: () => void;
};

export default function LoginForm({ onSuccess }: Props) {
  const { errorMessage, mutate, isPending } = useLogin();

  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="mx-auto max-w-lg space-y-4 p-4">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
          />
          {formState.errors.email?.message || (
            <div className="text-sm text-red-500">
              {formState.errors.email?.message}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            {...register("password")}
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
          />
          {formState.errors.password?.message && (
            <div className="text-sm text-red-500">
              {formState.errors.password?.message}
            </div>
          )}
        </div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
        <Button
          type="submit"
          className="flex w-full justify-center"
          loading={isPending}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
