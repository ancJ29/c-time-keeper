import {
  AppShell,
  Button,
  Checkbox,
  createTheme,
  CSSVariablesResolver,
  Input,
  MantineThemeOverride,
  Modal,
} from '@mantine/core'
import classes from './themes.module.scss'

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'primary',
  defaultRadius: 'sm',
  fontFamily: 'IBM Plex Sans,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif',
  fontSizes: { md: '14px' },
  components: {
    InputWrapper: Input.Wrapper.extend({
      classNames: { label: classes.inputLabel },
    }),
    Input: Input.extend({
      classNames: { input: classes.root },
    }),
    Modal: Modal.extend({
      classNames: {
        title: classes.title,
        content: classes.content,
      },
    }),
    Checkbox: Checkbox.extend({
      classNames: {
        label: classes.checkboxLabel,
        icon: classes.checkboxIcon,
      },
    }),
    Button: Button.extend({
      classNames: { root: classes.root },
    }),
    AppShell: AppShell.extend({
      classNames: {
        navbar: classes.navbar,
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
    '--border-color': theme.colors.quaternary[1],
  },
  light: {},
  dark: {},
})
