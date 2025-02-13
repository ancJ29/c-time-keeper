import { LoadingOverlayProps, LoadingOverlay as MantineLoadingOverlay } from '@mantine/core'

export default function LoadingOverlay({ ...props }: LoadingOverlayProps) {
  return <MantineLoadingOverlay zIndex={2000} overlayProps={{ blur: 3 }} {...props} />
}
