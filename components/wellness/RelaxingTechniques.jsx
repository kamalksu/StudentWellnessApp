import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TECHNIQUES = [
  {
    id: 'breathing',
    title: 'Breathing',
    description: '2 Minute Breathing Exercise to Calm Anxiety',
    image: 'https://picsum.photos/seed/breathing/200/150',
    url: 'https://youtu.be/e8NYHuPuUwY?si=ev60jlT25eWCxGX9',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: '2-Minute Guided Meditation to Release Stress',
    image: 'https://picsum.photos/seed/meditation/200/150',
    url: 'https://youtu.be/vLhOGEnEedk?si=ik3uJPhtp5-FNLJj',
  },
];

export default function RelaxingTechniques() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a moment to reset</Text>

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