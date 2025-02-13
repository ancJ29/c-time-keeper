import { BackgroundImage, Stack } from '@mantine/core'
import { ReactNode } from 'react'

type AuthServiceWrapperProps = {
  children: ReactNode
}

export default function AuthServiceWrapper({ children }: AuthServiceWrapperProps) {
  return (
    <BackgroundImage src="/imgs/auth/background.png" h="100dvh">
      <Stack h="100dvh" align="center" justify="center">
        {children}
      </Stack>
    </BackgroundImage>
  )
}
