import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);

    // Obtener datos del request con manejo de errores
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: 'Datos de entrada inválidos' 
        }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { email, password } = body || {};

    if (!email || !password) {
        return new Response(JSON.stringify({ 
            error: 'Email y contraseña son requeridos' 
        }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        return new Response(JSON.stringify({ 
            error: error.message 
        }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Preparar headers de respuesta
    const responseHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    // Transferir cookies de autenticación
    const setCookieHeader = response.headers.get('Set-Cookie');
    if (setCookieHeader) {
        responseHeaders.set('Set-Cookie', setCookieHeader);
    }

    return new Response(JSON.stringify({ 
        success: true,
        user: data.user,
        redirectTo: '/inicio'
    }), {
        status: 200,
        headers: responseHeaders
    });
};