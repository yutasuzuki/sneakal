import React, { Component } from 'react';
import {
  Text, 
  View,
} from 'react-native';
import marked from 'marked';
import CONSTANTS from '../Constants';

class Markdown extends Component {
  constructor (props) {
    super(props);
  }

  getTagName(value) {
    const tagContext = value.match(/<([^>]+)>/g)[0];
    const tagInner = tagContext.match(/<(.*|)>/)[1];
    return tagInner.split(' ')[0].indexOf('/') === -1 ? tagInner.split(' ')[0]: 'p';
  }

  convertMarkdown() {
    const block = marked(this.props.text);
    const contexts = block.split('\n');
    return contexts.map((value, index) => {
      if (value.match(/<([^>]+)>/g)) {
        const tag = this.getTagName(value);
        const text = value.replace(/<\/?[^>]+>/g, '');
        const styles = this.getStyles(this.props.styles[tag]);
        if (text) {
          return (
            <View key={index} style={styles.block}>
              {(() => { 
                if (tag === 'li') { 
                  return <Text style={this.props.styles.liDot}></Text>
                }
              })()}
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
      if (CONSTANTS.INLINE_STYLE_LIST.includes(key)) {
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
