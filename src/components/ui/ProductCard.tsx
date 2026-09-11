// src/components/ProductCard.tsx
import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Modal, Alert, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS, SIZES } from "@constants/theme";
import ShopButton from "@components/ui/ShopButton";
import { Product } from "@data/mockProducts";
import type { HomeStackParamList } from "@navigation/HomeStackNavigator";
import { useCartStore } from "@store/useCartStore";

const { width, height } = Dimensions.get("window");
const GAP = SIZES.padding;
const CARD_WIDTH = (width - GAP * 3) / 2;

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const opacity = useSharedValue(0);

    // Lấy hàm addToCart từ Zustand store toàn cục
    const cartStore = useCartStore();
    const addToCartStore = cartStore?.addToCart;

    // Trạng thái mở Modal: "ADD" (Thêm vào giỏ) hoặc "BUY" (Mua ngay), null (Đóng)
    const [actionType, setActionType] = useState<"ADD" | "BUY" | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
    }, [opacity]);

    const fadeInStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    // Xác nhận Thêm vào giỏ hàng từ bảng Modal đè lên
    const handleConfirmAddToCart = () => {
        addToCartStore(product, quantity); // Đẩy vào store toàn cục
        setActionType(null);
        Alert.alert(
            "🛒 Giỏ hàng ShopAI",
            `Đã thêm thành công ${quantity} x ${product.name} vào giỏ hàng!`,
            [
                { text: "Tiếp tục mua sắm", style: "cancel" },
                {
                    text: "Xem giỏ hàng",
                    onPress: () => {
                        // @ts-ignore
                        navigation.navigate("Cart");
                    }
                }
            ]
        );
        setQuantity(1);
    };

    // Xác nhận Mua ngay từ bảng Modal đè lên
    const handleConfirmBuyNow = () => {
        setActionType(null);
        Alert.alert(
            "🎉 Đặt hàng thành công",
            `Chúc mừng bạn đã đặt hàng thành công sản phẩm: ${product.name} (Số lượng: ${quantity}).`
        );
        setQuantity(1);
    };

    return (
        <>
            <Animated.View style={[styles.card, fadeInStyle]}>
                {/* Bấm vào ảnh để xem chi tiết sản phẩm */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
                >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
                    </View>
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
                    >
                        <Text style={styles.name} numberOfLines={2}>
                            {product.name}
                        </Text>
                        <Text style={styles.price}>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.price)}
                        </Text>
                    </TouchableOpacity>

                    {/* Cụm 2 nút bấm: Thêm & Mua ngay */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.addToCartCustomBtn}
                            onPress={() => {
                                setQuantity(1);
                                setActionType("ADD");
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.addToCartText}>Thêm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buyNowCustomBtn}
                            onPress={() => {
                                setQuantity(1);
                                setActionType("BUY");
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buyNowText}>Mua ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

            {/* TRANG PHỤ ĐÈ LÊN (MODAL FULL SCREEN / BOTTOM SHEET) */}
            <Modal
                visible={actionType !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setActionType(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalIndicator} />

                        <Text style={styles.modalHeaderTitle}>
                            {actionType === "ADD" ? "➕ Thêm vào giỏ hàng" : "⚡ Xác nhận mua ngay"}
                        </Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Hiển thị sản phẩm với hình ảnh thu nhỏ chuẩn thiết kế thương mại */}
                            <View style={styles.productInfoBox}>
                                <Image
                                    source={{ uri: product.image }}
                                    style={styles.smallProductImage}
                                    resizeMode="cover"
                                />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.sheetProductName} numberOfLines={2}>{product.name}</Text>
                                    <Text style={styles.sheetProductPrice}>
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                                    </Text>
                                    <Text style={styles.sheetProductStock}>Kho: Còn hàng chính hãng</Text>
                                </View>
                            </View>

                            {/* Bộ chọn số lượng */}
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionLabel}>Số lượng</Text>
                                <View style={styles.quantitySelector}>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Text style={styles.qtyBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyValue}>{quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => setQuantity(quantity + 1)}
                                    >
                                        <Text style={styles.qtyBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Tổng tiền tạm tính */}
                            <View style={styles.totalPaymentRow}>
                                <Text style={styles.totalPaymentLabel}>Tổng tiền tạm tính:</Text>
                                <Text style={styles.totalPaymentVal}>
                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price * quantity)}
                                </Text>
                            </View>

                            {/* Nút hành động */}
                            {actionType === "ADD" ? (
                                <ShopButton
                                    title="Xác nhận thêm vào giỏ hàng"
                                    onPress={handleConfirmAddToCart}
                                    style={{ marginTop: 20 }}
                                />
                            ) : (
                                <ShopButton
                                    title="Xác nhận đặt hàng ngay"
                                    onPress={handleConfirmBuyNow}
                                    style={{ marginTop: 20 }}
                                />
                            )}

                            <ShopButton
                                title="Quay lại"
                                variant="outline"
                                onPress={() => setActionType(null)}
                                style={{ marginTop: 10, marginBottom: 20 }}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        marginHorizontal: GAP / 2,
        marginBottom: GAP,
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: "100%",
        height: CARD_WIDTH - 20,
        backgroundColor: "#F8FAFC",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        padding: 8,
    },
    name: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: "500",
        height: 36,
        lineHeight: 18,
    },
    price: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "bold",
        marginVertical: 4,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
    },
    addToCartCustomBtn: {
        flex: 1,
        height: 32,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    addToCartText: {
        fontSize: 11,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    buyNowCustomBtn: {
        flex: 1.2,
        height: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buyNowText: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    // Style modal phụ đè lên
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: height * 0.75,
    },
    modalIndicator: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 12,
    },
    modalHeaderTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 16,
        textAlign: "center",
    },
    productInfoBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    smallProductImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: "#E2E8F0",
    },
    sheetProductName: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 4,
    },
    sheetProductPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 2,
    },
    sheetProductStock: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
    },
    quantitySelector: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        overflow: "hidden",
    },
    qtyBtn: {
        width: 32,
        height: 32,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.text,
    },
    qtyValue: {
        width: 40,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.text,
    },
    totalPaymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    totalPaymentLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.textLight,
    },
    totalPaymentVal: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
    },
});

export default memo(ProductCard);