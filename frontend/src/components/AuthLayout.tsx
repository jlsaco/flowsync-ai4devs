import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type AuthLayoutProps = {
  title: string
  description: string
  footer: ReactNode
  children: ReactNode
}

/** Tarjeta centrada común a login y registro. */
export function AuthLayout({
  title,
  description,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center text-2xl font-semibold tracking-tight">
          FlowSync
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">
            {footer}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
