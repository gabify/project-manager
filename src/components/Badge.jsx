const Badge = ({children}) => {
    return ( 
        <span className={`
            bg-gray-700 text-gray-400 text-xs font-medium
            ms-2 px-1.5 py-0.5 rounded-full`}
        >
            {children}
        </span>
     );
}
 
export default Badge;