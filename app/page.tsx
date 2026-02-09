"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is logged in, redirect to documents
    if (status === "authenticated") {
      router.push("/documents");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Share documents.
            <br />
            <span className="text-orange-600">Not attachments.</span>
          </h1>
          
          <p className="mb-8 text-xl text-gray-600">
            Papermark is the open-source document sharing platform with built-in analytics.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-orange-600 px-8 py-3 text-lg font-semibold text-white hover:bg-orange-700"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Papermark?
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
              <p className="text-gray-600">
                Track who views your documents and for how long
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">🔒</div>
              <h3 className="mb-2 text-xl font-semibold">Secure</h3>
              <p className="text-gray-600">
                Password protection and custom domains
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold">Fast</h3>
              <p className="text-gray-600">
                Lightning-fast document sharing and viewing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-gray-600">
          <p>© 2024 Papermark. Open-source document sharing platform.</p>
        </div>
      </footer>
    </div>
  );
}
