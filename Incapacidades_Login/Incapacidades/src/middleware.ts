import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerClient } from "@/lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
    const { request, redirect } = context;
    const url = new URL(request.url);
    
    // Crear cliente de Supabase
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);
    
    // Verificar autenticación
    const { data: { session }, error } = await supabase.auth.getSession();
    
    // Rutas protegidas (requieren autenticación)
    const protectedRoutes = ['/inicio', '/dashboard'];
    
    // Rutas de autenticación (no deben ser accesibles si ya está logueado)
    const authRoutes = ['/', '/login', '/registrate'];
    
    const isProtectedRoute = protectedRoutes.some(route => 
        url.pathname.startsWith(route)
    );
    
    const isAuthRoute = authRoutes.includes(url.pathname);
    
    // Si está en una ruta protegida sin sesión, redirigir al login
    if (isProtectedRoute && !session) {
        return redirect('/');
    }
    
    // Si está en una ruta de auth con sesión activa, redirigir a inicio
    if (isAuthRoute && session) {
        return redirect('/inicio');
    }
    
    return next();
});