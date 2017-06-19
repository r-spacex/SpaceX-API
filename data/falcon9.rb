$falcon9 = {
  data: {  
    name: "Falcon 9",
    stages: "2",
    height: {
      meters: "70",
      feet: "229.6"
    },
    diameter: {
      meters: "3.7",
      feet: "12"
    },
    mass: {
      kg: "549,054",
      lb: "1,207,920"
    },
    payload_weight: {
      leo: {
        name: "Low Earth Orbit",
        kg: "22,800",
        lb: "50,265"
      },
      gto: {
        name: "Geosynchronous Transfer Orbit",
        kg: "8,300",
        lb: "18,300"
      },
      mars: {
        name: "Mars",
        kg: "4,020",
        lb: "8,860"
      },
    },
    stage_1: {
      engines: "9",
      reusable: "true",
      burn_time_sec: "162",
      sea_level_thrust: {
        kN: "7,607",
        lbf: "1,710,000"
      },
      vacuum_thrust: {
        kN: "8,227",
        lbf: "1,849,500"
      }
    },
    stage_2: {
      engines: "1",
      burn_time_sec: "397",
      sea_level_thrust: {
        kN: "934",
        lbf: "210,000"
      }
    },
    payload_containers: {
      option_1: "Dragon",
      option_2: "Dragon Trunk",
      option_3: "Composite Fairing"
    },
    launch_site_1: {
      name: "Launch Complex 40",
      location: "Cape Canavaral",
      state: "Florida"
    },
    launch_site_2: {
      name: "Space Launch Center 4",
      location: "Vanderberg Air Force Base",
      state: "California"
    },
    launch_site_3: {
      name: "Launch Complex 39",
      location: "Kennedy Space Center",
      state: "Florida"
    },
    description: "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit."
  }
}
