const App = require('../../../models/App');
const k8s = require('@kubernetes/client-node');
const Logger = require('../../../utils/Logger');
const logger = new Logger();
const loadConfig = require('../../../utils/loadConfig');

const useKubernetes = async (apps) => {
  const { useOrdering: orderType, unpinStoppedApps } = await loadConfig();

  let ingresses = null;

  try {
    const kc = new k8s.KubeConfig();
    kc.loadFromCluster();
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    await k8sNetworkingV1Api.listIngressForAllNamespaces().then((res) => {
      ingresses = res.body.items;
    });
  } catch {
    logger.log("Can't connect to the Kubernetes API", 'ERROR');
  }

  if (ingresses) {
    apps = await App.findAll({
      order: [[orderType, 'ASC']],
    });

    ingresses = ingresses.filter(
      (e) => Object.keys(e.metadata.annotations).length !== 0
    );

    const kubernetesApps = [];

    for (const ingress of ingresses) {
      const annotations = ingress.metadata.annotations;

      if (
        'flame.pawelmalak/name' in annotations &&
        'flame.pawelmalak/url' in annotations &&
        /^app/.test(annotations['flame.pawelmalak/type'])
      ) {
        kubernetesApps.push({
          name: annotations['flame.pawelmalak/name'],
          url: annotations['flame.pawelmalak/url'],
          description: annotations['flame.pawelmalak/description'],
          icon: annotations['flame.pawelmalak/icon'] || 'kubernetes',
        });
      }
    }

    if (unpinStoppedApps) {
      for (const app of apps) {
        await app.update({ isPinned: false });
      }
    }

    for (const item of kubernetesApps) {
      if (apps.some((app) => app.name === item.name)) {
        const app = apps.find((a) => a.name === item.name);
        await app.update({ ...item, isPinned: true });
      } else {
        await App.create({
          ...item,
          isPinned: true,
        });
      }
    }
  }
};

module.exports = useKubernetes;
