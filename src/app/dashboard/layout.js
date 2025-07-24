
// Dashboard Layout for Next.js App Router
export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-screen bg-slate-50 flex flex-col">
      {children}
    </section>
  );
}
