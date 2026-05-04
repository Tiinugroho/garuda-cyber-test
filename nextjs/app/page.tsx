export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      
      {/* Hero */}
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Garuda Cyber Test App
        </h1>

        <p className="text-base-content/70 mb-6">
          A simple web application built with Next.js and Laravel API.
          Featuring authentication and full CRUD post management with
          a clean UI powered by DaisyUI.
        </p>

        <div className="flex justify-center gap-4">
          <a href="/login" className="btn btn-primary">
            Login
          </a>
          <a href="/register" className="btn btn-outline">
            Register
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="text-3xl">🔐</div>
            <h2 className="card-title">Authentication</h2>
            <p className="text-sm opacity-70">
              Secure login, register, and logout using token-based authentication.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="text-3xl">📝</div>
            <h2 className="card-title">Post Management</h2>
            <p className="text-sm opacity-70">
              Create, edit, delete, and view posts with pagination support.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="text-3xl">⚡</div>
            <h2 className="card-title">Modern Stack</h2>
            <p className="text-sm opacity-70">
              Built with Laravel API, Next.js App Router, and DaisyUI.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}