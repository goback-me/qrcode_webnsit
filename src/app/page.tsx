
import QRGenerator from "@/components/(qr-generator)/QrGenerator";
import { CheckCircle, Smartphone, Globe, Shield, Zap, BarChart3, Palette, Download } from 'lucide-react';
import HeroSection from "@/components/HeroSection";
export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Top Leaderboard Ad */}
      {/* <div className="flex justify-center py-4 px-4">
        <AdSpace size="leaderboard" label="Sponsored" />
      </div> */}
      
      {/* Hero Section  */}

      <HeroSection/>


      {/* Qr Generator   */}
      <main className="main_website_content">
        <div className=" flex justify-center w-full py-20">
        <div className="p-5 bg-neutral-100 rounded-lg max-w-6xl w-full">
        <QRGenerator />
        </div>
        </div>


            {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              How To Create A QR Code
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional QR codes in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
{/* <div className="bg-blue-500 p-2">
  <div className="rounded-full bg-black w-10 h-10 p-2 text-white flex items-center justify-center font-semibold">
    <span>1</span>
  </div>
</div> */}

  <div className="work_content">
    <h4 className="font-semibold text-lg mb-2 mt-4">Choose the content of your QR code</h4>
    <p>Select from a wide variety of options: PDF, menu, video, business cards, web, apps, etc.</p>
  </div>
          </div>
            <div>
{/* <div className="bg-blue-500 p-2">
  <div className="rounded-full bg-black w-10 h-10 p-2 text-white flex items-center justify-center font-semibold">
    <span>2</span>
  </div>
</div> */}

  <div className="work_content">
    <h4 className="font-semibold text-lg mb-2 mt-4">Customize and design it to measure</h4>
    <p>Fill in all the information and use our design tool to make your QR unique.</p>
  </div>
          </div>
            <div>
{/* <div className="bg-blue-500 p-2">
  <div className="rounded-full bg-black w-10 h-10 p-2 text-white flex items-center justify-center font-semibold">
    <span>3</span>
  </div>
</div> */}

  <div className="work_content">
    <h4 className="font-semibold text-lg mb-2 mt-4">Download your QR code</h4>
    <p>Get your QR code in different formats (pdf, png, svg), print it or show it in a digital format and voila!</p>
  </div>
          </div>
        </div>
        </div>
      </section>

       {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful QR Code Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional QR codes with advanced features and customization options
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl py-10">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-600">Create QR codes instantly with just one click</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl py-10">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600">Customize colors, logos, and frames to match your brand</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl py-10">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Track scans and monitor performance with detailed analytics</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl py-10">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">Download in PNG, SVG, PDF, and other high-quality formats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              QR Code Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how QR codes can transform your business and personal projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Website Links</h3>
              <p className="text-gray-600 mb-4">Direct users to your homepage, product pages, or promotional offers with a simple scan.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Landing pages</li>
                <li>• Product catalogs</li>
                <li>• Social media profiles</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Smartphone className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <p className="text-gray-600 mb-4">Share contact details instantly without manual typing or business cards.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• vCard format</li>
                <li>• Phone numbers</li>
                <li>• Email addresses</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Authentication</h3>
              <p className="text-gray-600 mb-4">Secure access control and two-factor authentication for enhanced security.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 2FA setup</li>
                <li>• WiFi passwords</li>
                <li>• Access tokens</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our QR Code Generator?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Free</h3>
                    <p className="text-gray-600">Generate unlimited QR codes without any cost or registration required.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">High Quality</h3>
                    <p className="text-gray-600">Vector-based QR codes that scale perfectly for print and digital use.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Privacy Focused</h3>
                    <p className="text-gray-600">Your data stays private. We don't store or track your QR code content.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Universal Compatibility</h3>
                    <p className="text-gray-600">Works with all QR code scanners and smartphone cameras.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6 inline-block">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    {/* <span className="text-gray-500 text-sm">Sample QR Code</span> */}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Results</h3>
                <p className="text-gray-600">Create QR codes that look great and work flawlessly across all devices and platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about QR codes
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">What is a QR code?</h3>
              <p className="text-gray-600">A QR (Quick Response) code is a type of barcode that can store various types of information and can be scanned using smartphone cameras or dedicated QR code readers.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Are the QR codes free to use?</h3>
              <p className="text-gray-600">Yes, all QR codes generated on our platform are completely free to use for personal and commercial purposes without any limitations.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Do QR codes expire?</h3>
              <p className="text-gray-600">Static QR codes never expire. Once generated, they will work indefinitely as long as the content they link to remains available.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">What formats can I download?</h3>
              <p className="text-gray-600">You can download your QR codes in multiple formats including PNG, JPG, SVG, and PDF for both digital and print use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your QR Code?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start generating professional QR codes in seconds
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Create QR Code Now
          </button>
        </div>
      </section>

      </main>
    </div>
  );
}