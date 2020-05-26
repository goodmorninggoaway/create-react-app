import { groupBy } from 'underscore';
import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { mockClusterData, mockHostsByCluster } from '../clusterMockData';
import { CLUSTERS_FETCH, RESET } from './constants';

const groupById = clusters => groupBy(clusters, 'clusterUid');

function sortByCpu(a, b) {
  const cpuUsage1 = a.cpuUsagePct;
  const cpuUsage2 = b.cpuUsagePct;
  if (cpuUsage1 < cpuUsage2) {
    return 1;
  } else if (cpuUsage1 > cpuUsage2) {
    return -1;
  }
  return 0;
}

export function fetchClusterCards() {
  return dispatch => {
    const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(CLUSTERS_FETCH, dispatch);
    dispatchStart();

    try {
      const hostsByCluster = mockHostsByCluster.data;
      const clusters = mockClusterData.data;

      const sortedHostData = hostsByCluster && hostsByCluster.data.data.filter(host => host.clusterUid).sort(sortByCpu);

      const hostsData = groupById(sortedHostData);
      const clustersData = groupById(clusters.data.data);
      const hostCountByCluster = Object.keys(hostsData).map(clusterUid => hostsData[clusterUid].length);
      const maxHostCount = Math.max(...hostCountByCluster);
      const clustersSummary = Object.keys(clustersData).map(clusterUid => {
        // The host is overutilized if either cpuUsagePct or memUsagePct is greater than 80% or 90% respectively.
        const overutilizedHosts = hostsData[clusterUid]
          ? hostsData[clusterUid].filter(cluster => cluster.cpuUsagePct >= 80 || cluster.memUsagePct >= 90)
          : null;

        /* The cards are sorted on overutilizedHosts count.
            Assigning -1 to sort and display the clusters with no hosts at the end of all cards */
        const overutilizedCount = overutilizedHosts ? overutilizedHosts.length : -1;
        return {
          hostsByCluster: hostsData[clusterUid],
          clusterInfo: { ...clustersData[clusterUid][0], overutilizedCount },
          clusterAll: clusters,
          maxHostCount,
        };
      });

      const sortedClustersSummary = clustersSummary.sort((a, b) => {
        const countA = a.clusterInfo.overutilizedCount;
        const countB = b.clusterInfo.overutilizedCount;
        if (countA < countB) {
          return 1;
        } else if (countA > countB) {
          return -1;
        }
        return 0;
      });

      const clusterData = {
        clusters: sortedClustersSummary,
        hostsInClusters: sortedHostData.length === 0 ? 12 : 6, // PAGE_SIZE
      };

      dispatchSuccess(clusterData);
    } catch (e) {
      dispatchError(e);
    }
  };
}

export function reset() {
  return { type: RESET };
}
