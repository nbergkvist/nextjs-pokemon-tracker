import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon tracker</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
