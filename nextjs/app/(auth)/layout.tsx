export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hanya me-render children murni
  return <>{children}</>;
}