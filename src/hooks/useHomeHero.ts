import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateHomeHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Partial<Tables<"home_hero"> & { id?: string }>) => {
      const { id, ...rest } = values;

      if (id) {
        const { error } = await supabase
          .from("home_hero")
          .update({ ...rest, updated_at: new Date().toISOString() })
          .eq("id", id);

        if (error) throw error;
        return;
      }

      const { error } = await supabase
        .from("home_hero")
        .insert({ ...rest, updated_at: new Date().toISOString() });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home_hero"] });
    },
  });
};
