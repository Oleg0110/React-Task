// import { useEffect } from "react";


// const useClickOutside = (ref, handler) => {

//    const handleClick = e => {
//       if (!ref.current || ref.current.contains(e.target)) {
//          handler();
//       }
//    };
//    useEffect(() => {
//       document.addEventListener('click', handleClick);
//       document.addEventListener("touchstart", handleClick);
//       return () => {
//          document.removeEventListener('click', handleClick);
//          document.removeEventListener("touchstart", handleClick);
//       };
//    }, []);
// };



// export default useClickOutside;