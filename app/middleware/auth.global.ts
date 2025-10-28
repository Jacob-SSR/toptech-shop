export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user && to.path.startsWith("/admin") && to.path !== "/admin/login") {
    return navigateTo("/admin/login");
  }

  if (user && to.path === "/admin/login") {
    return navigateTo("/admin/list");
  }
});
