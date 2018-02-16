import React from 'react';
import { observer } from 'mobx-react';

class Tagger extends React.Component {
  setBound (index) {
    const { action, learner } = this.props;

    if (!learner.tags || !learner.tags.length) {
      return;
    }

    const selectedTag = learner.tags[0];

    if (!selectedTag) {
      return;
    }

    if (!action.tags) {
      action.tags = {};
    }

    let bounds = action.tags[selectedTag];

    if (!bounds) {
      bounds = [ index, index ];
    } else {
      let [ start, end ] = bounds;

      if (index > end) {
        end = index;
      } else if (index < start) {
        start = index;
      } else {
        start = end = index;
      }

      bounds = [ start, end ];
    }

    action.tags[selectedTag] = bounds;
  }

  render () {
    const { tokens, action, learner, learner: { tags = [] } } = this.props;
    const selectedTag = learner.tags && learner.tags[0];
    const renderWord = (word, index) => {
      const bounds = (action.tags && action.tags[selectedTag]) || [];
      const className = bounds[0] <= index && bounds[1] >= index ? 'tagged' : '';

      return <span key={`tagger-${index}`} className={className}
        style={tags.length ? { cursor: 'pointer' } : {}}
        onClick={() => this.setBound(index)}>
        {word}
      </span>;
    };

    return <div id='tagger'>
      <h2>{tokens.map(renderWord)}</h2>
      {tags.length ? <h3>
        Tags {tags.map(tag => <a key={`tag-${tag}`}>{tag}</a>)}
      </h3> : null}
    </div>;
  }
}

export default observer(Tagger);
