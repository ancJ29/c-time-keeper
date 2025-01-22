import {
  createTheme,
  CSSVariablesResolver,
  Input,
  MantineThemeOverride,
  Modal,
} from '@mantine/core'

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'primary',
  defaultRadius: 'sm',
  fontFamily: 'IBM Plex Sans,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif',
  components: {
    InputWrapper: Input.Wrapper.extend({
      styles: {
        label: {
          fontSize: '1rem',
          fontWeight: '500',
        },
      },
    }),
    Modal: Modal.extend({
      styles: {
        title: { fontWeight: 'bold', textTransform: 'uppercase' },
        content: { borderRadius: 'var(--mantine-radius-md)' },
      },
    }),
  },
  colors: {
    primary: [
      '#e1f8ff',
      '#cbedff',
      '#9ad7ff',
      '#64c1ff',
      '#3aaefe',
      '#20a2fe',
      '#099cff',
      '#0088e4',
      '#0079cd',
      '#0068b6',
    ],
    secondary: [
      '#fff8e1',
      '#ffefcb',
      '#ffdd9a',
      '#ffca64',
      '#ffba38',
      '#ffb01b',
      '#ffab09',
      '#e39500',
      '#cb8400',
      '#b07100',
    ],
    tertiary: [
      '#e6ffee',
      '#d3f9e0',
      '#a8f2c0',
      '#7aea9f',
      '#54e382',
      '#3bdf70',
      '#2bdd66',
      '#1bc455',
      '#0bae4a',
      '#00973c',
    ],
    quaternary: [
      '#f3f5f7',
      '#e8e8e8',
      '#cccfd0',
      '#adb5b9',
      '#939fa5',
      '#819199',
      '#778a94',
      '#657781',
      '#586a74',
      '#465c67',
    ],
  },
})

// https://mantine.dev/styles/css-variables/#css-variables-resolver
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--hover-background-color': theme.colors.primary[0],
  },
  light: {},
  dark: {},
})
