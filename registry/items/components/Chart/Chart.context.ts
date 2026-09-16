import type { Ref } from "vue";
import type { ChartConfig } from "./";
import { createContext } from "reka-ui";

interface ChartContextProps {
  id: string;
  config: Ref<ChartConfig>;
}

export const [useChart, provideChartContext] = createContext<ChartContextProps>("Chart");
