const R = require('ramda');

const _common = {
  name: R.path(['metadata', 'name']),
  labels: R.path(['metadata', 'labels']),
  created: R.path(['metadata', 'creationTimestamp']),
  deleted: R.path(['metadata', 'deletionTimestamp'])
};

const _getContainer = R.pipe(
  R.path(['spec', 'containers']),
  R.head,
);

const _getDeploymentContainer = R.pipe(
  R.path(['spec', 'template']),
  _getContainer,
);

const _formatContainer = R.pick(['image', 'ports']);

const _container = {
  container: R.pipe(
    _getContainer,
    _formatContainer,
  ),
};

const _deploymentContainer = {
  container: R.pipe(
    _getDeploymentContainer,
    _formatContainer,
  ),
};

const _deploymentResources = {
  resources: R.pipe(
    _getDeploymentContainer,
    R.path(['resources', 'requests']),
  )
};

const formatPod = R.applySpec({
  ..._common,
  ..._container,
});

const formatDeployment = R.applySpec({
  ..._common,
  ..._deploymentContainer,
  ..._deploymentResources,
});

const formatPods = pods => pods.map(formatPod);
const formatDeployments = deployments => deployments.map(formatDeployment);

module.exports = {
  formatPods,
  formatDeployments,
};


function debugPipe(val) {
  console.log(val);
  return val;
}