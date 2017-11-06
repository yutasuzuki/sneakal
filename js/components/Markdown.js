import React, { Component } from 'react';
import {
  Text, 
  View,
} from 'react-native';
import marked from 'marked';

class Markdown extends Component {
  constructor (props) {
    super(props);
    this.inlineStyleList = [
      'color',
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontWeight',
      'lineHeight',
      'textAlign',
      'textDecorationLine',
      'textShadowColor',
      'textShadowOffset',
      'textShadowRadius',
      'textAlignVertical',
      'fontVariant',
      'letterSpacing',
      'textDecorationColor',
      'textDecorationStyle',
      'writingDirection'
    ];
  }

  convertMarkdown() {
    const block = marked(this.props.text);
    const contexts = block.split('\n');
    return contexts.map((value, index) => {
      if (value.match(/<([^>]+)>/g)) {
        const tagContext = value.match(/<([^>]+)>/g)[0];
        const tagInner = tagContext.match(/<(.*|)>/)[1];
        const tag = tagInner.split(' ')[0].indexOf('/') === -1 ? tagInner.split(' ')[0]: 'p';
        const text = value.replace(/<\/?[^>]+>/g, '');
        const styles = this.getStyles(this.props.styles[tag]);
        if (text) {
          return (
            <View key={index} style={styles.block}>
              {/* {(() => { 
                 if (tag === 'li') { 
                   return <Text style={styles.inline}>{text}</Text>
                 }
              })()} */}
              <Text style={styles.inline}>{text}</Text>
            </View>
          );
        }
      }
    });
  }

  getStyles(style) {
    const styles = {
      inline: {},
      block: {}
    };
    for(const key in style) {
      if (this.inlineStyleList.includes(key)) {
        styles.inline[key] = style[key];
      } else {
        styles.block[key] = style[key];
      }
    }
    return styles;
  }

  render() {
    return (
      <View>
        {this.convertMarkdown().map(v => v)}
      </View>
    )
  }
}

export default Markdown;
