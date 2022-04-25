import ReactDOM from "react-dom";

type ModalParams = {
    children: any;
    open: boolean;
    onClose: Function;
};

const Modal = (params: ModalParams) => {
    const { children, open, onClose } = params;
    const portal = document.getElementById("portal");

    if (!open || !portal) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={(e) => onClose()} />
            <div className="modal">
                <div className="modal-bar">
                    <div onClick={(e) => onClose()}>
                        <svg viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </>,
        portal
    );
};

export default Modal;
