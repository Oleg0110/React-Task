import { useEffect } from "react";


const useClickOutside = (ref, handler) => {

   const handleClick = e => {
      if (!ref.current.contains(e.target)) {
         handler();
      }
   };
   useEffect(() => {
      document.addEventListener("mousedown", handleClick)
      document.addEventListener("touchstart", handleClick);

      return () => {
         document.removeEventListener("mousedown", handleClick)
         document.removeEventListener("touchstart", handleClick)
      }

   }, [])

   return ref

};


export default useClickOutside;