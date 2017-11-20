const R = require('ramda');

const formatPod = R.applySpec({
  name: R.path(['metadata', 'name']),
  labels: R.path(['metadata', 'labels']),
  created: R.path(['metadata', 'creationTimestamp']),
  containers: R.pipe(
    R.path(['spec', 'containers']),
    R.map(
      R.pick(['image', 'ports'])
    )
  ),
});

const formatPods = pods => pods.map(formatPod);

module.exports = {
  formatPods,
};