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
      const name = ingress.metadata.name;
      let url = "http://" + ingress.spec.rules[0].host;
      if (ingress.spec.tls?.[0].hosts?.[0]]) {
        url = "https://" + ingress.spec.tls[0].hosts[0];
      }

      if ('flame.pawelmalak/enabled' in annotations) {
        kubernetesApps.push({
          name: annotations['flame.pawelmalak/name'] || name,
          url: annotations['flame.pawelmalak/url'] || url,
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
