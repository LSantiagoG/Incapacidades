import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // Preparar headers de respuesta para limpiar cookies
    const responseHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    
    // Transferir las cookies de limpieza
    const setCookieHeader = response.headers.get('Set-Cookie');
    if (setCookieHeader) {
        responseHeaders.set('Set-Cookie', setCookieHeader);
    }
    
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: responseHeaders
    });
};