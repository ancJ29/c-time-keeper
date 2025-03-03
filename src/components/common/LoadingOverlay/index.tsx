import { LoadingOverlayProps, LoadingOverlay as MantineLoadingOverlay } from '@mantine/core'

export default function LoadingOverlay({ visible = true, ...props }: LoadingOverlayProps) {
  return (
    <MantineLoadingOverlay
      visible={visible}
      zIndex={2000}
      overlayProps={{ blur: 3 }}
      {...props}
      h="100dvh"
    />
  )
}
