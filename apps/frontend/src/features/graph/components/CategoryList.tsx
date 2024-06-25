import { Spinner } from "@/components/Elements";

import { useCategories } from "../api";

export const CategoryList = () => {
  const categoriesQuery = useCategories();

  if (categoriesQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!categoriesQuery.data) return null;
  console.log(categoriesQuery.data.data.categories.edges);

  return (
    <>
      {categoriesQuery.data.data.categories.edges.map((data) => (
        <div>{data.node.name}</div>
      ))}
    </>
  );
};
