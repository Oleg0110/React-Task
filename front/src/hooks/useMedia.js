import { useState, useEffect, useCallback } from 'react';

function useMedia(queries, values, defaultValue) {
   const mediaQueryLists = queries.map((q) => window.matchMedia(q));
   const getValue = useCallback(() => {
      const index = mediaQueryLists.findIndex((mql) => mql.matches);
      return typeof values[index] !== "undefined" ? values[index] : defaultValue;
   }, [defaultValue, values, mediaQueryLists]);
   const [value, setValue] = useState(getValue);
   useEffect(() => {
      const handler = () => setValue(getValue);
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      return () =>
         mediaQueryLists.forEach((mql) => mql.removeListener(handler));
   },
      [getValue, mediaQueryLists]
   );
   return value;
}

export default useMedia;