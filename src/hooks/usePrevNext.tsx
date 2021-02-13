import { useRouter } from "next/router";
import { createContext } from "vm";

export function usePrevNext() {
  let router = useRouter();
  let { nav } = createContext({});
  let pages = Object.keys(nav).flatMap((category) => nav[category]);
  let pageIndex = pages.findIndex((page) => page.href === router.pathname);
  return {
    prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
    next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
  };
}
