'use client';

import React from 'react';
import Link0 from 'next/link';
import { useRouter } from 'next/navigation';

export default function Link(props: React.ComponentProps<typeof Link0>) {
  const router = useRouter();

  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const url = new URL(String(props.href), window.location.href);
    if (
      url.origin === window.location.origin &&
      e.button === 0 &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey
    ) {
      e.preventDefault();
      router.push(String(props.href));
    }
  }

  return (
    <Link0
      {...props}
      prefetch={false}
      onMouseEnter={() => {
        router.prefetch(String(props.href));
      }}
      onMouseDown={handleMouseDown}
    />
  );
}