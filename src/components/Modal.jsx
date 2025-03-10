export default function Modal({open, onClose, children}){
    return(
        <section 
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center
                items-center transition-colors px-3
                ${open ? "visible bg-black/75" : "invisible"}
            `}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={`
                    bg-gray-800 rounded-md shadow px-4 py-6
                    transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 text-xs"
                >
                X
                </button>
                {children}
            </div>

        </section>
    )
}