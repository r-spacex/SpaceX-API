$launchpads = {
  test_locations: [
    {
        id: 'RDF',
        name: 'Rocket Development Facility',
        city: 'McGregor',
        state: 'Texas',
        size_acres: 4000,
        year_built: 2003,
        engines_tested: {
          engine_1: 'Merlin',
          engine_2: 'Draco'
        },
        yearly_tests: 400,
        daily_tests: 2
    }
  ],
  launchpads: [
      {
        id: 'kwajalein_atoll',
        full_name: 'unknown',
        status: 'retired',
        location: {
            name: 'Omelek Island',
            region: 'Marshall Islands',
            latitude: 9.0477206,
            longitude: 167.7431292
        },
        vehicles_launched: 'falcon 1',
        details: 'SpaceX original launch site, where all of the Falcon 1 launches occured. Abandoned as SpaceX decided against upgrading the pad to support Falcon 9.'
    },
      {
        id: 'ccafs_slc_40',
      full_name: 'Cape Canaveral Air Force Station Space Launch Complex 40',
      status: 'under construction',
      location: {
        name: 'Cape Canaveral',
        region: 'Florida',
        latitude: 28.5618571,
        longitude: -80.577366
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Initially used to launch Titan rockets for Lockheed Martin. Heavily damaged by the AMOS-6 anomaly with repairs expected to be complete by late summer 2017.'
    },
    {
        id: 'ccafs_lc_13',
      full_name: 'Cape Canaveral Air Force Station Space Launch Complex 13',
      status: 'active',
      location: {
        name: 'Cape Canaveral',
        region: 'Florida',
        latitude: 28.4857244,
        longitude: -80.5449222
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX east coast landing pad, where the historic first landing occurred. Originally used for early Atlas missiles and rockets from Lockheed Martin. Currently being expanded to add two smaller pads for Falcon Heavy RTLS missions.'
    },
    {
        id: 'ksc_lc_39a',
      full_name: 'Kennedy Space Center Launch Complex 39A',
      status: 'active',
      location: {
        name: 'Cape Canaveral',
        region: 'Florida',
        latitude: 28.6080585,
        longitude: -80.6039558
      },
      vehicles_launched: 'falcon 9',
      details: 'NASA historic launch pad that launched most of the Saturn V and Space Shuttle missions. Initially for Falcon Heavy launches, it is now launching all of SpaceX east coast missions due to the damage from the AMOS-6 anomaly. After SLC-40 repairs are complete, it will be upgraded to support Falcon Heavy, a process which will take about two months. In the future it will launch commercial crew missions and the Interplanetary Transport System.'
    },
    {
        id: 'vafb_slc_3w',
      full_name: 'Vandenberg Air Force Base Space Launch Complex 3W',
      status: 'retired',
      location: {
        name: 'Vandenberg Air Force Base',
        region: 'California',
        latitude: 34.6440904,
        longitude: -120.5931438
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX original west coast launch pad for Falcon 1. Performed a static fire but was never used for a launch and abandoned due to scheduling conflicts.'
    },
     {
         id: 'vafb_slc_4e',
      full_name: 'Vandenberg Air Force Base Space Launch Complex 4E',
      status: 'active',
      location: {
        name: 'Vandenberg Air Force Base',
        region: 'California',
        latitude: 34.6440904,
        longitude: -120.5931438
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX primary west coast launch pad for polar orbits and sun synchronous orbits, primarily used for Iridium. Also intended to be capable of launching Falcon Heavy.'
    },
    {
        id: 'vafb_slc_4w',
      full_name: 'Vandenberg Air Force Base Space Launch Complex 4W',
      status: 'active',
      location: {
        name: 'Vandenberg Air Force Base',
        region: 'California',
        latitude: 34.6332043,
        longitude: -120.6156234
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX west coast landing pad, has not yet been used. Expected to first be used during the Formosat-5 launch.'
    },
    {
        id: 'stls',
      full_name: 'SpaceX South Texas Launch Site',
      status: 'under construction',
      location: {
        name: 'Boca Chica Village',
        region: 'Texas',
        latitude: 25.9972641,
        longitude: -97.1560845
      },
      vehicles_launched: 'falcon 9',
      details: 'SpaceX new launch site currently under construction to help keep up with the Falcon 9 and Heavy manifests. Expected to be completed in late 2018. Initially will be limited to 12 flights per year, and only GTO launches.'
    }
  ]
}
