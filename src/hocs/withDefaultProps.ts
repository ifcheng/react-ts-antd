import { FC } from 'react'

export default function withDefaultProps<
  P extends object,
  DP extends Partial<P>
>(defaultProps: DP, Component: FC<P>): FC<Omit<P, keyof DP> & Partial<DP>> {
  Component.defaultProps = defaultProps
  return Component as any
}
