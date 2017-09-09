import React from 'react';

import Learner from '../components/learner';

export default function (sam) {
  sam.action('learn', function (el) {
    sam.previousClassification = null;

    return sam.render(<Learner sam={sam} />, el);
  });
}
