$falcon_heavy = {
    id: 'falcon_heavy',
  name: 'Falcon Heavy',
  active: false,
  stages: 2,
  boosters: 2,
  cost_per_launch: 90000000,
  first_flight: 'TBD',
  country: 'United States',
  company: 'SpaceX',
  height: {
    meters: 70,
    feet: 229.6
  },
  total_width: {
    meters: 12.2,
    feet: 39.9
  },
  mass: {
    kg: 1420788,
    lb: 3125735
  },
  payload_weights: {
    leo: {
      name: 'low earth orbit',
      kg: 63800,
      lb: 140660
    },
    gto: {
      name: 'geosynchronous transfer orbit',
      kg: 26700,
      lb: 58860
    },
    mars: {
      name: 'mars orbit',
      kg: 16800,
      lb: 37040
    },
    pluto: {
      name: 'pluto orbit',
      kg: 3500,
      lb: 7720
    }
  },
  first_stage: {
    reusable: 'true',
    engines: 27,
    cores: 3,
    burn_time_sec: 162,
    thrust_sea_level: {
      kN: 22819,
      lbf: 5130000
    },
    thrust_vacuum: {
      kN: 24681,
      lbf: 5548500
    }
  },
  second_stage: {
    engines: 1,
    burn_time_sec: 397,
    thrust: {
      kN: 934,
      lbf: 210000
    },
    payloads: {
      option_1: 'dragon',
      option_2: 'composite fairing',
      composite_fairing: {
        height: {
          meters: 13.1,
          feet: 43
        },
        diameter: {
          meters: 5.2,
          feet: 17.1
        }
      }
    }
  },
  engines: {
    number: 27,
    type: 'merlin',
    version: '1D+',
    layout: 'octaweb',
    engine_loss_max: 6,
    propellant_1: 'subcooled liquid oxygen',
    propellant_2: ' RP-1 kerosene',
    thrust_sea_level: {
      kN: 845,
      lbf: 190000
    },
    thrust_vacuum: {
      kN: 914,
      lbf: 205500
    },
    thrust_to_weight: 180.1
  },
  landing_legs: {
    number: 12,
    material: 'carbon fiber'
  },
  description: 'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.'
}
