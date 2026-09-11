import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useCartStore } from "@store/useCartStore";
import { COLORS, SIZES } from "@constants/theme";
import ShopButton from "@components/ui/ShopButton";

const CartScreen = () => {
    const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

    // Tính tổng tiền giỏ hàng
    const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        if (items.length === 0) return;
        Alert.alert("🎉 Thành công", "Thanh toán đơn hàng giỏ hàng thành công!");
        clearCart();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>🛒 Giỏ hàng của bạn ({items.length})</Text>

                <FlashList
                    data={items}
                    keyExtractor={(item) => item.product.id}
                    contentContainerStyle={{ paddingVertical: 12 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.cartItemCard}>
                            {/* Hình ảnh thu nhỏ đúng yêu cầu */}
                            <Image source={{ uri: item.product.image }} style={styles.itemImage} resizeMode="cover" />

                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
                                <Text style={styles.itemPrice}>
                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.product.price)}
                                </Text>

                                {/* Bộ điều chỉnh số lượng trong giỏ */}
                                <View style={styles.quantityRow}>
                                    <View style={styles.qtyControl}>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => removeFromCart(item.product.id)}
                                    >
                                        <Text style={styles.removeText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống!</Text>
                        </View>
                    }
                />

                {/* Thanh tổng kết thanh toán ở đáy màn hình */}
                {items.length > 0 && (
                    <View style={styles.footerContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                            <Text style={styles.totalValue}>
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
                            </Text>
                        </View>
                        <ShopButton title="Tiến hành thanh toán" onPress={handleCheckout} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, paddingHorizontal: SIZES.padding },
    headerTitle: { fontSize: SIZES.h2, fontWeight: "bold", color: COLORS.text, marginVertical: 12 },
    cartItemCard: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    itemImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: "#F3F4F6" },
    itemInfo: { flex: 1, marginLeft: 12 },
    itemName: { fontSize: 13, fontWeight: "600", color: COLORS.text, marginBottom: 4 },
    itemPrice: { fontSize: 13, fontWeight: "bold", color: COLORS.primary, marginBottom: 8 },
    quantityRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    qtyControl: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, overflow: "hidden" },
    qtyBtn: { width: 26, height: 26, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center" },
    qtyBtnText: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
    qtyValue: { width: 30, textAlign: "center", fontSize: 12, fontWeight: "bold", color: COLORS.text },
    qtyText: { width: 30, textAlign: "center", fontSize: 12, fontWeight: "bold", color: COLORS.text },
    removeText: { fontSize: 12, color: "#EF4444", fontWeight: "600" },
    emptyContainer: { padding: 60, alignItems: "center" },
    emptyText: { fontSize: SIZES.body1, color: COLORS.textLight },
    footerContainer: { paddingVertical: 16, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.background },
    totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    totalLabel: { fontSize: 14, color: COLORS.textLight, fontWeight: "500" },
    totalValue: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
});

export default CartScreen;