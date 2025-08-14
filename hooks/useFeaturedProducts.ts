import getProducts from "@/actions/getProducts";
import { useQuery } from "@tanstack/react-query";

export const useFeaturedProducts = () => {
  const { data, status } = useQuery({
    queryFn: () => getProducts({ isFeatured: true, isArchived: false }),
    queryKey: ["featured"],
  });

  return { featuredProducts: data?.products || [], status };
};
