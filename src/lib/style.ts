export const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  sand: '#F4ECD8',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
} as const

export const font = "'Vazirmatn', sans-serif"

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 50,
} as const

export const btn = {
  primary: {
    background: s.greenDark,
    color: 'white',
    border: 'none',
    borderRadius: radius.full,
    padding: '13px 28px',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: font,
    cursor: 'pointer',
  },
  secondary: {
    background: 'transparent',
    color: s.greenMid,
    border: `1px solid ${s.greenMid}`,
    borderRadius: radius.full,
    padding: '13px 28px',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: font,
    cursor: 'pointer',
  },
  ghost: {
    background: 'none',
    border: 'none',
    color: s.textMuted,
    fontSize: 13,
    fontFamily: font,
    cursor: 'pointer',
  },
} as const

export const input = {
  width: '100%',
  border: `1px solid ${s.border}`,
  borderRadius: radius.md,
  padding: '13px 16px',
  fontSize: 14,
  outline: 'none',
  fontFamily: font,
  color: s.text,
  background: 'white',
} as const

export const card = {
  background: 'white',
  borderRadius: radius.xl,
  border: `1px solid ${s.border}`,
  boxShadow: '0 4px 32px rgba(26,58,42,0.06)',
} as const

export const nav = {
  background: 'white',
  borderBottom: `1px solid ${s.border}`,
  padding: '20px 48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: font,
  direction: 'rtl' as const,
} as const