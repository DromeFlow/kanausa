import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const useAboutSections = () => {
  return useQuery<Tables<"about_sections">[]>({
    queryKey: ["about_sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_sections").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });
};
