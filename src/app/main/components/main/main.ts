export interface NavItem {
  icon: string;
  label: string;
  routerLink: string;
}

export const NavList: NavItem[] = [
  {
    icon: 'person',
    label: 'Customer',
    routerLink: '/main/customer'
  },
  {
    icon: 'store',
    label: 'Product',
    routerLink: '/main/product'
  },
  {
    icon: 'bar_chart',
    label: 'Chart',
    routerLink: '/main/diagram'
  },
  {
    icon: 'shopping_cart',
    label: 'POS',
    routerLink: '/main/pos'
  },
]
