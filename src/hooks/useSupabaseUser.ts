import { useQuery } from "@tanstack/react-query";

const useSupabaseUser = () => {
  return useQuery({
    queryKey: ["supabase-user"],
    queryFn: async () => {
      return null;
    },
  });
};

export default useSupabaseUser;
