import React from 'react';
import each from 'lodash/each';
import map from 'lodash/map';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';

import Component from './base';
import app from '../app';
import Typer from './typer';

class Tagger extends Component {
  get selectedTag() {
    if(this.state.selectedTag) {
      return this.state.selectedTag;
    }

    if(this.props.learner && this.props.learner.tags) {
      return this.props.learner.tags[0];
    }

    return null;
  }

  setBound(index) {
    const selectedTag = this.selectedTag;

    if(!this.props.learner.tags || !this.props.learner.tags.length || !selectedTag) {
      return;
    }

    const action = cloneDeep(this.props.action);
    
    if(!action.tags) {
      action.tags = {};
    }

    let bounds = action.tags[selectedTag];

    if(!bounds) {
      bounds = [ index, index ];
    } else {
      let [ start, end ] = bounds;

      if(index > end) {
        end = index;
      } else if(index < start) {
        start = index;
      } else {
        start = end = index;
      }

      bounds = [ start, end ];
    }

    action.tags[selectedTag] = bounds;

    app.state.action = action;
  }

  render() {
    const { action, learner, classification } = this.props;
    const words = this.props.classification.tokens;
    const renderWord = (word, index) => {
      const bounds = (action.tags && action.tags[this.selectedTag]) || [];
      const className = bounds[0] <= index && bounds[1] >= index ? 'tagged' : '';

      return <span key={`${classification._id}-${index}`} className={className}
        onClick={() => this.setBound(index)}>
          {word}
      </span>
    }
    const renderTag = tag => <span className={tag === this.selectedTag ? 'tagged' : ''}
      key={tag} onClick={() => this.setState({ selectedTag: tag })}>
        {tag}
    </span>

    const tags = learner.tags || [];

    return <div id="tagger">
      <h2>{words.map(renderWord)}</h2>
      {tags.length > 1 ? <div><strong>Tags:</strong> {tags.map(renderTag)}</div> : null}
    </div>
  }
}

export default Tagger;
