type ConfimationModalProps = {
    isOpen : boolean,
    onClose : () => void;
    onConfirm : () => void;
    title : string;
    message : string;
    confirmText? : string;
    cancelText? : string;
    danger? : boolean;
}

export const ConfimationModal = ({
    isOpen, 
    onClose, 
    onConfirm, 
    title,
    message, 
    confirmText = "Confirm",
    cancelText = "Cancel", 
    danger = false,
} : ConfimationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="texst-gray-400 mb-6">{message}</p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={ ()=>{
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 rounded-md text-white transition-colors ${
                            danger ? "bg-red-600 hover:bg-red-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )

}