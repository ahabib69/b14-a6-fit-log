import './globals.css'
import { PlanProvider } from '@/context/PlanContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'

export const metadata = {
  title: 'FitLog — Daily Workout Tracker',
  description: 'Pick workouts, build a plan, track what you actually did. Dark and simple.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-white flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  )
}
