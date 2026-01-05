import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Partial<Tables<"projects">> & { id: string }) => {
      const { id, ...rest } = values;

      const { error } = await supabase
        .from("projects")
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "highlighted"] });
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
