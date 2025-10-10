import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gani - Voice Assistant',
    short_name: 'Gani',
    description:
      'A bilingual AI-powered voice assistant built for natural interaction in English and Hausa.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#FFFFFF',
    background_color: '#2596BE',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon512_maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Start Listening',
        short_name: 'Listen',
        url: '/chat',
        icons: [{ src: '/mic.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'Translate Mode',
        short_name: 'Translate',
        url: '/chat',
        icons: [
          { src: '/translate.png', sizes: '96x96', type: 'image/png' },
        ],
      },
    ],
  }
}
