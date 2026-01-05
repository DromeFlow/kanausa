import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const useProjects = () => {
  return useQuery<Tables<"projects">[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("year", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useHighlightedProjects = () => {
  return useQuery<Tables<"projects">[]>({
    queryKey: ["projects", "highlighted"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("highlight", true)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
};
