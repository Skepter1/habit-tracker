import { AuthProvider, useAuth } from "@/lib/authContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if (!initialized) return;

    if (!session) {
      router.replace("/auth");
    }
  }, [session, initialized]);
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
