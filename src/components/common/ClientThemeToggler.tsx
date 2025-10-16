"use client";

import dynamic from 'next/dynamic';

const ThemeTogglerTwo = dynamic(() => import('@/components/common/ThemeTogglerTwo'), { ssr: false });

export default function ClientThemeToggler() {
  return <ThemeTogglerTwo />;
}