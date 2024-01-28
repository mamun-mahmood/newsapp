export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 bg-slate-800 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  )
}