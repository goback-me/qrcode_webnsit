import React from 'react'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="max-w-4xl mx-auto text-center py-20 px-4">
      <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>
        Generate & Publish Dynamic QR Codes
      </h1>
      <p className="text-lg text-neutral-600 mb-8">
        Create customizable, high-quality QR codes for web, print, and campaigns. Add logos, choose formats, and download instantly.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/#generator" className="btn-primary">
          Try the Generator
        </Link>
        <Link href="/bulk-qr-generator" className="btn-ghost">
          Bulk Generator
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
