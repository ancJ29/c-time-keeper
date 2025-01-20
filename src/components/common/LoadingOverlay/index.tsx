import { LoadingOverlay as MantineLoadingOverlay, LoadingOverlayProps } from '@mantine/core'

export default function LoadingOverlay({ ...props }: LoadingOverlayProps) {
  return <MantineLoadingOverlay zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} {...props} />
}
