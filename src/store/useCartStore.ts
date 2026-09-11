// src/store/useCartStore.ts
import { create } from 'zustand';
import { Product } from '@data/mockProducts';

export type CartItem = {
    product: Product;
    quantity: number;
};

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],

    // Thêm sản phẩm vào giỏ (nếu trùng ID thì cộng dồn số lượng)
    addToCart: (product, quantity) => set((state) => {
        const existingIndex = state.items.findIndex(item => item.product.id === product.id);
        if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
        }
        return { items: [...state.items, { product, quantity }] };
    }),

    // Xóa sản phẩm khỏi giỏ
    removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
    })),

    // Cập nhật số lượng trực tiếp
    updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
    })),

    // Xóa sạch giỏ hàng khi thanh toán xong
    clearCart: () => set({ items: [] }),
}));