import registryFlowApis from "#registry-flow-api";
import { toRegistryFlowItem } from "~/lib/registry/flow-data";

export default defineEventHandler(async (event) => {
  const items = await getRegistryItems(event);

  return items.map((item) => toRegistryFlowItem(item, registryFlowApis[item.name]));
});
