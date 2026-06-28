import React, { useState, useCallback } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: Category;
}

type Category = 'Food' | 'Transpo' | 'Bills';
type FilterTab = 'All' | Category;

const CATEGORIES: Category[] = ['Food','Transpo', 'Bills'];
const FILTER_TABS: FilterTab[] = ['All', 'Food', 'Transpo', 'Bills'];

const CATAGORY_META: Record<Category, {emoji: string; color: string; bg: string }> = {
  Food:   { emoji: '🍔', color: '#92400E', bg: '#FEF3C7' },
  Transpo:{ emoji: '🚌', color: '#1E40AF', bg: '#DBEAFE' },
  Bills:  { emoji: '💡', color: '#9D174D', bg: '#FCE7F3' },
}

const C = {
  bg: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceDark: '#111827',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  accent: '#3B82F6',
  accentDim: '#DBEAFE',
  success: '#16A34A',
  successLight: '#DCFCE7',
  danger: '#EF4444',
  dangerDim: '#FEE2E2',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textLight: '#F9FAFB',
  white: '#FFFFFF',
}

{/* sa expense Item*/}
interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

function ExpenseItem({ expense, onDelete }: ExpenseItemProps){
  const meta = CATAGORY_META[expense.category]
  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      `Remove "${expense.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(expense.id) },
      ]
    );
};

return (
    <View style={styles.expenseItem}>
      {/*category emoji*/}
      <View style={[styles.expenseEmoji, { backgroundColor: meta.bg }]}>
        <Text style={styles.expenseEmojiText}>{meta.emoji}</Text>
      </View>

      {/*Name at category*/}
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseName} numberOfLines={1}>{expense.name}</Text>
        <Text style={styles.expenseCat}>{expense.category}</Text>
      </View>

      {/*magkano*/}
      <Text style={styles.expenseAmount}>
        ₱{expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
      </Text>

      {/*Delbutton*/}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.7}>
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};









export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Food');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [nextId, setNextId] = useState(1);
  {/*pag compute */}
  const totalAll = expenses.reduce((sum, ex) => sum + ex.amount, 0);

  const filteredExpenses =
    activeFilter === 'All'
      ? expenses
      : expenses.filter((ex) => ex.category === activeFilter);

 {/*action */}
  const handleAddExpense = useCallback(() => {
    const trimmedName = itemName.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedName) {
      Alert.alert('Missing Item', 'Please enter an item name.');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
      return;
    }

    const newExpense: Expense = {
      id: nextId,
      name: trimmedName,
      amount: parsedAmount,
      category: selectedCategory,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setNextId((n) => n + 1);
    setItemName('');
    setAmount('');
  }, [itemName, amount, selectedCategory, nextId]);

  const handleDelete = useCallback((id: number) => {
    setExpenses((prev) => prev.filter((ex) => ex.id !== id));
  }, []);



  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={C.surfaceDark} />

      {/* Bar*/}
      <View style={styles.topbar}>
        <Text style={styles.topBarTitle}>My Expense Tracker</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/*Total*/}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>TOTAL (ALL)</Text>
            <Text style={styles.totalAmount}>
              ₱{totalAll.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </Text>
          </View>

          {/*Input*/}
          <View style={styles.formCard}>
            <TextInput
              style={styles.input}
              placeholder="Item (Baon, Pamasahe)"
              placeholderTextColor={C.textMuted}
              value={itemName}
              onChangeText={setItemName}
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (₱)"
              placeholderTextColor={C.textMuted}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />

            {/* Category  */}
            <Text style={styles.catLabel}>SELECT CATEGORY:</Text>
            <View style={styles.catRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catBtn, selectedCategory === cat && styles.catBtnActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}>
                  <Text style={[styles.catBtnText, selectedCategory === cat && styles.catBtnTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* button */}
            <TouchableOpacity style={styles.addBtn} onPress={handleAddExpense} activeOpacity={0.85}>
              <Text style={styles.addBtnText}>+ Add Expense</Text>
            </TouchableOpacity>
          </View>

          {/* abs*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {FILTER_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.filterBtn, activeFilter === tab && styles.filterBtnActive]}
                onPress={() => setActiveFilter(tab)}
                activeOpacity={0.8}>
                <Text style={[styles.filterBtnText, activeFilter === tab && styles.filterBtnTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* List */}
          <View style={styles.listContainer}>
            {filteredExpenses.length === 0 ? (
              <Text style={styles.emptyText}>No Data Found! Tracker is Empty!</Text>
            ) : (
              filteredExpenses.map((ex) => (
                <ExpenseItem key={ex.id} expense={ex} onDelete={handleDelete} />
              ))
            )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.surface,
  },
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: C.textPrimary,
    marginBottom: 12,
  },
  totalCard: {
    backgroundColor: C.success,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.border,
  },
  totalLabel: {
    fontSize: 12,
    color: C.textLight,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: C.textLight,
  },
  formCard: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.border,
  },
  input: {
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 14,
    color: C.textPrimary,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  catLabel: {
    fontSize: 12,
    color: C.textSecondary,
    marginBottom: 8,
    fontWeight: '700',
  },
  catRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  catBtn: {
    backgroundColor: C.bg,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
  },
  catBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  catBtnText: {
    color: C.accent,
    fontWeight: '600',
  },
  catBtnTextActive: {
    color: C.textLight,
  },
  addBtn: {
    backgroundColor: C.surfaceDark,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addBtnText: {
    color: C.white,
    fontWeight: '700',
  },
  filterRow: {
    paddingVertical: 10,
    marginBottom: 16,
  },
  filterBtn: {
    backgroundColor: C.surface,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: C.border,
  },
  filterBtnActive: {
    backgroundColor: C.accentDim,
    borderColor: C.accent,
  },
  filterBtnText: {
    color: C.textPrimary,
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: C.accent,
  },
  listContainer: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: C.textSecondary,
    paddingVertical: 40,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 8,
  },
  expenseEmoji: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  expenseEmojiText: {
    fontSize: 20,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '600',
    color: C.textPrimary,
  },
  expenseCat: {
    fontSize: 12,
    color: C.textSecondary,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: C.textPrimary,
    marginLeft: 8,
  },
  deleteBtn: {
    marginLeft: 8,
    padding: 6,
  },
  deleteBtnText: {
    fontSize: 16,
    color: C.danger,
  },
  topbar: {
    backgroundColor: C.surfaceDark,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 5,
    borderBottomColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,

  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: C.textLight,
  },
});


