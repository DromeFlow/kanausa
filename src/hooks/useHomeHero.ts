import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const useHomeHero = () => {
  return useQuery<{ data: Tables<"home_hero"> | null }>({
    queryKey: ["home_hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_hero")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return { data };
    },
  });
};
