const App = require('../../../models/App');
const k8s = require('@kubernetes/client-node');
const Logger = require('../../../utils/Logger');
const logger = new Logger();
const loadConfig = require('../../../utils/loadConfig');


const gatewayRoutes = [
  { type: 'httproutes', version: 'v1' },
  { type: 'httproutes', version: 'v1beta1' },
  { type: 'tcproutes', version: 'v1alpha2' },
   { type: 'grpcroutes', version: 'v1alpha2' },
   { type: 'tlsroutes', version: 'v1alpha2' },
   { type: 'udproutes', version: 'v1alpha2' }
];

const useKubernetes = async (apps) => {
  const { useOrdering: orderType, unpinStoppedApps } = await loadConfig();

  let ingresses = null;
  let routeData = [];

  try {
    const kc = new k8s.KubeConfig();
    kc.loadFromCluster();

    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    await k8sNetworkingV1Api.listIngressForAllNamespaces().then((res) => {
      ingresses = res.body.items;
    });

    const customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);
    for (let route of gatewayRoutes) {
      await customObjectsApi.listClusterCustomObject('gateway.networking.k8s.io', route.version, route.type).then((res) => {
        res.body.items.forEach(item => routeData.push({ ...item, routeType: route.type }));
      }).catch(error => {
        logger.log(`Error fetching ${route.type}: ${error.message}`, 'ERROR');
      });
    }
  } catch {
    logger.log("Can't connect to the Kubernetes API", 'ERROR');
    logger.log(error.message, 'ERROR');
  }

  if (ingresses || routeData.length > 0) {
    apps = await App.findAll({
      order: [[orderType, 'ASC']],
    });

    ingresses = ingresses.filter(
      (e) => Object.keys(e.metadata.annotations).length !== 0
    );

    routeData = routeData.filter(
      item => item.metadata &&
        item.metadata.annotations &&
        Object.keys(item.metadata.annotations).length !== 0
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
          icon: annotations['flame.pawelmalak/icon'] || 'kubernetes',
        });
      }
    }

    for (const item of routeData) {
      const annotations = item.metadata.annotations || {};

      if (/^app/.test(annotations['flame.pawelmalak/type'])) {
        if (item.spec && item.spec.hostnames) {
          item.spec.hostnames.forEach(hostname => {
            kubernetesApps.push({
              name: annotations['flame.pawelmalak/name'] || item.metadata.name,
              url: annotations['flame.pawelmalak/url'] || hostname,
              icon: annotations['flame.pawelmalak/icon'] || 'kubernetes',
              type: item.routeType.toUpperCase()
            });
          });
        }
      }
    }

    const uniqueApps = Array.from(new Set(kubernetesApps.map(app => JSON.stringify(app)))).map(item => JSON.parse(item));

    if (unpinStoppedApps) {
      for (const app of apps) {
        await app.update({ isPinned: false });
      }
    }

    for (const item of uniqueApps) {
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
