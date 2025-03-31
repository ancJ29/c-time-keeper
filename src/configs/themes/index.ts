import {
  Button,
  Checkbox,
  createTheme,
  CSSVariablesResolver,
  Grid,
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
    Grid: Grid.extend({
      classNames: { inner: classes.gridInner },
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
    xOrange: [
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
    xGreen: [
      '#e8fcf4',
      '#d9f3e8',
      '#b6e5d1',
      '#8fd6b8',
      '#6ec9a3',
      '#59c295',
      '#4cbe8e',
      '#3ca77a',
      '#30956c',
      '#1d815b',
    ],
    xGray: [
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
    xRed: [
      '#ffeaea',
      '#fdd6d6',
      '#f1abab',
      '#e67d7e',
      '#de5757',
      '#d93e3e',
      '#d73131',
      '#bf2324',
      '#ab1b1f',
      '#961018',
    ],
  },
})

// https://mantine.dev/styles/css-variables/#css-variables-resolver
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--hover-background-color': theme.colors.primary[0],
    '--border-color': theme.colors.xGray[1],
  },
  light: {},
  dark: {},
})
