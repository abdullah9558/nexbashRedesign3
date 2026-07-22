'use client';

import { useTheme } from '@/components/ThemeProvider';

/** Swaps to the white mark in dark mode. */
export default function BrandLogo({ className = '', alt = 'NexBash' }) {
  const { theme } = useTheme();
  const src = theme === 'dark' ? '/assets/nexbash-logo-white.png' : '/assets/nexbash-logo.png';
  return <img src={src} alt={alt} className={className} />;
}
