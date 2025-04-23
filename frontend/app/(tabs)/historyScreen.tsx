import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

// ข้อมูลตัวอย่างของประวัติการรดน้ำและให้ปุ๋ย
const historyData = [
  { id: '1', date: '2025-04-10', type: 'รดน้ำ', status: 'สำเร็จ' },
  { id: '2', date: '2025-04-12', type: 'ให้ปุ๋ย', status: 'สำเร็จ' },
  { id: '3', date: '2025-04-15', type: 'รดน้ำ', status: 'ล้มเหลว' },
  { id: '4', date: '2025-04-20', type: 'ให้ปุ๋ย', status: 'สำเร็จ' },
];

export default function WateringHistoryScreen() {
  const [history, setHistory] = useState(historyData);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <ThemedText type="defaultSemiBold">{item.date}</ThemedText>
        <ThemedText>{item.type}</ThemedText>
        <ThemedText>{item.status}</ThemedText>
      </View>
    </View>
  );

  const handleAddRecord = () => {
    // เพิ่มข้อมูลใหม่ หรือเปิดหน้าจอสำหรับเพิ่มข้อมูล
    alert('เพิ่มการบันทึกใหม่');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">ประวัติการรดน้ำและให้ปุ๋ย</ThemedText>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.historyList}
      />

      <Pressable style={styles.addButton} onPress={handleAddRecord}>
        <Text style={styles.addButtonText}>+ เพิ่มการบันทึกใหม่</Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  historyList: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#F1F8E9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#A1D99B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
});
