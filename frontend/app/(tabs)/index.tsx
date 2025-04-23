import { Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

const PLANTS = [
  { id: '1', name: 'มอนสเตอร่า' },
  { id: '2', name: 'ยางอินเดีย' },
  { id: '3', name: 'ลิ้นมังกร' },
  { id: '4', name: 'เฟิร์นบอสตัน' },
];

export default function HomeScreen() {
  const router = useRouter();

  const handlePlantPress = (plantName: string) => {
    // ใช้ router.push เพื่อไปยังหน้า plant-detail.tsx
    router.push(`/plant-detail?name=${encodeURIComponent(plantName)}`);
  };

  return (
    <FlatList
      data={PLANTS}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Image
            source={require('../../assets/images/plant-banner.jpg')}
            style={styles.headerImage}
          />
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">🌱 ยินดีต้อนรับสู่แอปดูแลต้นไม้</ThemedText>
            <ThemedText>เลือกพันธุ์ต้นไม้ที่คุณต้องการดูแล</ThemedText>
          </ThemedView>
        </>
      }
      contentContainerStyle={styles.plantList}
      renderItem={({ item }) => (
        <Pressable
          style={styles.plantItem}
          onPress={() => handlePlantPress(item.name)} // เมื่อกดที่ต้นไม้, จะไปที่หน้า plant-detail
        >
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  headerImage: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
  },
  plantList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  plantItem: {
    padding: 16,
    backgroundColor: '#E4F2E7',
    borderRadius: 12,
    marginBottom: 12,
  },
});
