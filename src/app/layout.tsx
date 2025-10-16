import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navigation from "../components/Navigation";
import EmailJSInit from "../components/EmailJSInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanshidigital.com"),
  title: {
    default: "Tanshi Digital Solutions",
    template: "%s | Tanshi Digital Solutions",
  },
  description:
    "Tanshi Digital Solutions builds modern web and mobile applications — web development, Android apps, AI & IoT solutions — to help Zambian businesses scale with reliable, performant software.",
  keywords: [
    "Tanshi Digital Solutions",
    "web development",
    "mobile app development",
    "android apps",
    "react",
    "next.js",
    "iot",
    "ai",
    "software development",
    "zambia",
    "tanshidigital"
  ],
  authors: [{ name: "Tanshi Digital Solutions", url: "https://tanshidigital.com" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  icons: {
    icon: "/TanshiLogo.png",
    apple: "/TanshiLogo.png",
    other: [{ rel: "apple-touch-icon", url: "/TanshiLogo.png" }]
  },
  openGraph: {
    title: "Tanshi Digital Solutions — Web & App Development",
    description:
      "Modern web and mobile app development, AI & IoT solutions from a Zambian-rooted team. Build fast, secure, and scalable products with Tanshi Digital.",
    url: "https://tanshidigital.com",
    siteName: "Tanshi Digital Solutions",
    images: [
      {
        url: "https://tanshidigital.com/TanshiLogo.png",
        width: 1200,
        height: 630,
        alt: "Tanshi Digital Solutions logo / preview"
      }
    ],
    locale: "en_ZM",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanshi Digital Solutions — Web & App Development",
    description:
      "Modern web and mobile app development, AI & IoT solutions from a Zambian-rooted team.",
    creator: "@tanshidigital",
    images: ["https://tanshidigital.com/TanshiLogo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  // optional: point to a manifest if you add one later
  // manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="msvalidate.01" content="ED7E4347C3F3DED1AAD5A62422217488" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmailJSInit />
        <Navigation />
        {children}
      </body>
              <Script id="chatbase-init" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                window.chatbase=(...arguments)=>{
                  if(!window.chatbase.q){window.chatbase.q=[]}
                  window.chatbase.q.push(arguments)
                };
                window.chatbase=new Proxy(window.chatbase,{
                  get(target,prop){
                    if(prop==="q"){return target.q}
                    return(...args)=>target(prop,...args)
                  }
                })
              }
              const onLoad=function(){
                const script=document.createElement("script");
                script.src="https://www.chatbase.co/embed.min.js";
                script.id="ZbQ41oPAMPDkkU034F-KP";
                script.domain="www.chatbase.co";
                document.body.appendChild(script)
              };
              if(document.readyState==="complete"){onLoad()}
              else{window.addEventListener("load",onLoad)}
            })();
          `}
        </Script>
    </html>
  );
  
}
