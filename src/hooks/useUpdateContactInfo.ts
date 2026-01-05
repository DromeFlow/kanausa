import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

interface UpdateContactPayload extends Partial<Tables<"contact_info">> {
  id?: string;
}

export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateContactPayload) => {
      const { id, ...rest } = payload;
      if (!id) throw new Error("ID do registro de contato não informado");

      const { data, error } = await supabase
        .from("contact_info")
        .update({ ...rest })
        .eq("id", id)
        .select("*")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_info"] });
    },
  });
};
