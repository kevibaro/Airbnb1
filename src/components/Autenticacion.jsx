import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-md w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-rose-500 mb-6 text-center">
            Inicia sesión en Airbnb
          </h1>
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#FF385C",
                    brandAccent: "#E31C5F",
                    inputBackground: "#ffffff",
                    inputText: "#000000",
                    inputBorder: "#dddddd",
                  },
                  fonts: {
                    bodyFontFamily:
                      "Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    buttonFontFamily:
                      "Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  },
                  radii: {
                    borderRadiusButton: "9999px",
                    inputBorderRadius: "12px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
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
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-xl shadow-md border border-gray-200 bg-white">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-rose-500 hover:text-rose-600 transition"
        >
          Airbnb
        </Link>

        {/* Perfil */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img
            className="w-20 h-20 rounded-full object-cover shadow"
            src={session.user.user_metadata?.avatar_url}
            alt="Foto de perfil"
          />
          <div>
            <p className="font-medium">{session?.user?.email}</p>
            <button
              onClick={signOut}
              className="mt-3 md:mt-2 bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Autenticacion;
