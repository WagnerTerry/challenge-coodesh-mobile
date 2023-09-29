import {StyleSheet} from 'react-native';

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
    // {Platform.OS === 'ios' ? 'padding:15px;' : 'padding:12px;'},
    marginTop: 30,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: 'black',
    width: '100%',
  },
});
