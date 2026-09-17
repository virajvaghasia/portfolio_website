/** @type {import('next').NextConfig} */
// No `typescript.ignoreBuildErrors` and no `eslint.ignoreDuringBuilds`. The
// content types are the site's honesty mechanism — `Evidence.method` is
// required so a number cannot reach the page without saying how it was
// measured — and ignoring type errors at build time turned that compiler
// guarantee back into a matter of remembering.
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default nextConfig
