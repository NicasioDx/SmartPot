import { StyleSheet, Image, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // ใช้ไอคอน
import { useRouter } from 'expo-router'; // การนำทาง

type PlantCareDetail = {
  humidity: string;
  nutrients: string;
  light: string;
  image: any;
};

const getPlantCareInfo = async (plantName: string): Promise<PlantCareDetail> => {
  const mockData: Record<string, PlantCareDetail> = {
    'มอนสเตอร่า': {
      humidity: 'ชอบความชื้นปานกลางถึงสูง',
      nutrients: 'ควรใส่ปุ๋ยสูตรเสมอเดือนละ 1 ครั้ง',
      light: 'แสงแดดรำไรหรือแสงสว่างในร่ม',
      image: require('@/assets/images/plant-banner.jpg'),
    },
    // ...เพิ่มเติมตามต้องการ
  };

  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockData[plantName] || {
    humidity: 'ไม่พบข้อมูล',
    nutrients: 'ไม่พบข้อมูล',
    light: 'ไม่พบข้อมูล',
    image: require('@/assets/images/icon.png'),
  };
};

export default function PlantDetailScreen() {
  const { name } = useLocalSearchParams();
  const [careInfo, setCareInfo] = useState<PlantCareDetail | null>(null);
  const [lightOn, setLightOn] = useState<boolean>(true);
  const router = useRouter(); // ใช้ useRouter เพื่อทำการนำทาง

  const fetchCareInfo = async (plantName: string) => {
    const info = await getPlantCareInfo(plantName);
    setCareInfo(info);
  };

  useEffect(() => {
    if (typeof name === 'string') {
      fetchCareInfo(name);
    }
  }, [name]);

  const handleWaterPlant = () => {
    alert('💧 ทำการรดน้ำต้นไม้แล้ว!');
  };

  const handleToggleLight = () => {
    setLightOn(prev => !prev);
    alert(`💡 ไฟถูก${lightOn ? 'ปิด' : 'เปิด'}แล้ว`);
  };

  const goToWateringHistory = () => {
    router.push('/historyScreen'); // นำทางไปหน้าประวัติการรดน้ำและให้ปุ๋ย
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">🪴 ข้อมูลการดูแลต้นไม้</ThemedText>

      {careInfo ? (
        <>
          {/* รูปภาพและปุ่มประวัติการรดน้ำ */}
          <View style={styles.imageContainer}>
            <Image source={careInfo.image} style={styles.image} />
            <Pressable style={styles.historyButton} onPress={goToWateringHistory}>
              <MaterialIcons name="history" size={24} color="white" />
            </Pressable>
          </View>

          <ThemedText type="defaultSemiBold" style={styles.section}>🌡 ความชื้น:</ThemedText>
          <ThemedText>{careInfo.humidity}</ThemedText>

          <ThemedText type="defaultSemiBold" style={styles.section}>🌱 แร่ธาตุในดิน:</ThemedText>
          <ThemedText>{careInfo.nutrients}</ThemedText>

          <ThemedText type="defaultSemiBold" style={styles.section}>☀️ ความเข้มแสง:</ThemedText>
          <ThemedText>{careInfo.light}</ThemedText>

          {/* ปุ่มควบคุม */}
          <Pressable style={styles.button} onPress={handleWaterPlant}>
            <Text style={styles.buttonText}>💧 รดน้ำต้นไม้</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleToggleLight}>
            <Text style={styles.buttonText}>
              💡 {lightOn ? 'ปิดไฟ' : 'เปิดไฟ'}
            </Text>
          </Pressable>
        </>
      ) : (
        <ThemedText>กำลังโหลดข้อมูล...</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  historyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00000080',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 12,
  },
  button: {
    backgroundColor: '#A1D99B',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
});
