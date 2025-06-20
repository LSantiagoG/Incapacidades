import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.FRONTEND_URL}/reset-password`
  });

  if (error) {
    console.error("❌ Error enviando recuperación:", error.message);
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
