$falcon1 = {
    id: 'falcon1',
  name: 'Falcon 1',
  active: false,
  stages: 2,
  cost_per_launch: 67000000,
  success_rate_pct: 40,
  first_flight: '2016-03-24',
  launchpad: 'kwajalein_atoll',
  country: 'Republic of the Marshall Islands',
  company: 'SpaceX',
  height: {
    meters: 22.25,
    feet: 73
  },
  diameter: {
    meters: 1.68,
    feet: 5.5
  },
  mass: {
    kg: 30146,
    lb: 66460
  },
  payload_weights: [
      {
        id: 'leo',
        name: 'low earth orbit',
        kg: 450,
        lb: 992
      }
  ],
  first_stage: {
    reusable: true,
    engines: {
    number: 1,
    type: 'merlin',
    version: '1C',
    propellant_1: 'liquid oxygen',
    propellant_2: 'RP-1 kerosene',
    thrust_sea_level: {
      kN: 420,
      lbf: 94000
    },
    thrust_vacuum: {
      kN: 480,
      lbf: 110000
    },
    thrust_to_weight: 96
    },
    fuel_amount_tons: 44.3,
    burn_time_sec: 169,
  },
  second_stage: {
    engines: {
    number: 1,
    type: 'kestrel',
    version: '1',
    propellant_1: 'liquid oxygen',
    propellant_2: 'RP-1 kerosene',
    thrust_vacuum: {
      kN: 31,
      lbf: 7000
    },
    thrust_to_weight: 65
    },
    fuel_amount_tons: 3.38,
    burn_time_sec: 378,
    payloads: {
      option_1: 'composite fairing',
      composite_fairing: {
        height: {
          meters: 3.5,
          feet: 11.5
        },
        diameter: {
          meters: 1.5,
          feet: 4.9
        }
      }
    }
  },
  description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.'
}