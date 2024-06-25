import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Category } from "../types";

const query = `
  query  {
    categories {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export const getCategories = (): Promise<Category[]> => {
  return axios.post(`/graphql/`, { query });
};

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCategories = ({ config }: UseCategoriesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
