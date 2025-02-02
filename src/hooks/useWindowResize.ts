import { useMediaQuery } from '@mantine/hooks'

export default function useWindowResize() {
  const matches = useMediaQuery('(max-width: 768px)', true, { getInitialValueInEffect: false })
  return matches
}
