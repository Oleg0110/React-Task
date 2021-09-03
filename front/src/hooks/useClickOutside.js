import { useEffect } from "react";


const useClickOutside = (ref, handler) => {

   const handleClick = e => {
      if (!ref.current || ref.current.contains(e.target)) {
         handler();
      }
   };
   useEffect(() => {
      let myHandler = (e) => {
         if (ref.current && !ref.current.contains(e.targer)) {
            handler()
         }
      }
      document.addEventListener("mousedown", myHandler)
      document.addEventListener("touchstart", myHandler);

      return () => {
         document.removeEventListener("mousedown", myHandler)
         document.removeEventListener("touchstart", myHandler)
      }

   }, [])

   return ref

};


export default useClickOutside;