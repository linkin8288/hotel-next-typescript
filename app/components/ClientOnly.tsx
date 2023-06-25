'use client';

// The ClientOnly component you provided is a common pattern 
// used in Next.js applications to conditionally render 
// components only on the client-side. It ensures that the 
// component is not rendered during server-side rendering (SSR), 
// but only after the JavaScript bundle is executed on the client-side.

// By wrapping the content inside the ClientOnly component, you can 
// ensure that the content is only rendered on the client-side, 
// avoiding any issues related to accessing client-specific objects or APIs.

// This pattern is commonly used when components rely on 
// browser-specific APIs, perform client-side rendering, or 
// interact with the DOM directly. It helps prevent potential 
// errors and inconsistencies when rendering the component during SSR.

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly;
