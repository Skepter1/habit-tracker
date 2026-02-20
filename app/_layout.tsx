import { Stack } from "expo-router";

// function RouteGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const isAuth = false;

//   useEffect(() => {
//     if (!isAuth) {
//       router.replace("/auth");
//     }
//   });
//   return <>{children}</>;
// }

export default function RootLayout() {
  return (
    //<RouteGuard>
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
    //</RouteGuard>
  );
}
