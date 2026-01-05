import { supabase } from "@/integrations/supabase/client";

interface UploadImageParams {
  bucket?: string;
  pathPrefix: string;
  file: File;
}

interface UploadImageResult {
  url: string | null;
  error: string | null;
}

/**
 * Faz upload de uma imagem para o Supabase Storage e retorna a URL pública.
 */
export async function uploadImage({ bucket = "public-assets", pathPrefix, file }: UploadImageParams): Promise<UploadImageResult> {
  try {
    const safePrefix = pathPrefix.replace(/^\/+|\/+$/g, "");
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() ?? "jpg";
    const fileName = `${timestamp}-${Math.random().toString(36).slice(2)}.${extension}`;
    const fullPath = `${safePrefix}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fullPath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError);
      return { url: null, error: "Falha ao enviar a imagem. Tente novamente." };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fullPath);
    return { url: data.publicUrl ?? null, error: null };
  } catch (err) {
    console.error("Erro inesperado ao fazer upload da imagem:", err);
    return { url: null, error: "Erro inesperado ao enviar a imagem." };
  }
}
