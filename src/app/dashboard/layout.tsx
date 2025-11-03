import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
