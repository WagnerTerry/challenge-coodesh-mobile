import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#b4bec7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
  },
  input: {
    backgroundColor: '#099',
    color: '#f1f1f1',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 16 : 12,
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: 'black',
    width: '100%',
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
