import { defineComponent, type PropType, type VNode } from "vue";
export default defineComponent({
  props: { node: { type: Object as PropType<VNode>, required: true } },
  setup: (props) => () => props.node,
});
