import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert, Modal, Platform, ScrollView,
    StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { BACKGROUND_THEMES, DEFAULT_QUOTES, DEFAULT_TEMPLATES, useTheme } from '../../context/ThemeContext';

export default function CustomizationSettings({ visible, onClose }) {
  const { backgroundTheme, updateBackgroundTheme, quotes, updateQuotes, templates, updateTemplates } = useTheme();
  const [activeTab, setActiveTab] = useState('background');
  const [newQuote, setNewQuote] = useState('');
  const [newTemplate, setNewTemplate] = useState('');

  // --- Quotes ---
  const handleAddQuote = async () => {
    if (!newQuote.trim()) return;
    const updated = [...quotes, newQuote.trim()];
    await updateQuotes(updated);
    setNewQuote('');
  };

  const handleDeleteQuote = async (index) => {
    Alert.alert('Delete Quote', 'Remove this quote?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const updated = quotes.filter((_, i) => i !== index);
          await updateQuotes(updated);
        }
      },
    ]);
  };

  const handleResetQuotes = async () => {
    Alert.alert('Reset Quotes', 'Restore default quotes?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', onPress: async () => await updateQuotes(DEFAULT_QUOTES) },
    ]);
  };

  // --- Templates ---
  const handleAddTemplate = async () => {
    if (!newTemplate.trim()) return;
    const updated = [
      ...templates,
      { id: Date.now().toString(), label: newTemplate.trim(), prompt: newTemplate.trim() }
    ];
    await updateTemplates(updated);
    setNewTemplate('');
  };

  const handleDeleteTemplate = async (id) => {
    Alert.alert('Delete Template', 'Remove this template?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const updated = templates.filter((t) => t.id !== id);
          await updateTemplates(updated);
        }
      },
    ]);
  };

  const handleResetTemplates = async () => {
    Alert.alert('Reset Templates', 'Restore default templates?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', onPress: async () => await updateTemplates(DEFAULT_TEMPLATES) },
    ]);
  };

  const TABS = [
    { id: 'background', label: 'Background', icon: 'palette' },
    { id: 'quotes', label: 'Quotes', icon: 'format-quote' },
    { id: 'templates', label: 'Templates', icon: 'description' },
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customization</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}>
              <MaterialIcons
                name={tab.icon}
                size={18}
                color={activeTab === tab.id ? Colors.primary : Colors.textLight}
              />
              <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          {/* Background Tab */}
          {activeTab === 'background' && (
            <View>
              <Text style={styles.sectionTitle}>Choose Background Theme</Text>
              <View style={styles.themeGrid}>
                {BACKGROUND_THEMES.map((theme) => (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeCard,
                      backgroundTheme.id === theme.id && styles.themeCardSelected,
                    ]}
                    onPress={() => updateBackgroundTheme(theme)}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={theme.colors}
                      style={styles.themePreview}
                    />
                    <Text style={styles.themeLabel}>{theme.label}</Text>
                    {backgroundTheme.id === theme.id && (
                      <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={Colors.primary}
                        style={styles.themeCheck}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <View>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>My Quotes</Text>
                <TouchableOpacity onPress={handleResetQuotes}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              </View>

              {/* Add Quote */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a new quote..."
                  placeholderTextColor={Colors.textLight}
                  value={newQuote}
                  onChangeText={setNewQuote}
                  multiline
                />
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={handleAddQuote}>
                  <MaterialIcons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Quote List */}
              <View style={styles.card}>
                {quotes.map((quote, index) => (
                  <View key={index}>
                    <View style={styles.itemRow}>
                      <MaterialIcons name="format-quote" size={18} color={Colors.primary} />
                      <Text style={styles.itemText}>{quote}</Text>
                      <TouchableOpacity onPress={() => handleDeleteQuote(index)}>
                        <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                    {index < quotes.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <View>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Journal Templates</Text>
                <TouchableOpacity onPress={handleResetTemplates}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              </View>

              {/* Add Template */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a new template..."
                  placeholderTextColor={Colors.textLight}
                  value={newTemplate}
                  onChangeText={setNewTemplate}
                />
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={handleAddTemplate}>
                  <MaterialIcons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Template List */}
              <View style={styles.card}>
                {templates.map((template, index) => (
                  <View key={template.id}>
                    <View style={styles.itemRow}>
                      <MaterialIcons name="description" size={18} color={Colors.primary} />
                      <Text style={styles.itemText}>{template.label}</Text>
                      <TouchableOpacity onPress={() => handleDeleteTemplate(template.id)}>
                        <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                    {index < templates.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', padding: 12, gap: 6,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabLabel: { fontSize: 13, color: Colors.textLight, fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
  content: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 15, fontWeight: '700',
    color: Colors.textPrimary, marginBottom: 12,
  },
  themeGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  themeCard: {
    width: '46%', borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#fff', borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  themeCardSelected: { borderColor: Colors.primary },
  themePreview: { height: 80, width: '100%' },
  themeLabel: {
    fontSize: 13, fontWeight: '600',
    color: Colors.textPrimary, padding: 8, textAlign: 'center',
  },
  themeCheck: { position: 'absolute', top: 8, right: 8 },
  rowBetween: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  resetText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: Colors.textPrimary,
    borderWidth: 1, borderColor: Colors.border,
  },
  addBtn: {
    backgroundColor: Colors.primary, borderRadius: 12,
    width: 48, alignItems: 'center', justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, gap: 10,
  },
  itemText: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 14 },
});