export interface NavItem {
  icon: string;
  label: string;
  routerLink: string;
}

export const NavList: NavItem[] = [
  {
    icon: 'person',
    label: '客戶',
    routerLink: '/main/customer'
  },
  {
    icon: 'store',
    label: '產品',
    routerLink: '/main/product'
  },
  {
    icon: 'shopping_cart',
    label: 'POS',
    routerLink: '/main/pos'
  },
  {
    icon: 'bar_chart',
    label: '圖表',
    routerLink: '/main/diagram'
  },
]
