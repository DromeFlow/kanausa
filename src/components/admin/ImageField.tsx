import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { uploadImage } from "@/integrations/supabase/storage";
import { useToast } from "@/hooks/use-toast";

interface ImageFieldProps {
  label: string;
  description?: string;
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  bucketPathPrefix: string;
  disabled?: boolean;
}

export function ImageField({
  label,
  description,
  value,
  onChange,
  bucketPathPrefix,
  disabled,
}: ImageFieldProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const { url, error } = await uploadImage({ pathPrefix: bucketPathPrefix, file });
    setIsUploading(false);

    if (error || !url) {
      toast({
        title: "Erro ao enviar imagem",
        description: error ?? "Não foi possível enviar a imagem.",
      });
      return;
    }

    onChange(url);
    toast({
      title: "Imagem atualizada",
      description: "A nova imagem foi enviada com sucesso.",
    });
  };

  const handleClear = () => {
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      {description && <FormDescription>{description}</FormDescription>}

      {value ? (
        <div className="flex items-start gap-4 rounded-md border border-border bg-muted/40 p-3">
          <div className="relative h-24 w-32 overflow-hidden rounded-md bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Pré-visualização da imagem"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 text-xs text-muted-foreground">
            <span className="truncate break-all">{value}</span>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={disabled || isUploading}
                onClick={handleClear}
              >
                Remover imagem
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={disabled || isUploading}
                onClick={() => {
                  const input = document.getElementById("image-upload-hidden-input") as HTMLInputElement | null;
                  input?.click();
                }}
              >
                {isUploading ? "Enviando..." : "Trocar imagem"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Input
          id="image-upload-hidden-input"
          type="file"
          accept="image/*"
          disabled={disabled || isUploading}
          onChange={handleFileChange}
          className="max-w-xs cursor-pointer border-dashed file:mr-3 file:rounded-md file:border-none file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
        />
        <span className="text-xs text-muted-foreground">Envie arquivos JPG, PNG ou WEBP.</span>
      </div>

      <FormMessage />
    </div>
  );
}
