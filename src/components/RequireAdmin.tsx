import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  const [checkingRole, setCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      if (!session?.user) {
        if (!isMounted) return;
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }

      setCheckingRole(true);

      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });

        if (!isMounted) return;

        if (error) {
          console.error("Erro ao verificar papel do usuário", error);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(Boolean(data));
      } finally {
        if (isMounted) {
          setCheckingRole(false);
        }
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [session]);

  if (loading || checkingRole) return null;

  if (!session) {
    return <Navigate to={`/auth?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
