interface AuthContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthContainer({
  title,
  subtitle,
  children,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-center text-gray-500">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>

      </div>

    </div>
  );
}