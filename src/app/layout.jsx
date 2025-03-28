import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center h-[100vh]">
        {children}
      </body>
    </html>
  );
}
