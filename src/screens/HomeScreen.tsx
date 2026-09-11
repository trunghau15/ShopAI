import React, { useState, useCallback, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import ProductCard from "@components/ui/ProductCard";
import ShopButton from "@components/ui/ShopButton";
import { MOCK_PRODUCTS, Product } from "@data/mockProducts";
import { COLORS, SIZES } from "@constants/theme";
import type { HomeStackParamList } from "@navigation/HomeStackNavigator";

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, "Home">;

interface HomeScreenProps {
    onLogout: () => void;
}

const HomeScreen = ({ onLogout }: HomeScreenProps) => {
    const navigation = useNavigation<HomeNavProp>();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterVisible, setFilterVisible] = useState(false);

    // Đặt mức giá mặc định là 50 triệu để hiển thị toàn bộ 30 sản phẩm ngay khi vào app
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(50000000);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

    // Lọc sản phẩm theo từ khóa tìm kiếm và mức giá
    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesPrice = item.price <= selectedMaxPrice;
            return matchesSearch && matchesPrice;
        });
    }, [products, searchQuery, selectedMaxPrice]);

    // Giả lập Pull-to-refresh
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setProducts([...MOCK_PRODUCTS].sort(() => Math.random() - 0.5));
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <View style={styles.container}>
                {/* Header AppBar, Thanh Tìm Kiếm & Nút Đăng Xuất */}
                <View style={styles.header}>
                    <View style={styles.headerTopRow}>
                        <Text style={styles.headerTitle}>Khám phá ShopAI</Text>
                        <ShopButton
                            title="Thoát"
                            onPress={onLogout}
                            style={styles.logoutBtn}
                            textStyle={{ fontSize: 12 }}
                        />
                    </View>
                    <View style={styles.searchRow}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm tai nghe, thiết bị..."
                            placeholderTextColor={COLORS.textLight}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity
                            style={styles.filterBtn}
                            onPress={() => setFilterVisible(true)}
                        >
                            <Text style={styles.filterBtnText}>Lọc</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Danh sách FlashList lưới 2 cột hiển thị trọn vẹn toàn bộ sản phẩm */}
                <FlashList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductCard product={item} />
                    )}
                    numColumns={2}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    contentContainerStyle={{ padding: SIZES.padding / 2 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                Không tìm thấy sản phẩm phù hợp với mức giá này!
                            </Text>
                        </View>
                    }
                />

                {/* Modal Bộ Lọc Nâng Cao (Filter Bottom Sheet / Modal) */}
                <Modal
                    visible={filterVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setFilterVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Bộ lọc nâng cao</Text>

                            <Text style={styles.filterLabel}>
                                Mức giá tối đa:{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(selectedMaxPrice)}
                            </Text>

                            <View style={styles.priceOptionsRow}>
                                {/* Các mốc lọc giá thực tế phù hợp với dải sản phẩm thực tế */}
                                {[15000000, 30000000, 50000000].map((price) => (
                                    <TouchableOpacity
                                        key={price}
                                        style={[
                                            styles.priceOptionChip,
                                            selectedMaxPrice === price &&
                                            styles.priceOptionChipActive,
                                        ]}
                                        onPress={() => setSelectedMaxPrice(price)}
                                    >
                                        <Text
                                            style={[
                                                styles.priceOptionText,
                                                selectedMaxPrice === price &&
                                                styles.priceOptionTextActive,
                                            ]}
                                        >
                                            &lt; {price / 1000000} Triệu
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <ShopButton
                                title="Áp dụng bộ lọc"
                                onPress={() => setFilterVisible(false)}
                                style={{ marginTop: 20 }}
                            />
                            <ShopButton
                                title="Đóng"
                                variant="outline"
                                onPress={() => setFilterVisible(false)}
                                style={{ marginTop: 10 }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 12,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: SIZES.h2,
        fontWeight: "bold",
        color: COLORS.text,
    },
    logoutBtn: {
        width: 70,
        height: 32,
        backgroundColor: COLORS.textLight,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        height: 42,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: 12,
        backgroundColor: COLORS.background,
        fontSize: SIZES.body2,
        color: COLORS.text,
    },
    filterBtn: {
        marginLeft: 8,
        height: 42,
        paddingHorizontal: 16,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        justifyContent: "center",
        alignItems: "center",
    },
    filterBtnText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: SIZES.body2,
    },
    emptyContainer: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        color: COLORS.textLight,
        fontSize: SIZES.body1,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: SIZES.h1,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: SIZES.body1,
        color: COLORS.text,
        marginBottom: 12,
    },
    priceOptionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    priceOptionChip: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        alignItems: "center",
    },
    priceOptionChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    priceOptionText: {
        fontSize: SIZES.small,
        color: COLORS.text,
    },
    priceOptionTextActive: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default HomeScreen;