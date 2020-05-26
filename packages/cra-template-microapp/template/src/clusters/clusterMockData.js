export const mockClusterData = {
  data: [
    {
      accountId: '001S000000m1h8CIAQ',
      systemId: 'AF-122215',
      virtualCenterUid: 272000001,
      dataCenterUid: 272500056,
      clusterUid: '272000001domain-c517',
      clusterPath: 'LVS-ISDEV/Cluster2',
      clusterName: 'Cluster2',
      hostCount: 3,
      vmCount: 134,
      cpuCount: 6,
      memoryBytes: 1648910499840,
      capacityBytes: 63766842572800,
      overutilizedCount: 3,
    },
  ],
};

export const hostsByCluster = {
  data: [
    {
      accountId: '001S000000m1h8CIAQ',
      systemId: 'AF-107835',
      hostUid: 2229250191,
      virtualCenterUid: 272000001,
      dataCenterUid: 272500056,
      clusterUid: '272000001domain-c517',
      clusterPath: 'LVS-ISDEV/Cluster2',
      clusterName: 'Cluster2',
      hostId: 2229250191,
      hostname: 'lvsisdev1-13-u34-esx5.lvs.nimblestorage.com',
      vcenterName: 'is-vcenter.lvs.nimblestorage.com',
      version: '6.0.0',
      fullVersion: 'VMware ESXi 6.0.0 build-3620759',
      cpuUsagePct: 48.242603129445,
      cpuReadyPct: 1.927636320531,
      memUsagePct: 95.630633001422,
      memSwapKibs: 346.076102418208,
      memBalloonMib: 209.153419635713,
    },
  ],
};
