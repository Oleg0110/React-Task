import { useState, useEffect } from 'react';

function useMediaQuery(query) {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
         setMatches(media.matches);
      }
      console.log("Переподписка");
      const listener = () => {
         setMatches(media.matches);
      };
      media.addListener(listener);
      return () => {
         console.log("Сняли подписку");
         media.removeListener(listener)
      };
   }, [matches, query]);

   return matches;
}

export default useMediaQuery;