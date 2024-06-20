import { Spinner } from "@/components/Elements";

export const LoaderComponent = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};
