import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set empty turbopack config to disable Turbopack (as suggested by Next.js error message)
  // This forces webpack to be used instead, fixing pdfkit/fontkit compatibility
  turbopack: {},
  
  // Mark pdfkit and fontkit as external server packages
  // This prevents them from being bundled and avoids Turbopack issues
  serverExternalPackages: ['pdfkit', 'fontkit'],
  
  // Use webpack instead of Turbopack to fix pdfkit/fontkit compatibility
  // Turbopack has issues with fontkit's use of @swc/helpers (applyDecoratedDescriptor)
  webpack: (config, { isServer }) => {
    // Fix for pdfkit/fontkit compatibility - exclude fs, path, crypto on client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Ignore fontkit warnings during build
    config.ignoreWarnings = [
      { module: /fontkit/ },
      { file: /fontkit/ },
    ];
    
    return config;
  },
};

export default nextConfig;
