import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

interface UpdateSiteSettingsPayload extends Partial<Tables<"site_settings">> {
  id?: string;
}

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateSiteSettingsPayload) => {
      const { id, ...rest } = payload;
      if (!id) throw new Error("ID das configurações do site não informado");

      const { data, error } = await supabase
        .from("site_settings")
        .update({ ...rest })
        .eq("id", id)
        .select("*")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
    },
  });
};
