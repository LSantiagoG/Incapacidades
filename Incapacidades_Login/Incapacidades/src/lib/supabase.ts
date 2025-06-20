import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';

// Cliente para el cliente (navegador)
export function createSupabaseBrowserClient() {
    return createBrowserClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    const cookieStore = document.cookie;
                    const cookies: Record<string, string> = {};

                    if (!cookieStore) return [];

                    return cookieStore.split('; ').map((cookie) => {
                        const [name, value] = cookie.split('=');
                        return { name, value };
                    });
                },
                setAll(cookies) {
                    cookies.forEach(({ name, value, options }) => {
                        if (!name || !value) return;

                        let cookieString = `${name}=${value}; `;
                        if (options?.domain) cookieString += `Domain=${options.domain}; `;
                        if (options?.path) cookieString += `Path=${options.path}; `;
                        if (options?.expires) cookieString += `Expires=${options.expires.toUTCString()}; `;
                        if (options?.secure) cookieString += 'Secure; ';
                        if (options?.sameSite) cookieString += `SameSite=${options.sameSite}; `;
                        document.cookie = cookieString;
                    });
                }
            },
        }
    );
}

// Cliente para el servidor (API routes, SSR)
export function createSupabaseServerClient(request: Request, response?: Response) {
    return createServerClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    const cookieHeader = request.headers.get('Cookie');
                    if (!cookieHeader) return [];

                    return cookieHeader.split('; ').map((cookie) => {
                        const [name, value] = cookie.split('=');
                        return { name, value };
                    });
                },
                setAll(cookies) {
                    if (!response) return;

                    cookies.forEach(({ name, value, options }) => {
                        if (!name) return;

                        const newCookie = value !== undefined
                            ? `${name}=${value}; ${options?.path ? `Path=${options.path}; ` : ''
                            }${options?.domain ? `Domain=${options.domain}; ` : ''}${options?.maxAge ? `Max-Age=${options.maxAge}; ` : ''
                            }${options?.expires ? `Expires=${options.expires.toUTCString()}; ` : ''}${options?.secure ? 'Secure; ' : ''
                            }${options?.httpOnly ? 'HttpOnly; ' : ''}${options?.sameSite ? `SameSite=${options.sameSite};` : ''
                            }`
                            : `${name}=; Path=${options?.path ?? '/'}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${options?.domain ? `Domain=${options.domain}; ` : ''
                            }${options?.secure ? 'Secure; ' : ''}${options?.httpOnly ? 'HttpOnly; ' : ''}${options?.sameSite ? `SameSite=${options.sameSite};` : ''
                            }`;

                        const existingCookies = response.headers.get('Set-Cookie') ?? '';
                        const updatedCookies = [existingCookies, newCookie].filter(Boolean).join(', ');
                        response.headers.set('Set-Cookie', updatedCookies);
                    });
                }
            },
        }
    );
}

// Cliente predeterminado para uso general (se adapta al entorno)
export const supabase = typeof window !== 'undefined'
    ? createSupabaseBrowserClient()
    : null;