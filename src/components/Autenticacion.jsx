import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Autenticacion() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    // Si no hay sesión → Mostrar login Google con estilo Airbnb
    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-rose-500 mb-6 text-center">
                        Inicia sesión en Airbnb
                    </h1>
                    <Auth
                        supabaseClient={supabase}
                        providers={['google']}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#FF385C', // Rosa principal Airbnb
                                        brandAccent: '#E31C5F', // Hover/acento
                                        inputBackground: '#ffffff',
                                        inputText: '#000000',
                                        inputBorder: '#dddddd',
                                    },
                                    fonts: {
                                        bodyFontFamily:
                                            'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                                        buttonFontFamily:
                                            'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                                    },
                                    radii: {
                                        borderRadiusButton: '9999px', // Botones redondeados
                                        inputBorderRadius: '12px', // Inputs redondeados
                                    },
                                    borderWidths: {
                                        buttonBorderWidth: '1px',
                                        inputBorderWidth: '1px',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        );
    }

    // Si hay sesión → Mostrar perfil y botón de cerrar sesión
    return (
        <>
            <div className="flex items-center gap-3 rounded-xl shadow-md border border-gray-200 bg-white ">
                <Link
                    to="/"
                    className="text-2xl font-bold text-rose-500 hover:text-rose-600 transition"
                >
                    Airbnb
                </Link>
                <div className="flex flex-col w-80 items-center gap-4">
                    <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={session.user.user_metadata?.avatar_url}
                        alt="Foto de perfil"
                    />
                    <span className="font-medium">{session?.user?.email}</span>
                    <button
                        onClick={signOut}
                        className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    );
}

export default Autenticacion;
