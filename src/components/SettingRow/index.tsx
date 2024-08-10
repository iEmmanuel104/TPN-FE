import './style.scss';

type Props = {
    title: string;
    subtitle?: string;
    actionBtn: string | JSX.Element;
    onPress?: () => void;
};

export const SettingRow: React.FC<Props> = ({
    title,
    subtitle,
    actionBtn,
    onPress,
}) => {
    return (
        <div className="flex items-center gap-5 mb-4">
            <div className="w-full md:w-1/2">
                <h5 className="text-sm font-medium mb-1">{title}</h5>
                <p
                    className="text-sm font-normal text-[#8D9091]"
                    style={{ width: '90%' }}
                >
                    {subtitle}
                </p>
            </div>

            <div>
                {typeof actionBtn === 'string' ? (
                    <p className="text-xs cursor-pointer" onClick={onPress}>
                        {actionBtn}
                    </p>
                ) : (
                    actionBtn
                )}
            </div>
        </div>
    );
};
