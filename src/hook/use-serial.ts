import { useMemo } from "react";

const useSerialNumber = (page: number, limit: number) => {
  return useMemo(() => {
    return (index: number) => (page - 1) * limit + index + 1;
  }, [page, limit]);
};

export default useSerialNumber;
