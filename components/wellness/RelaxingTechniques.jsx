import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TECHNIQUES = [
  {
    id: 'breathing',
    title: 'Breathing',
    description: 'Calm your mind with breathing exercises',
    image: 'https://picsum.photos/seed/breathing/200/150',
    url: 'https://youtu.be/tybOi4hjZFQ',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Find peace through guided meditation',
    image: 'https://picsum.photos/seed/meditation/200/150',
    url: 'https://youtu.be/inpok4MKVLM',
  },
];

export default function RelaxingTechniques() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaxing Techniques</Text>

      <View style={styles.row}>
        {TECHNIQUES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={async () => {
                const supported = await Linking.canOpenURL(item.url);
                if (supported) {
                    Linking.openURL(item.url);
                } else {
                    Linking.openURL(`https://www.youtube.com/watch?v=${item.id === 'breathing' ? 'tybOi4hjZFQ' : 'inpok4MKVLM'}`);
                }
                }}
            activeOpacity={0.8}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <View style={styles.heartBadge}>
              <Text style={styles.heartEmoji}>❤️</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 110,
    backgroundColor: '#E6F4F1',
  },
  heartBadge: {
    position: 'absolute',
    bottom: 32,
    right: 8,
  },
  heartEmoji: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
});