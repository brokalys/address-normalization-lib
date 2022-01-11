const normalizer = require('./normalizer');

describe('normalizer', () => {
  it.each([
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela 1',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela 1k2',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1 k 2',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela 1k 2',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1 k 2',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: null,
      },
      {
        city: 'riga',
        street: undefined,
        housenumber: undefined,
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela (korpuss 2) 1',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1',
      },
    ],
    [
      {
        location_district: 'Rīgas Pilsēta',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela 1',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu iela',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: undefined,
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Hospitāļu 1k1',
      },
      {
        city: 'riga',
        street: 'hospitalu',
        housenumber: '1 k 1',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: '13. Janvāra iela 4',
      },
      {
        city: 'riga',
        street: '13 janvara',
        housenumber: '4',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Zolitudes iela 34 k-1',
      },
      {
        city: 'riga',
        street: 'zolitudes',
        housenumber: '34 k 1',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: 'centrs',
        location_address: 'Čiekurkalna 5. šķērslīnija 15 k-2',
      },
      {
        city: 'riga',
        street: 'ciekurkalna 5 skerslinija',
        housenumber: '15 k 2',
      },
    ],
    [
      {
        location_district: 'Ogre',
        location_parish: null,
        location_address: 'Ogre, Ausekļa prospekts, 9',
      },
      {
        city: 'ogre',
        street: 'ogre ausekla prospekts',
        housenumber: '9',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: null,
        location_address: 'Rīga;Dzirnezers,13 Janvāra iela 4',
      },
      {
        city: 'riga',
        street: '13 janvara',
        housenumber: '4',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: null,
        location_address: 'Rīga;Dzirnezers,13 Janvāra 4',
      },
      {
        city: 'riga',
        street: '13 janvara',
        housenumber: '4',
      },
    ],
    [
      {
        location_district: 'Rīga',
        location_parish: null,
        location_address: 'Rīga;Dzirnezers,13 Janvāra 4',
      },
      {
        city: 'riga',
        street: '13 janvara',
        housenumber: '4',
      },
    ],
    [
      {
        location_district: 'Salaspils',
        location_parish: null,
        location_address: 'Salaspils, Slokas 5/1',
      },
      {
        city: 'salaspils',
        street: 'slokas',
        housenumber: '5 1',
      },
    ],
    [
      {
        location_district: 'Jūrmala',
        location_parish: null,
        location_address: 'Babītes iela 5, 5a',
      },
      {
        city: 'jurmala',
        street: 'babites',
        housenumber: '5 5 a',
      },
    ],
    [
      {
        location_district: 'Jūrmala',
        location_parish: null,
        location_address: 'Babītes iela 1**',
      },
      {
        city: 'jurmala',
        street: 'babites',
        housenumber: '1',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Dienvidu iela 1 - 31, Salaspils, Salaspils nov., LV-1002',
      },
      {
        city: 'salaspils',
        street: 'dienvidu',
        housenumber: '1',
        apartment: '31',
        post_code: 'LV-1002',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Salaspils iela 18 k-1 - 89, Rīga, LV-1002',
      },
      {
        city: 'riga',
        street: 'salaspils',
        housenumber: '18 k 1',
        apartment: '89',
        post_code: 'LV-1002',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Zvejnieku iela 40B - 22B, Rīga, LV-1002',
      },
      {
        city: 'riga',
        street: 'zvejnieku',
        housenumber: '40 b',
        apartment: '22 b',
        post_code: 'LV-1002',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Vītolu iela 22/26 - 1, Rīga, LV-1002',
      },
      {
        city: 'riga',
        street: 'vitolu',
        housenumber: '22 26',
        apartment: '1',
        post_code: 'LV-1002',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: '"Ambulance" - 5, Snēpele, Snēpeles pag., Kuldīgas nov., LV-3328',
      },
      {
        city: 'snepele',
        street: 'ambulance',
        housenumber: undefined,
        apartment: '5',
        post_code: 'LV-3328',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Strēlnieku prospekts 48 - 14, Jūrmala, LV-2015',
      },
      {
        city: 'jurmala',
        street: 'strelnieku prospekts',
        housenumber: '48',
        apartment: '14',
        post_code: 'LV-2015',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: '2. Preču iela 13 - 3, Daugavpils, LV-5401',
      },
      {
        city: 'daugavpils',
        street: '2 precu',
        housenumber: '13',
        apartment: '3',
        post_code: 'LV-5401',
      },
    ],
    [
      {
        source: 'vzd',
        location_address: 'Tērbatas iela 6/8, Rīga, LV-1050',
      },
      {
        city: 'riga',
        street: 'terbatas',
        housenumber: '6 8',
        apartment: undefined,
        post_code: 'LV-1050',
      },
    ],
  ])('normalizes correctly: %j', (input, expectation) => {
    const output = normalizer(input);

    expect(output).toEqual(expectation);
  });
});
