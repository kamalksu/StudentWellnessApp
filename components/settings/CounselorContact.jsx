import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function CounselorContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.needHelp}>
        Need help immediately? You're not alone.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}>
        <MaterialIcons name="school" size={22} color={Colors.primary} />
        <Text style={styles.label}>Counselor Contact</Text>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={22}
          color="#888"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedCard}>
          <Text style={styles.counselorName}>KSU Counseling Services</Text>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('tel:+14705786600')}>
            <MaterialIcons name="phone" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>(470) 578-6600</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('mailto:counseling@kennesaw.edu')}>
            <MaterialIcons name="email" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>counseling@kennesaw.edu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('https://counseling.kennesaw.edu')}>
            <MaterialIcons name="link" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>counseling.kennesaw.edu</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  needHelp: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  expandedCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    gap: 12,
  },
  counselorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});