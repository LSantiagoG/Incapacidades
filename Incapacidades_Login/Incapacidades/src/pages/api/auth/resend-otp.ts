import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase";

interface ResendOTPRequest {
    email: string;
}

export const POST: APIRoute = async ({ request }) => {
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);

    try {
        const body: ResendOTPRequest = await request.json();
        const { email } = body || {};

        if (!email) {
            return new Response(JSON.stringify({ 
                error: 'Email es requerido' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Reenviar OTP
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: false
            }
        });

        if (error) {
            console.error('Error reenviando OTP:', error);
            return new Response(JSON.stringify({ 
                error: 'Error reenviando código de verificación' 
            }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ 
            success: true,
            message: 'Código OTP reenviado exitosamente'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error en resend-otp:', error);
        return new Response(JSON.stringify({ 
            error: 'Error interno del servidor' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};