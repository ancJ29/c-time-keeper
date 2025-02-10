import {
  Button,
  Checkbox,
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
          fontSize: '14px',
          fontWeight: '400',
        },
      },
    }),
    Input: Input.extend({
      styles: {
        input: { borderRadius: '6px' },
      },
    }),
    Modal: Modal.extend({
      styles: {
        title: { fontWeight: 'bold', textTransform: 'uppercase' },
        content: { borderRadius: 'var(--mantine-radius-md)' },
      },
    }),
    Checkbox: Checkbox.extend({
      styles: {
        label: { paddingInlineStart: '6px' },
        icon: { width: '50%' },
      },
    }),
    Button: Button.extend({
      styles: {
        root: { borderRadius: '6px' },
      },
    }),
  },
  colors: {
    primary: [
      '#e2f5ff',
      '#cbe6ff',
      '#99caff',
      '#62acff',
      '#3693ff',
      '#1883ff',
      '#007bff',
      '#0069e5',
      '#005dce',
      '#0050b7',
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
