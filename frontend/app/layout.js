import "./globals.css"

export const metadata = {
  title: "Residents",
  description: "Residents management frontend"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="bg-blue-600 text-white py-4 mb-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold">Residents</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 pb-10">{children}</main>
      </body>
    </html>
  )
}

