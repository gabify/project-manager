export default function Card({children, onClick}){
    return(
        <div className={`
            bg-gray-800 p-2 rounded-md 
            text-gray-300 text-sm mb-1 
            hover:bg-gray-700
            cursor-pointer
        `}
            onClick={onClick}
        >
            {children}
        </div>
    )
}