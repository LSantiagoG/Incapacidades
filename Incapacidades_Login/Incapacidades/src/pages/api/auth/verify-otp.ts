import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase";

interface VerifyOTPRequest {
    email: string;
    token: string;
    type: 'email' | 'sms';
}

export const POST: APIRoute = async ({ request }) => {
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);

    try {
        const body: VerifyOTPRequest = await request.json();
        const { email, token, type } = body || {};

        if (!email || !token || !type) {
            return new Response(JSON.stringify({ 
                error: 'Email, token y tipo son requeridos' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Verificar el OTP
        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: token,
            type: 'email'
        });

        if (error) {
            console.error('Error verificando OTP:', error);
            return new Response(JSON.stringify({ 
                error: 'Código de verificación inválido o expirado' 
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
            session: data.session,
            redirectTo: '/inicio'
        }), {
            status: 200,
            headers: responseHeaders
        });

    } catch (error) {
        console.error('Error en verify-otp:', error);
        return new Response(JSON.stringify({ 
            error: 'Error interno del servidor' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};