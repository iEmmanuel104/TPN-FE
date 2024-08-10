import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalContainer = ({
    title,
    children,
    onClose,
}: {
    title?: string;
    children: ReactNode;
    onClose: () => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                event.stopPropagation();
                if (onClose) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed w-screen inset-0 flex items-center justify-center px-4 z-[1100] bg-black/50 overflow-y-auto"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div
                ref={modalRef}
                className="flex items-center justify-center w-full h-[100dvh] py-16"
            >
                <div className="bg-white h-max my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72 w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-medium text-black">
                            {title}
                        </h3>
                        {/* <img
                            onClick={onClose}
                            src={CloseIcon}
                            className="w-6 h-6"
                            role="button"
                            alt="Close"
                        /> */}
                        <span
                            className="flex items-center justify-center w-3 h-3 border border-solid rounded-full cursor-pointer"
                            onClick={onClose}
                        >
                            X
                        </span>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default ModalContainer;
