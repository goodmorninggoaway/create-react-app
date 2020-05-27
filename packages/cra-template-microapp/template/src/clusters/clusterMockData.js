export const mockClusterData = {
  clusters: [
    {
      hostsByCluster: [
        {
          clusterUid: '272000001domain-c517',
          clusterPath: 'LVS-ISDEV/Cluster1',
          clusterName: 'Cluster1',
          hostId: '10000002',
          hostname: 'Sample Host 2',
          cpuUsagePct: 68.493704029373,
          memUsagePct: 80.95039494193,
        },
        {
          clusterUid: '272000001domain-c517',
          clusterPath: 'LVS-ISDEV/Cluster1',
          clusterName: 'Cluster1',
          hostId: '10000001',
          hostname: 'Sample Host 1',
          cpuUsagePct: 48.242603129445,
          memUsagePct: 95.630633001422,
        },
      ],
      clusterInfo: {
        clusterUid: '272000001domain-c517',
        clusterPath: 'LVS-ISDEV/Cluster1',
        clusterName: 'Cluster1',
        hostCount: 2,
        vmCount: 3,
        overutilizedCount: 1,
      },
      maxHostCount: 2,
    },
    {
      hostsByCluster: [
        {
          clusterUid: '272000001domain-d628',
          clusterPath: 'LVS-ISDEV/Cluster2',
          clusterName: 'Cluster2',
          hostId: '10000003',
          hostname: 'Sample Host 3',
          cpuUsagePct: 41.947239120393,
          memUsagePct: 42.937563391002,
        },
      ],
      clusterInfo: {
        clusterUid: '272000001domain-d628',
        clusterPath: 'LVS-ISDEV/Cluster2',
        clusterName: 'Cluster2',
        hostCount: 1,
        vmCount: 2,
        overutilizedCount: 0,
      },
      maxHostCount: 2,
    },
  ],
};
