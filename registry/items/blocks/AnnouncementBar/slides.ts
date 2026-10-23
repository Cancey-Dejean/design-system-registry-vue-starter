import { Comment, Fragment, Text, isVNode, type VNode, type VNodeChild } from "vue";
export function getAnnouncementSlides(children: VNodeChild[]): VNode[] {
  return children.flatMap((child): VNode[] => {
    if (!isVNode(child) || child.type === Comment) return [];
    if (child.type === Fragment)
      return getAnnouncementSlides((child.children ?? []) as VNodeChild[]);
    if (child.type === Text) {
      const text = typeof child.children === "string" ? child.children : "";
      if (!text.trim()) return [];
    }
    return [child];
  });
}
