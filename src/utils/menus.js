
import { RIGHTS_MAPPING } from './utilConstants';
import CakeIcon from '@mui/icons-material/Cake';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InventoryIcon from '@mui/icons-material/Inventory';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

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
        isCategory: true,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [
            {
                id: 201,
                parentId: 2,
                name: "Ingrediente",
                to: '/dashboard/cakeIngredients',
                isCategory: false,
                excludelocationsType: [],
                rights: [RIGHTS_MAPPING.ADMIN],
                order: 11,
            },
            {
                id: 202,
                parentId: 2,
                name: "Adauga ingredient",
                to: '/dashboard/addIngredient',
                isCategory: false,
                excludelocationsType: [],
                rights: [RIGHTS_MAPPING.ADMIN],
                order: 11,
            },
            {
                id: 203,
                parentId: 2,
                name: "Editeaza ingredient",
                to: '/dashboard/editIngredient',
                isCategory: false,
                excludelocationsType: [],
                rights: [RIGHTS_MAPPING.ADMIN],
                order: 11,
            },
            {
                id: 204,
                parentId: 2,
                name: "Sterge ingredient",
                to: '/dashboard/deleteIngredient',
                isCategory: false,
                excludelocationsType: [],
                rights: [RIGHTS_MAPPING.ADMIN],
                order: 11,
            },
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
        icon: BeenhereIcon,
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
        icon: ShoppingBasketIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.ADMIN],
        order: 90,
        children: [

        ]
    },

]
