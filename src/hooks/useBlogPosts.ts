import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const useBlogPosts = () => {
  return useQuery<Tables<"blog_posts">[]>({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery<Tables<"blog_posts"> | null>({
    queryKey: ["blog_posts", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data ?? null;
    },
    enabled: !!slug,
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Partial<Tables<"blog_posts">> & { id: string }) => {
      const { id, ...rest } = values;

      const { error } = await supabase
        .from("blog_posts")
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    },
  });
};
