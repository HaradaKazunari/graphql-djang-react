import { useVersatilitys } from "@/features/versatility";
import { VersatilityCode } from "@/types";
import { Versatility } from "@/features/versatility/types";

export const GetVersatilityValue = (
  code: VersatilityCode,
  key: string | undefined,
) => {
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: code,
    },
  });
  if (!versatilityQuery.data) return key;
  const data = versatilityQuery.data.find((d: Versatility) => d.key === key);
  return data?.value;
};
