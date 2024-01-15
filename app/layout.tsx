import 'antd/dist/antd.css';
import './styles/globals.css';
import '@portkey/did-ui-react/dist/assets/index.css';
import 'aelf-web-login/dist/assets/index.css';
import 'antd-mobile/es/global';

import Script from 'next/script';

export const metadata = {
  title: 'Bingo Game',
  description: 'Bingo Game',
  viewport: 'width=device-width,initial-scale=1,maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LEHZKJQ2F5"></Script>
      <Script id="googletagmanager" strategy="afterInteractive">
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LEHZKJQ2F5');`}
      </Script>
    </html>
  );
}
