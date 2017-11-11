import { StyleSheet } from 'react-native';

const monoLight = '#d5d5d5';

const markdown = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: monoLight,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: monoLight,
  },
  strong: {
    fontSize: 36,
  },
  p: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 16,
  },
  liDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    borderColor: monoLight,
    borderWidth: 3,
    marginRight: 10,
    marginTop: 9,
  },
  li: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
  blockquote: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
};

export default markdown;
