import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { getProfile, ApiError, type User } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProfilePage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getProfile(token)
      .then(setProfile)
      .catch(async (err) => {
        if (err instanceof ApiError) {
          // El backend rechazó el token (expirado o revocado): cerramos
          // la sesión local en vez de dejar al usuario varado en /profile.
          await logout();
          navigate("/login", { replace: true });
          return;
        }
        setError("No pudimos cargar tu perfil.");
      });
  }, [token, logout, navigate]);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Tu perfil</CardTitle>
          <CardDescription>
            Datos obtenidos de la cuenta autenticada.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {profile ? (
            <div className="flex flex-col gap-1 text-sm">
              <p>
                <span className="text-muted-foreground">Nombre: </span>
                {profile.fullName ?? "—"}
              </p>
              <p>
                <span className="text-muted-foreground">Email: </span>
                {profile.email}
              </p>
              <p>
                <span className="text-muted-foreground">Iniciales: </span>
                {profile.initials}
              </p>
            </div>
          ) : (
            !error && (
              <p className="text-sm text-muted-foreground">
                Cargando perfil...
              </p>
            )
          )}
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
