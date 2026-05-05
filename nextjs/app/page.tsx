import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-12 items-center">
      
      {/* Hero Section */}
      <div className="hero bg-base-100 rounded-3xl shadow-xl overflow-hidden min-h-[50vh] w-full">
        <div className="hero-content text-center py-16 px-4">
          <div className="max-w-3xl">
            <div className="badge badge-primary badge-outline mb-6 p-4 font-semibold">
              Technical Test 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Garuda Cyber <span className="text-primary">Test App</span>
            </h1>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
              A simple yet powerful web application built with a Headless architecture. 
              Featuring robust authentication and full CRUD post management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login" className="btn btn-outline btn-secondary btn-wide">
                Get Started
              </Link>
              <Link href="/register" className="btn btn-primary btn-wide shadow-lg shadow-primary/30">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-base-300">
          <div className="card-body items-center text-center">
            
            <h2 className="card-title text-xl">Authentication</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Secure Sign Up, Sign In, and Sign Out using Laravel Sanctum token-based authentication.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-base-300">
          <div className="card-body items-center text-center">
            
            <h2 className="card-title text-xl">Post Management</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Create, edit, delete, and view posts. Includes server-side pagination and ownership policies.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-base-300">
          <div className="card-body items-center text-center">
            
            <h2 className="card-title text-xl">Modern Stack</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Separated Next.js 16 App Router frontend and Laravel 13 backend, styled with DaisyUI v5.
            </p>
          </div>
        </div>

      </div>
      
    </div>
  );
}