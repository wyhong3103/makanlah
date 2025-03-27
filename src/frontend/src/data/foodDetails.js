import {
  nasi_lemak,
  curry_puff,
  kuih_seri_muka,
  nasi_kerabu,
  ondeh_ondeh,
  otak_otak,
  pisang_goreng,
  rojak,
  satay,
  mee_goreng,
  thosai,
  teh_tarik,
  rambutan,
  pineapple,
  papaya,
  nasi_biryani,
  kottu,
  kaya_toast,
  fried_rice,
  chicken_rice,
  durian,
  congee,
  char_kuey_teow,
  cendol,
  ais_kacang,
  apam_balik,
  air_sirap,
  air_limau,
  air_milo,
  roti_canai,
} from '@/assets';

const foodDetails = [
  {
    id: 'nasi_lemak',
    src: nasi_lemak,
    name: 'Nasi Lemak',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '51.21g',
      },
      {
        name: 'Cholestrol',
        content: '54mg',
      },
      {
        name: 'Sodium',
        content: '297mg',
      },
      {
        name: 'Protein',
        content: '9.86g',
      },
      {
        name: 'Fat',
        content: '12.54g',
      },
    ],
    desc: "Nasi Lemak is Malaysia's iconic dish, featuring fragrant coconut milk rice served with sambal, fried anchovies, peanuts, and a hard-boiled egg. The term 'nasi lemak' translates to 'rich rice', referring to the creamy texture and rich flavor of rice cooked in coconut milk.",
  },

  {
    id: 'roti_canai',
    src: roti_canai,
    name: 'Roti Canai',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '45.43g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '567mg',
      },
      {
        name: 'Protein',
        content: '6.31g',
      },
      {
        name: 'Fat',
        content: '10.27g',
      },
    ],
    desc: "Roti canai is a popular flatbread with Indian origins. Typically served with curries or dal. It's believed to have been brought to Malaysia by Indian Muslim immigrants, and its name 'canai' is thought to be derived from the Tamil word for dough, 'channa'",
  },
  {
    id: 'thosai',
    src: thosai,
    name: 'Thosai',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '21.24g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '254mg',
      },
      {
        name: 'Protein',
        content: '2.51g',
      },
      {
        name: 'Fat',
        content: '1.04g',
      },
    ],
    desc: "Thosai is a traditional South Indian pancake. It's originally from South India and has become a favorite across Southeast Asia, often served with various chutneys and spicy sambar.",
  },
  {
    id: 'mee_goreng',
    src: mee_goreng,
    name: 'Mee Goreng',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '61.8g',
      },
      {
        name: 'Cholestrol',
        content: '233mg',
      },
      {
        name: 'Sodium',
        content: '1120mg',
      },
      {
        name: 'Protein',
        content: '23.5g',
      },
      {
        name: 'Fat',
        content: '18.47g',
      },
    ],
    desc: "Mee goreng, meaning 'fried noodles' in Malay, is a popular dish in Malaysia, characterized by stir-fried yellow noodles tossed with a variety of ingredients. It was influenced by Chinese and Indian cuisines and became a local favorite, with many street vendors adding their unique twist to the dish!",
  },
  {
    id: 'nasi_biryani',
    src: nasi_biryani,
    name: 'Nasi Biryani',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '48.07g',
      },
      {
        name: 'Cholestrol',
        content: '28mg',
      },
      {
        name: 'Sodium',
        content: '805mg',
      },
      {
        name: 'Protein',
        content: '15.9g',
      },
      {
        name: 'Fat',
        content: '9.82g',
      },
    ],
    desc: "Nasi biryani is a fragrant and spiced rice dish. It's believed that the dish was brought to Malaysia by Indian Muslim immigrants, and over time, it has been adapted with local ingredients and flavors, making it uniquely Malaysian!",
  },
  {
    id: 'nasi_kerabu',
    src: nasi_kerabu,
    name: 'Nasi Kerabu',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '51.21g',
      },
      {
        name: 'Cholestrol',
        content: '54mg',
      },
      {
        name: 'Sodium',
        content: '297mg',
      },
      {
        name: 'Protein',
        content: '9.86g',
      },
      {
        name: 'Fat',
        content: '12.54g',
      },
    ],
    desc: 'Nasi kerabu is a distinctive dish from Malaysia, it features blue-colored rice served with a variety of fresh herbs, vegetables, and usually grilled fish or fried chicken. The distinctive blue color comes from the petals of the butterfly pea flower. ',
  },
  {
    id: 'char_kuey_teow',
    src: char_kuey_teow,
    name: 'Char Kuey Teow',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '37.41g',
      },
      {
        name: 'Cholestrol',
        content: '79mg',
      },
      {
        name: 'Sodium',
        content: '789mg',
      },
      {
        name: 'Protein',
        content: '17.39g',
      },
      {
        name: 'Fat',
        content: '15.45g',
      },
    ],
    desc: 'Char Kuey Teow is a popular Malaysian stir-fried noodle dish made with flat rice noodles, prawns, eggs, and Chinese sausage. It was originally a dish favored by the Chinese fishing community in Penang before becoming a beloved national favorite!',
  },
  {
    id: 'chicken_rice',
    src: chicken_rice,
    name: 'Chicken Rice',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '38.01g',
      },
      {
        name: 'Cholestrol',
        content: '95mg',
      },
      {
        name: 'Sodium',
        content: '544mg',
      },
      {
        name: 'Protein',
        content: '11.32g',
      },
      {
        name: 'Fat',
        content: '10.88g',
      },
    ],
    desc: 'Chicken rice is a flavorful Malaysian dish consisting of poached or roasted chicken served with fragrant rice cooked in chicken fat. The dish is believed to have originated from Hainan, China, and was brought to Malaysia by Chinese immigrants, especially the Hainanese community.',
  },
  {
    id: 'congee',
    src: congee,
    name: 'Congee',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '67.18g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '221mg',
      },
      {
        name: 'Protein',
        content: '9.43g',
      },
      {
        name: 'Fat',
        content: '2.91g',
      },
    ],
    desc: "Congee is a warm, savory rice porridge enjoyed by many Malaysians. Congee has a long history in Asia, with variations found in China, Japan, and beyond, where it's often considered a comfort food or remedy for sickness.",
  },
  {
    id: 'fried_rice',
    src: fried_rice,
    name: 'Fried Rice',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '37.52g',
      },
      {
        name: 'Cholestrol',
        content: '93mg',
      },
      {
        name: 'Sodium',
        content: '740mg',
      },
      {
        name: 'Protein',
        content: '11.23g',
      },
      {
        name: 'Fat',
        content: '11.11g',
      },
    ],
    desc: "Fried rice, known as 'nasi goreng' in Malaysia, is a flavorful dish made by stir-frying rice with various ingredients like meat, vegetables, and spices. Originating from China during the Sui Dynasty, it was created as a way to repurpose leftover rice, making it both practical and delicious.",
  },

  {
    id: 'kottu',
    src: kottu,
    name: 'Kottu',
    class: 'Staple Dishes',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '60.76g',
      },
      {
        name: 'Cholestrol',
        content: '1mg',
      },
      {
        name: 'Sodium',
        content: '614mg',
      },
      {
        name: 'Protein',
        content: '10.65g',
      },
      {
        name: 'Fat',
        content: '17.87g',
      },
    ],
    desc: 'Kottu, also known as kottu roti, is a popular Sri Lankan street food made by chopping and stir-frying roti with vegetables, meat, eggs, and spices. Originating in the eastern province of Sri Lanka in the 1960s and 1970s, it was created as an affordable meal for the lower socio-economic classes, utilizing leftover roti and various fillings.',
  },
  {
    id: 'rojak',
    src: rojak,
    name: 'Rojak',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '24.07g',
      },
      {
        name: 'Cholestrol',
        content: '70mg',
      },
      {
        name: 'Sodium',
        content: '278mg',
      },
      {
        name: 'Protein',
        content: '11.98g',
      },
      {
        name: 'Fat',
        content: '12.3g',
      },
    ],
    desc: "Rojak is a Malaysian dish tossed in a sweet, spicy, and tangy sauce made from shrimp paste, sugar, and peanuts. The word 'rojak' means 'mixture' in Malay, reflecting its diverse ingredients!",
  },
  {
    id: 'satay',
    src: satay,
    name: 'Satay',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '0.63g',
      },
      {
        name: 'Cholestrol',
        content: '15mg',
      },
      {
        name: 'Sodium',
        content: '49mg',
      },
      {
        name: 'Protein',
        content: '4.99g',
      },
      {
        name: 'Fat',
        content: '1.52g',
      },
    ],
    desc: "Satay is a delicious Malaysian dish consisting of skewered and grilled meat, usually served with a rich, creamy peanut sauce. It's a popular street food, perfect for sharing with friends or family!",
  },
  {
    id: 'otak_otak',
    src: otak_otak,
    name: 'Otak-Otak',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '5.72g',
      },
      {
        name: 'Cholestrol',
        content: '10mg',
      },
      {
        name: 'Sodium',
        content: '69mg',
      },
      {
        name: 'Protein',
        content: '1.99g',
      },
      {
        name: 'Fat',
        content: '0.8g',
      },
    ],
    desc: "Otak otak is a beloved dish made from minced fish, spices, herbs, and coconut milk. The name 'otak-otak' means 'brain' in Malay, referring to the shape of the dish, which is often thought to resemble a brain due to its texture.",
  },
  {
    id: 'pisang_goreng',
    src: pisang_goreng,
    name: 'Pisang Goreng',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '25.76g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '88mg',
      },
      {
        name: 'Protein',
        content: '1.24g',
      },
      {
        name: 'Fat',
        content: '10.88g',
      },
    ],
    desc: "Pisang goreng is a popular Malaysian snack made by deep-frying ripe bananas in a simple batter. It's often enjoyed as a street food, and you can find it in many local food stalls, served hot and crispy with a sprinkle of sugar or a side of sambal",
  },
  {
    id: 'curry_puff',
    src: curry_puff,
    name: 'Curry Puff',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '11.32g',
      },
      {
        name: 'Cholestrol',
        content: '1mg',
      },
      {
        name: 'Sodium',
        content: '143mg',
      },
      {
        name: 'Protein',
        content: '1.89g',
      },
      {
        name: 'Fat',
        content: '4.12g',
      },
    ],
    desc: 'Curry puff is a popular snack consisting of a crispy, golden pastry filled with spiced potatoes, chicken, or beef. Their origins are a fusion of influences: the British Cornish pasty, Portuguese empanada, and Indian samosa, reflecting the diverse culinary heritage of Southeast Asia. ',
  },
  {
    id: 'kaya_toast',
    src: kaya_toast,
    name: 'Kaya Toast',
    class: 'Snacks',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '24.82g',
      },
      {
        name: 'Cholestrol',
        content: '54mg',
      },
      {
        name: 'Sodium',
        content: '159mg',
      },
      {
        name: 'Protein',
        content: '4.37g',
      },
      {
        name: 'Fat',
        content: '5.12g',
      },
    ],
    desc: "Kaya toast is a traditional Malaysian breakfast snack made with toasted bread, kaya (a sweet coconut and egg jam), and a slice of butter. It is often enjoyed with a soft-boiled egg and a cup of local coffee or tea, and it's a popular choice at kopitiams across the country!",
  },
  {
    id: 'ondeh_ondeh',
    src: ondeh_ondeh,
    name: 'Ondeh-Ondeh',
    class: 'Desserts',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '19.42g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '28mg',
      },
      {
        name: 'Protein',
        content: '1.51g',
      },
      {
        name: 'Fat',
        content: '1.83g',
      },
    ],
    desc: "Ondeh-ondeh is a popular Malaysian dessert made of glutinous rice flour filled with palm sugar, then rolled into small balls and coated with grated coconut. The name 'ondeh ondeh' is believed to come from the Indonesian term 'ondeh-ondeh', meaning spherical-shaped food, similar to fish balls.",
  },
  {
    id: 'cendol',
    src: cendol,
    name: 'Cendol',
    class: 'Desserts',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '70.47g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '14mg',
      },
      {
        name: 'Protein',
        content: '5.6g',
      },
      {
        name: 'Fat',
        content: '19.11g',
      },
    ],
    desc: "Cendol is a beloved Malaysian dessert made from green pandan-flavored rice flour jelly, coconut milk, and palm sugar syrup. Its name is derived from the Javanese word 'jendol', meaning 'swollen', which describes the dessert's distinctive green jelly strands.",
  },
  {
    id: 'ais_kacang',
    src: ais_kacang,
    name: 'Ais Kacang',
    class: 'Desserts',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '19g',
      },
      {
        name: 'Cholestrol',
        content: '2.4mg',
      },
      {
        name: 'Sodium',
        content: '42mg',
      },
      {
        name: 'Protein',
        content: '1g',
      },
      {
        name: 'Fat',
        content: '0.7g',
      },
    ],
    desc: "Ais Kacang is a classic Malaysian dessert made with shaved ice, syrup, beans, and loads of yummy toppings. The name 'ais kacang' means 'ice beans', referring to the red beans that are a key part of the dish, though nowadays people add all sorts of toppings!",
  },
  {
    id: 'apam_balik',
    src: apam_balik,
    name: 'Apam Balik',
    class: 'Desserts',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '51.5g',
      },
      {
        name: 'Cholestrol',
        content: '69mg',
      },
      {
        name: 'Sodium',
        content: '237mg',
      },
      {
        name: 'Protein',
        content: '8.32g',
      },
      {
        name: 'Fat',
        content: '3.59g',
      },
    ],
    desc: 'Apam balik is a popular Malaysian snack consisting of a sweet pancake filled with crushed peanuts and sugar. It originated in Fujian cuisine and is now widely enjoyed in Malaysia.',
  },
  {
    id: 'kuih_seri_muka',
    src: kuih_seri_muka,
    name: 'Kuih Seri Muka',
    class: 'Desserts',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '57g',
      },
      {
        name: 'Cholestrol',
        content: '135mg',
      },
      {
        name: 'Sodium',
        content: '65mg',
      },
      {
        name: 'Protein',
        content: '8.8g',
      },
      {
        name: 'Fat',
        content: '23g',
      },
    ],
    desc: 'Kuih Seri Muka is a traditional Malaysian dessert comprising two layers: a bottom layer of glutinous rice cooked in coconut milk, and a top layer of pandan-flavored custard. In 2009, the Malaysian Department of National Heritage recognized Seri Muka as one of the 100 Malaysian heritage foods.',
  },
  {
    id: 'durian',
    src: durian,
    name: 'Durian',
    class: 'Fruits',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '27.09g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '2mg',
      },
      {
        name: 'Protein',
        content: '1.47g',
      },
      {
        name: 'Fat',
        content: '5.33g',
      },
    ],
    desc: "Durian, the 'King of Fruits', is a distinctive Malaysian fruit with a strong odor and creamy, custard-like flesh. The pungent smell is so intense that it is banned in some public places. Its name comes from the Malay word 'duri', meaning 'thorn', reflecting its spiky exterior.",
  },

  {
    id: 'papaya',
    src: papaya,
    name: 'Papaya',
    class: 'Fruits',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '9.81g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '3mg',
      },
      {
        name: 'Protein',
        content: '0.61g',
      },
      {
        name: 'Fat',
        content: '0.14g',
      },
    ],
    desc: 'Papaya is a tropical fruit known for its sweet flavor and vibrant orange color. It is rich in vitamin C and contains an enzyme called papain, which aids in digestion.',
  },
  {
    id: 'pineapple',
    src: pineapple,
    name: 'Pineapple',
    class: 'Fruits',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '12.63g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '1mg',
      },
      {
        name: 'Protein',
        content: '0.54g',
      },
      {
        name: 'Fat',
        content: '0.12g',
      },
    ],
    desc: "Pineapple is a popular fruit in Malaysia, loved for its sweet and sour taste. It's packed with vitamin C and has this cool enzyme called bromelain that can help with inflammation.",
  },
  {
    id: 'rambutan',
    src: rambutan,
    name: 'Rambutan',
    class: 'Fruits',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '1.79g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '1mg',
      },
      {
        name: 'Protein',
        content: '0.06g',
      },
      {
        name: 'Fat',
        content: '0.02g',
      },
    ],
    desc: "Rambutan is a tropical fruit with hairy red or yellow skin and a juicy, sweet, and slightly tangy flesh inside. The name 'rambutan' is derived from the Malaysian word 'rambut', meaning 'hair', which describes the fruit's distinctive hairy appearance.",
  },
  {
    id: 'air_limau',
    src: air_limau,
    name: 'Air Limau',
    class: 'Beverages',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '26g',
      },
      {
        name: 'Cholestrol',
        content: '0mg',
      },
      {
        name: 'Sodium',
        content: '3mg',
      },
      {
        name: 'Protein',
        content: '0g',
      },
      {
        name: 'Fat',
        content: '0g',
      },
    ],
    desc: "Air Limau is a refreshing Malaysian drink made from fresh lime juice, water, and sugar, often served chilled. It's commonly enjoyed in hot weather as a natural way to cool down and stay hydrated, with the tangy lime offering a burst of citrusy freshness!",
  },
  {
    id: 'air_sirap',
    src: air_sirap,
    name: 'Air Sirap',
    class: 'Beverages',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '32g',
      },
      {
        name: 'Cholestrol',
        content: '9.4mg',
      },
      {
        name: 'Sodium',
        content: '41mg',
      },
      {
        name: 'Protein',
        content: '2.2g',
      },
      {
        name: 'Fat',
        content: '2.5g',
      },
    ],
    desc: "Air Sirap is a popular Malaysian drink made from rose syrup, water, and sugar, giving it a sweet and floral flavor. It's often enjoyed during festive occasions, and the vibrant pink color makes it a favorite at celebrations like Ramadan and weddings!",
  },
  {
    id: 'air_milo',
    src: air_milo,
    name: 'Air Milo',
    class: 'Beverages',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '19g',
      },
      {
        name: 'Cholestrol',
        content: '2mg',
      },
      {
        name: 'Sodium',
        content: '60mg',
      },
      {
        name: 'Protein',
        content: '3.40g',
      },
      {
        name: 'Fat',
        content: '3g',
      },
    ],
    desc: 'Air Milo is a popular Malaysian drink made from Milo powder, mixed with water or milk, and sweetened to taste. It was introduced to Malaysia in the 1950s and has since become a staple in many households, especially for breakfast.',
  },
  {
    id: 'teh_tarik',
    src: teh_tarik,
    name: 'Teh Tarik',
    class: 'Beverages',
    nutrition: [
      {
        name: 'Carbohydrates',
        content: '21.22g',
      },
      {
        name: 'Cholestrol',
        content: '13mg',
      },
      {
        name: 'Sodium',
        content: '53mg',
      },
      {
        name: 'Protein',
        content: '2.98g',
      },
      {
        name: 'Fat',
        content: '3.28g',
      },
    ],
    desc: "Teh Tarik is Malaysia's famous pulled tea, a sweet and frothy drink made with strong tea and condensed milk. It’s typically served hot and is a popular choice at kopitiams for a quick, refreshing treat.",
  },
];

export default foodDetails;
