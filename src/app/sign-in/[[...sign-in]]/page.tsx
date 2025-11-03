import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-md px-4">
        <SignIn 
          routing="hash"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-xl rounded-2xl border border-gray-200",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200",
              socialButtonsBlockButtonText: "text-gray-700 font-medium",
              formButtonPrimary: "bg-truck-blue hover:bg-truck-blue/90 text-white transition-all duration-200",
              footerActionLink: "text-truck-blue hover:text-truck-blue/80",
            }
          }}
        />
      </div>
    </div>
  )
}
