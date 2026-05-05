import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* KONTEN UTAMA */}
      <div className="drawer-content flex flex-col bg-base-100 overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 bg-base-200">
          {children}
        </main>
      </div>

      {/* SIDEBAR */}
      <Sidebar />
    </div>
  );
}