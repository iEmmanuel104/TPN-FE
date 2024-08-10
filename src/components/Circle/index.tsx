import { ReactNode } from 'react'
export const Circle = ({ width, height, bg, img, pd, normalImage, children, noMg, borderColor, style, noBorder }: {
    style?: React.CSSProperties, noBorder?: boolean,
    borderColor?: string,
    noMg?: boolean, children?: ReactNode, normalImage?: boolean, img: string, pd: number, width: number, height: number, bg: string
}) => {
    return (
        <div className="flex-row minw-fit centralize-x centralize-y"
            style={{
                padding: pd, width, margin: noMg ? '' : '0 10px', overflow: 'hidden', height, backgroundColor: bg, borderRadius: '100%', [noBorder ? '' : 'border']: `1px solid ${borderColor ?? '#e9e9e9'}`, flexShrink: 0, ...style,
            }}>
            {children
                ? (
                    <>
                        {children}
                    </>
                )
                : (
                    <>
                        <img style={{
                            width: !normalImage ? '' : '100%', height: !normalImage ? '' : '100%',
                            margin: '0px',
                            maxWidth: '100%', maxHeight: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 'auto'
                        }} src={img} alt="" />
                    </>
                )
            }
        </div>
    )
}