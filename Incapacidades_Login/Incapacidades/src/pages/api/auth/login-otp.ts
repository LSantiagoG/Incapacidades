import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase";

interface LoginOTPRequest {
    email: string;
    password: string;
    remember?: boolean;
}

export const POST: APIRoute = async ({ request }) => {
    const response = new Response();
    const supabase = createSupabaseServerClient(request, response);

    try {
        const body: LoginOTPRequest = await request.json();
        const { email, password } = body || {};

        if (!email || !password) {
            return new Response(JSON.stringify({ 
                error: 'Email y contraseña son requeridos' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Primero verificamos las credenciales sin hacer login completo
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) {
            return new Response(JSON.stringify({ 
                error: 'Credenciales inválidas' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Si las credenciales son válidas, cerramos la sesión temporal
        await supabase.auth.signOut();

        // Ahora enviamos el OTP por email
        const { data: otpData, error: otpError } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                // El usuario podrá ingresar solo después de verificar el OTP
                shouldCreateUser: false
            }
        });

        if (otpError) {
            console.error('Error enviando OTP:', otpError);
            return new Response(JSON.stringify({ 
                error: 'Error enviando código de verificación' 
            }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ 
            success: true,
            message: 'Código OTP enviado exitosamente'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error en login-otp:', error);
        return new Response(JSON.stringify({ 
            error: 'Error interno del servidor' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};