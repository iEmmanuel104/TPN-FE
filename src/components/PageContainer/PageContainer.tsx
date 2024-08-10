interface IPageContainer {
    title?: string;
    children: React.ReactNode;
}

export default function PageContainer({ title, children }: IPageContainer) {
    return (
        <div className="flex flex-col gap-[3.75rem] w-full bg-transparent">
            <div className="max-w-[1300px] mx-auto w-full">
                <h4 className="font-semibold text-lg text-[#0D0D0D]">
                    {title}
                </h4>
                <div className="mt-[60px]">{children}</div>
            </div>
        </div>
    );
}
