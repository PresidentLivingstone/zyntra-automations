// components/preload-resources.tsx
export function PreloadResources() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/_next/static/media/GeistSans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload hero image */}
      <link
        rel="preload"
        as="image"
        href="/hero-background.webp"
        type="image/webp"
      />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/_next/static/css/app.css"
        as="style"
      />
    </>
  )
}
