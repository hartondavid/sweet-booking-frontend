
import { RIGHTS_MAPPING } from './utilConstants';
import CakeIcon from '@mui/icons-material/Cake';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const menus = [

    {
        id: 1,
        parentId: null,
        name: "Prajituri",
        to: "/dashboard/cakes",
        icon: CakeIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN, RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },

    {
        id: 2,
        parentId: null,
        name: "Retete",
        to: "/dashboard/cakeIngredients",
        icon: AutoStoriesIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [

        ]
    },
    {
        id: 3,
        parentId: null,
        name: "Stoc ingrediente",
        to: "/dashboard/stockIngredients",
        icon: InventoryIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [

        ]
    },
    {
        id: 4,
        parentId: null,
        name: "Prajituri rezervate",
        to: "/dashboard/reservations",
        icon: AccessTimeIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN, RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 5,
        parentId: null,
        name: "Prajituri cumparate",
        to: "/dashboard/boughtCakes",
        icon: ShoppingBasketIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN, RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 6,
        parentId: null,
        name: "Prajituri ramase",
        to: "/dashboard/remainingCakes",
        icon: CakeIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [

        ]
    },
    {
        id: 7,
        parentId: null,
        name: "Utilizatori",
        to: "/dashboard/users",
        icon: PersonIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [

        ]
    },


]
