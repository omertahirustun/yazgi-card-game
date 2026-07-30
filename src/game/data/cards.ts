import { Card } from "../engine/types";

export const cards: Card[] = [
  // ─── EXISTING CARDS (unchanged) ───
  {
    id: "elci",
    characterName: "Elçi",
    text: "Komşu boylardan bir elçi geldi. Barış ve ittifak teklif ediyor, karşılığında erzak istiyor.",
    image: require("../../../assets/cards/elci.jpg"),
    left: {
      text: "Teklifi kabul et — erzak ver, barış yap",
      effects: { aclik: -10, halk: 10, asker: 5 },
    },
    right: {
      text: "Elçiyi geri gönder — gücünü göster",
      effects: { asker: 10, kut: 5, halk: -10 },
    },
  },
  {
    id: "hatun",
    characterName: "Hatun",
    text: "Hatun, aç çocukların olduğunu ve ambarların boşaldığını söylüyor. Bir şey yapmalısın.",
    image: require("../../../assets/cards/hatun.jpg"),
    left: {
      text: "Halk için son ambarları aç",
      effects: { aclik: 15, halk: 15, asker: -10 },
    },
    right: {
      text: "Askeri erzakı koru, halk kendi dermanını bulsun",
      effects: { aclik: -10, asker: 5, halk: -15 },
    },
  },
  {
    id: "saman",
    characterName: "Şaman",
    text: "Şaman, rüyasında kara bir boğanın dağları yıktığını gördü. Kötü bir kehanet olduğunu söylüyor.",
    image: require("../../../assets/cards/shaman.jpg"),
    left: {
      text: "Şaman'a inan ve arınma töreni yapılmasını emret",
      effects: { kut: 15, halk: 5, aclik: -5 },
    },
    right: {
      text: "Şaman'ı ciddiye alma — batıl inançlarla uğraşma",
      effects: { kut: -15, asker: 10 },
    },
  },
  {
    id: "ordu-beyi",
    characterName: "Ordu Beyi",
    text: "Ordu Beyi, sınırda düşman keşif birliklerinin görüldüğünü haber veriyor. Ya savunmaya çekil ya da ani bir baskın düzenle.",
    image: require("../../../assets/cards/ordu_beyi.jpg"),
    left: {
      text: "Baskın düzenle — sürpriz saldırı",
      effects: { asker: 15, kut: 10, aclik: -10 },
    },
    right: {
      text: "Savunmaya çekil — kaleyi tahkim et",
      effects: { asker: -5, aclik: 5, halk: 10 },
    },
  },
  {
    id: "halk-temsilcisi",
    characterName: "Halk Temsilcisi",
    text: "Halk ayaklanmanın eşiğinde. Vergiler çok ağır ve adaletsizlik had safhada.",
    image: require("../../../assets/cards/halk_temsilcisi.jpg"),
    left: {
      text: "Vergileri indir ve adaleti yeniden tesis et",
      effects: { halk: 20, aclik: -10, asker: -10 },
    },
    right: {
      text: "İsyanı bastır — askerle gözdağı ver",
      effects: { halk: -20, asker: 10, kut: -5 },
    },
  },
  {
    id: "demirci",
    characterName: "Demirci",
    text: "Yaşlı demirci, gökten düşen bir göktaşından dövülmüş efsanevi bir kılıç getirdi. Onu sana armağan etmek istiyor.",
    image: require("../../../assets/cards/demirci.jpg"),
    left: {
      text: "Kılıcı kabul et ve demirciyi ödüllendir",
      effects: { asker: 15, kut: 10, aclik: -5 },
    },
    right: {
      text: "Kılıcı reddet — savaştan çok barışa ihtiyacımız var",
      effects: { halk: 10, kut: -5, aclik: 5 },
    },
  },
  {
    id: "akinci",
    characterName: "Akıncı",
    text: "Akıncılar, yağma için zengin bir kervanın yolda olduğunu rapor etti. Fırsat ama riskli.",
    image: require("../../../assets/cards/akıncı.jpg"),
    left: {
      text: "Kervana saldır — ganimet lazım",
      effects: { aclik: 15, asker: 10, halk: -5 },
    },
    right: {
      text: "Geçmelerine izin ver — tarafsızlığımızı koru",
      effects: { halk: 10, asker: -5, kut: 5 },
    },
  },
  {
    id: "kuraklik",
    characterName: "Yağmurcu",
    text: "Kuraklık toprakları kavuruyor. Yağmurcu, Tanrı'ya kurban sunulması gerektiğini söylüyor.",
    image: require("../../../assets/cards/yagmurcu.jpg"),
    left: {
      text: "Kurban sunulmasına izin ver",
      effects: { kut: 15, halk: 5, aclik: 10 },
    },
    right: {
      text: "Halkı su bulmak için göçe zorla",
      effects: { aclik: -10, halk: -10, kut: -10 },
    },
  },
  {
    id: "bilge",
    characterName: "Bilge",
    text: "Dağlardan inen bilge bir ihtiyar, sana eski bir yazıtın sırrını fısıldıyor. Bu bilgi büyük güç ama büyük bedel getirebilir.",
    image: require("../../../assets/cards/bilge.jpg"),
    left: {
      text: "Sırrı öğren ve kullan",
      effects: { kut: 20, halk: -5, aclik: -5 },
    },
    right: {
      text: "Teşekkür et ama bilgiyi reddet",
      effects: { halk: 10, kut: -10, asker: 5 },
    },
  },
  {
    id: "ruh",
    characterName: "Atalar Ruhu",
    text: "Bir rüyanda atalarının ruhu sana göründü. Ya törene katılacaksın ya da onları görmezden geleceksin.",
    image: require("../../../assets/cards/atalar_ruhu.jpg"),
    left: {
      text: "Törene katıl ve ataları onurlandır",
      effects: { kut: 20, halk: 10 },
    },
    right: {
      text: "Rüyayı unut — modern dünyada bunlara yer yok",
      effects: { kut: -10, asker: 10, aclik: 5 },
    },
  },
  {
    id: "kagan",
    characterName: "Kağan",
    text: "Bozkırın hakimi Kağan, seni huzuruna çağırdı. Gözlerinde hem bir babanın sıcaklığı hem de bir kartalın keskin bakışı var. 'Oğul, taht sınavı başlıyor' dedi.",
    image: require("../../../assets/cards/kagan.jpg"),
    left: {
      text: "Önünde eğil ve sadakatini sun",
      effects: { halk: 15, kut: 10, asker: 5 },
    },
    right: {
      text: "Gözlerinin içine bak — eşit olduğunu hissettir",
      effects: { kut: 15, asker: 10, aclik: -10, halk: -10 },
    },
  },

  // ─── CHAIN 1: Göç Kervanı ───
  {
    id: "goc-hazirlik",
    characterName: "Göçebe",
    text: "Sınır boylarındaki göçebe boylar, otlakların kuruduğunu söyleyerek doğuya göç etmek için izin istiyor.",
    image: require("../../../assets/cards/gocebe.jpg"),
    left: {
      text: "İzin ver — giden gitsin, bozkır geniş",
      effects: { halk: -5, aclik: 5, asker: -5 },
      nextCardId: "goc-yolculuk",
    },
    right: {
      text: "Gitmelerini yasakla — her asker kıymetli",
      effects: { halk: -10, asker: 5, kut: -5 },
    },
  },
  {
    id: "goc-yolculuk",
    characterName: "Göçebe",
    text: "Göç kervanı yola çıktı. Ancak yolda düşman akıncılarının pususuna düştüler. Yardım mı göndereceksin yoksa kaderlerine mi bırakacaksın?",
    image: require("../../../assets/cards/gocebe.jpg"),
    left: {
      text: "Yardım gönder — göçebeleri kurtar",
      effects: { halk: 10, asker: -10, kut: 5 },
    },
    right: {
      text: "Kaderlerine bırak — asıl savaş burada",
      effects: { halk: -10, asker: 5, aclik: 5 },
    },
  },

  // ─── CHAIN 2: Düşman Baskını ───
  {
    id: "dusman-istihbarat",
    characterName: "Casus",
    text: "Bir casus, kuzeydeki düşman boyunun büyük bir baskın hazırlığında olduğunu bildirdi. Ya önleyici bir saldırı düzenle ya da savunma hazırlığı yap.",
    image: require("../../../assets/cards/casus.jpg"),
    left: {
      text: "Önleyici saldırı — fırsatı kaçırma",
      effects: { asker: 10, kut: 5, aclik: -5 },
      nextCardId: "dusman-savunma",
    },
    right: {
      text: "Kaleleri güçlendir — savunmaya çekil",
      effects: { asker: -10, halk: 10, aclik: 5 },
    },
  },
  {
    id: "dusman-savunma",
    characterName: "Ordu Beyi",
    text: "Saldırı başladı! Düşman beklediğimizden daha güçlü. Orduyu ileri mi süreceksin yoksa geri mi çekileceksin?",
    image: require("../../../assets/cards/ordu_beyi.jpg"),
    left: {
      text: "İleri! Savaş meydanında ölüm de var şan da",
      effects: { asker: 15, kut: 10, halk: -5 },
    },
    right: {
      text: "Geri çekil — kayıpları minimize et",
      effects: { asker: -10, halk: 5, aclik: 5, kut: -5 },
    },
  },

  // ─── CHAIN 3: Kutsal Tören ───
  {
    id: "kutsal-armagan",
    characterName: "Şaman",
    text: "Gökyüzünde üç gün boyunca kızıl bir ay göründü. Şaman, bunun Tanrı'nın bir çağrısı olduğunu ve büyük bir kurban töreni yapılması gerektiğini söylüyor.",
    image: require("../../../assets/cards/shaman.jpg"),
    left: {
      text: "Tören için hazırlıklara başla",
      effects: { kut: 10, aclik: -5, halk: 5 },
      nextCardId: "kutsal-toren",
    },
    right: {
      text: "Bunlar doğal olaylar, törene gerek yok",
      effects: { kut: -10, asker: 5 },
    },
  },
  {
    id: "kutsal-toren",
    characterName: "Şaman",
    text: "Tören alanı hazır. Kutsal ateş yakıldı, davullar çalıyor. Şaman, kurban olarak en değerli atını istiyor. Verecek misin?",
    image: require("../../../assets/cards/shaman.jpg"),
    left: {
      text: "Atımı ver — Tanrı katında değerli olsun",
      effects: { kut: 20, asker: -10, halk: 10 },
    },
    right: {
      text: "Daha mütevazı bir kurban sun",
      effects: { kut: 10, aclik: 5, halk: -5 },
    },
  },

  // ─── CHAIN 4: Ticaret ───
  {
    id: "ticaret-anlasma",
    characterName: "Tüccar",
    text: "Güneyden zengin bir tüccar kervanı geldi. İpek ve baharat karşılığında erzak ve at teklif ediyorlar. Anlaşma yapmak istiyorlar ama önce gümrük vergisinde indirim istiyorlar.",
    image: require("../../../assets/cards/tuccar.jpg"),
    left: {
      text: "Vergi indirimi yap — uzun vadeli kazanç",
      effects: { halk: 10, asker: 5, aclik: 10 },
      nextCardId: "ticaret-sonuc",
    },
    right: {
      text: "Vergilerde ısrar et — hazine boş",
      effects: { aclik: -10, asker: 5, halk: -10 },
    },
  },
  {
    id: "ticaret-sonuc",
    characterName: "Tüccar",
    text: "Ticaret anlaşması meyvelerini vermeye başladı. Kervanlar düzenli olarak geliyor, şehir canlandı. Ancak bazı yerel esnaf, yabancı tüccarlar yüzünden işlerinin bozulduğundan şikayetçi.",
    image: require("../../../assets/cards/tuccar.jpg"),
    left: {
      text: "Yerel esnafı koru — ticareti sınırla",
      effects: { halk: 15, aclik: -5, asker: -5 },
    },
    right: {
      text: "Serbest ticareti destekle — şehir büyüsün",
      effects: { aclik: 10, asker: 5, halk: -10 },
    },
  },

  // ─── CHAIN 5: İsyan ───
  {
    id: "isyan-haber",
    characterName: "Haberci",
    text: "Kuzeydeki bir kasabada halk ayaklandı! Vergi memurlarını kovmuşlar ve kasabayı ele geçirmişler. İsyan büyümeden müdahale etmelisin.",
    image: require("../../../assets/cards/haberci.jpg"),
    left: {
      text: "Asker gönder — isyanı bastır",
      effects: { asker: -10, halk: -10, kut: -5 },
      nextCardId: "isyan-sonuc",
    },
    right: {
      text: "Müzakere et — isyancıları dinle",
      effects: { halk: 10, asker: -5, aclik: -5 },
    },
  },
  {
    id: "isyan-sonuc",
    characterName: "Haberci",
    text: "İsyan kanlı bir şekilde bastırıldı. Kasaba kül oldu, halk korku içinde. Askerlerin zafer kazandı ama kayıplar ağır oldu.",
    image: require("../../../assets/cards/haberci.jpg"),
    left: {
      text: "Ağır vergiler koy — isyanın bedelini ödesinler",
      effects: { halk: -15, asker: 10, aclik: 10 },
    },
    right: {
      text: "Yumuşa — yaraları sarma vakti",
      effects: { halk: 15, asker: -10, aclik: -10, kut: 5 },
    },
  },

  // ─── CHAIN 6: Veba Salgını ───
  {
    id: "veba-haber",
    characterName: "Hekim",
    text: "Hekim, doğu sınırındaki köylerde veba salgını başladığını bildirdi. Salgın hızla yayılıyor. Ya karantina uygula ya da yardım gönder.",
    image: require("../../../assets/cards/hekim.jpg"),
    left: {
      text: "Sıkı karantina — kimse girip çıkmasın",
      effects: { halk: -10, asker: -5, aclik: 5 },
      nextCardId: "veba-karantina",
    },
    right: {
      text: "Hekimler gönder — hastalara yardım et",
      effects: { halk: 10, aclik: -10, asker: -5 },
    },
  },
  {
    id: "veba-karantina",
    characterName: "Hekim",
    text: "Karantina bölgesi kuruldu. Ancak karantinadakiler açlıkla mücadele ediyor ve dışarı çıkmak için isyan çıkarmak üzereler. Kapıları açık tutmak zorundasın.",
    image: require("../../../assets/cards/hekim.jpg"),
    left: {
      text: "Kapıları aç — halk ölmesin",
      effects: { halk: 10, aclik: 5, asker: -10 },
      nextCardId: "veba-son",
    },
    right: {
      text: "Kapıları kapalı tut — büyük felaketi önle",
      effects: { halk: -20, asker: 5, kut: -10 },
    },
  },
  {
    id: "veba-son",
    characterName: "Hekim",
    text: "Salgın nihayet duruldu. Binlerce kişi öldü ama krallık ayakta kaldı. Şimdi yeniden inşa zamanı.",
    image: require("../../../assets/cards/hekim.jpg"),
    left: {
      text: "Yeniden inşa için seferberlik başlat",
      effects: { halk: 15, aclik: 5, asker: -5 },
    },
    right: {
      text: "Ölüler için büyük bir anma töreni düzenle",
      effects: { kut: 15, halk: 5, aclik: -5 },
    },
  },

  // ─── CHAIN 7: Eski Harabeler ───
  {
    id: "harabe-kesif",
    characterName: "Kaşif",
    text: "Bir kaşif, çölde eski bir uygarlıktan kalma harabeler bulduğunu söylüyor. İçeride büyük hazineler olabilir ama lanetli olduğu da söyleniyor.",
    image: require("../../../assets/cards/kasif.jpg"),
    left: {
      text: "Kazı ekibi gönder — hazineleri bul",
      effects: { asker: -5, aclik: 5, kut: 10 },
      nextCardId: "harabe-ganimet",
    },
    right: {
      text: "Harabeleri kapat — tehlikeli oyunlara gerek yok",
      effects: { halk: 5, kut: -5, aclik: 5 },
    },
  },
  {
    id: "harabe-ganimet",
    characterName: "Kaşif",
    text: "Harabelerden altınlar, eski silahlar ve bir kristal kafatası çıktı. Askeri gücün artabilir ama bu eşyaların uğursuzluk getireceğinden korkanlar var.",
    image: require("../../../assets/cards/kasif.jpg"),
    left: {
      text: "Hazineleri hazineye ek — güçlenelim",
      effects: { asker: 15, aclik: 10, kut: -5 },
    },
    right: {
      text: "Eşyaları müzeye ver — tarihe saygı duy",
      effects: { halk: 10, kut: 10, asker: -5 },
    },
  },

  // ─── CONDITIONAL STANDALONE: Av Partisi ───
  {
    id: "av-partisi",
    characterName: "Avcı",
    text: "Bozkırda bol miktarda geyik ve yaban atı görülmüş. Avcılar büyük bir av partisi düzenlemek istiyor. Bu kıtlık döneminde iyi bir fırsat.",
    image: require("../../../assets/cards/avci.jpg"),
    conditions: [{ stat: "aclik", operator: "<", value: 30 }],
    left: {
      text: "Av partisine izin ver — et lazım",
      effects: { aclik: 15, halk: 5, asker: 5 },
    },
    right: {
      text: "Av yasak — hayvanların üremesine izin ver",
      effects: { halk: -5, asker: -5, aclik: -5 },
    },
  },

  // ─── CONDITIONAL: Sığınmacı ───
  {
    id: "siginmaci",
    characterName: "Sığınmacı",
    text: "Komşu boyda iç savaş çıktı. Yüzlerce sığınmacı kapına dayandı. Kadın, çocuk, yaşlı... Ya aç kapıyı ya da geri çevir.",
    image: require("../../../assets/cards/siginmaci.jpg"),
    conditions: [{ stat: "halk", operator: ">", value: 60 }],
    left: {
      text: "Kapıları aç — merhamet göster",
      effects: { halk: 15, aclik: -15, asker: -5 },
    },
    right: {
      text: "Geri çevir — kendi derdimiz yeter",
      effects: { halk: -10, asker: 5, kut: -10 },
    },
  },

  // ─── CONDITIONAL: Kara Haber ───
  {
    id: "kara-haber",
    characterName: "Haberci",
    text: "Kara haber tez yayılır. Savaşta kaybettiğin söylentileri başkentte panik yarattı. Halk senin öldüğünü düşünüyor.",
    image: require("../../../assets/cards/haberci.jpg"),
    conditions: [{ stat: "kut", operator: "<", value: 30 }],
    left: {
      text: "Hemen başkente dön ve halka seslen",
      effects: { halk: 10, kut: 10, aclik: -5 },
    },
    right: {
      text: "Söylentileri yayılmasına izin ver — düşmanı şaşırt",
      effects: { asker: 10, halk: -10, kut: -5 },
    },
  },

  // ─── CONDITIONAL: Zafer ───
  {
    id: "zafer",
    characterName: "Komutan",
    text: "Büyük bir zafer kazandın! Düşman ordusu bozguna uğradı ve sancakları ele geçirildi. Komutanın, düşman topraklarına girilmesini öneriyor.",
    image: require("../../../assets/cards/komutan.jpg"),
    conditions: [{ stat: "asker", operator: ">", value: 70 }],
    left: {
      text: "İlerle — düşmanı tamamen bitir",
      effects: { asker: 15, kut: 10, aclik: -10, halk: -5 },
    },
    right: {
      text: "Geri dön — fazla hırs yıkım getirir",
      effects: { halk: 15, aclik: 10, kut: 5 },
    },
  },

  // ─── CONDITIONAL: Kıtlık ───
  {
    id: "kritik",
    characterName: "Vezir",
    text: "Ambarlar neredeyse tamamen boşaldı. Kıtlık kapıda. Vezir, ya komşu boydan zorla erzak almayı ya da halkı küçük porsiyonlarla idare etmeyi öneriyor.",
    image: require("../../../assets/cards/vezir.jpg"),
    conditions: [{ stat: "aclik", operator: ">", value: 75 }],
    left: {
      text: "Komşu boya baskın düzenle — erzak getir",
      effects: { aclik: 20, asker: -5, halk: -5, kut: -5 },
    },
    right: {
      text: "Karne uygulaması başlat — herkese eşit",
      effects: { halk: 10, aclik: -10, asker: -5 },
    },
  },

  // ─── CONDITIONAL: Saray Entrikası ───
  {
    id: "saray-entrikasi",
    characterName: "Vezir",
    text: "Sarayda bir entrika dönüyor. Vezir, bazı soyluların tahtına göz diktiğini ve gizlice mektuplaştığını bildirdi.",
    image: require("../../../assets/cards/vezir.jpg"),
    conditions: [{ stat: "halk", operator: ">", value: 65 }],
    left: {
      text: "Soyluları saraya çağır ve yüzleş",
      effects: { halk: -10, asker: 5, kut: 10 },
    },
    right: {
      text: "Gizlice takip ettir — kanıt topla",
      effects: { asker: -5, halk: 5, kut: 10, aclik: -5 },
    },
  },

  // ─── CONDITIONAL: Altın Buluntu ───
  {
    id: "altin-buluntu",
    characterName: "Madenci",
    text: "Bir çoban, dağda altın damarı buldu. Madenciler heyecan içinde. Madeni açmak büyük zenginlik getirir ama tanrıların gazabına uğramaktan korkanlar var.",
    image: require("../../../assets/cards/madenci.jpg"),
    conditions: [{ stat: "kut", operator: ">", value: 60 }],
    left: {
      text: "Madeni aç — zenginlik güçtür",
      effects: { aclik: 15, asker: 10, kut: -10, halk: 5 },
    },
    right: {
      text: "Madeni kutsa — önce tören yapalım",
      effects: { kut: 10, halk: 5, aclik: 5 },
    },
  },

  // ─── CONDITIONAL: Barış Teklifi (compound) ───
  {
    id: "baris-teklifi",
    characterName: "Elçi",
    text: "Uzun yıllardır savaştığın komşu boydan bir barış elçisi geldi. Kız alıp vermek ve sınırları belirlemek istiyorlar. Samimi mi yoksa tuzak mı?",
    image: require("../../../assets/cards/elci.jpg"),
    conditions: [
      { stat: "asker", operator: ">", value: 50 },
      { stat: "halk", operator: ">", value: 50 },
    ],
    left: {
      text: "Barışı kabul et — savaş yeter",
      effects: { halk: 15, aclik: 10, asker: -10 },
    },
    right: {
      text: "Barış teklifini reddet — zayıflık gösterme",
      effects: { asker: 5, kut: -5, halk: -10 },
    },
  },

  // ─── CONDITIONAL: Tuzak ───
  {
    id: "tuzak",
    characterName: "Yabancı",
    text: "Yabancı bir adam, düşman kampının yerini bildiğini söylüyor ve sana rehberlik etmeyi teklif ediyor. Gözlerinde garip bir parıltı var.",
    image: require("../../../assets/cards/yabanci.jpg"),
    conditions: [{ stat: "kut", operator: "<", value: 25 }],
    left: {
      text: "Adamı takip et — riske değer",
      effects: { asker: 15, aclik: 5, kut: -15, halk: -5 },
    },
    right: {
      text: "Adamı tutukla — bu bir tuzak",
      effects: { kut: 10, halk: 5, aclik: -5 },
    },
  },

  // ─── CONDITIONAL: Göç Dalgası ───
  {
    id: "goc-dalgasi",
    characterName: "Sınır Muhafızı",
    text: "Sınır muhafızları, büyük bir göç dalgasının yaklaştığını bildirdi. Binlerce insan açlık ve savaştan kaçıyor. Ya yardım et ya da geri çevir.",
    image: require("../../../assets/cards/sinig_muhafizi.jpg"),
    conditions: [{ stat: "halk", operator: "<", value: 35 }],
    left: {
      text: "Göçmenleri kabul et — güçleniriz",
      effects: { halk: 15, aclik: -15, asker: 5 },
    },
    right: {
      text: "Sınırları kapat — kriz yönetilemez",
      effects: { asker: 5, halk: -10, kut: -5 },
    },
  },

  // ─── CONDITIONAL: Bayram ───
  {
    id: "bayram",
    characterName: "Hatun",
    text: "Büyük bir bahar bayramı yaklaşıyor. Hatun, bu yıl bayramın eskisinden daha görkemli olması gerektiğini söylüyor. Bu halkın moralini yükseltir ama hazineden gider.",
    image: require("../../../assets/cards/hatun.jpg"),
    conditions: [{ stat: "halk", operator: ">", value: 55 }],
    left: {
      text: "Görkemli bir bayram düzenle — halk sevinsin",
      effects: { halk: 15, aclik: -10, kut: 10 },
    },
    right: {
      text: "Sade bir tören yap — zor zamanlardayız",
      effects: { aclik: 5, kut: -5, halk: -5 },
    },
  },

  // ─── CONDITIONAL: Destan ───
  {
    id: "destan",
    characterName: "Ozan",
    text: "Kutsal dağın eteklerinde yaşayan bir ozan, senin destanını yazmak istiyor. Bunun için geçmişini, savaşlarını ve rüyalarını anlatman gerek.",
    image: require("../../../assets/cards/ozan.jpg"),
    conditions: [{ stat: "kut", operator: ">", value: 50 }],
    left: {
      text: "Destanı kabul et — adın sonsuza dek yaşasın",
      effects: { kut: 15, halk: 10, aclik: -5 },
    },
    right: {
      text: "Mütevazı ol — destanlar ölümlüler için değil",
      effects: { kut: 5, halk: -5, asker: 5 },
    },
  },

  // ─── CONDITIONAL: Okul Kurma ───
  {
    id: "okul-kurma",
    characterName: "Bilge",
    text: "Bilge, başkentte bir okul açılmasını öneriyor. Çocuklara okuma yazma ve eskilerin bilgeliği öğretilecek. Uzun vadede faydalı ama kısa vadede masraflı.",
    image: require("../../../assets/cards/bilge.jpg"),
    conditions: [{ stat: "kut", operator: "<", value: 40 }],
    left: {
      text: "Okulu aç — bilgi güçtür",
      effects: { kut: 15, halk: 5, aclik: -10 },
    },
    right: {
      text: "Okula gerek yok — savaşmayı öğrensinler",
      effects: { asker: 10, kut: -10, halk: -5 },
    },
  },

  // ─── UNCONDITIONAL: Yangın ───
  {
    id: "yangin",
    characterName: "Muhafız",
    text: "Başkentin batı yakasında büyük bir yangın çıktı! Ambarlar ve evler alevler içinde. Halk yardım bekliyor, askerler ise yangının söndürülmesini istiyor.",
    image: require("../../../assets/cards/muhafiz.jpg"),
    left: {
      text: "Tüm gücü yangına sevk et — halkı kurtar",
      effects: { halk: 15, aclik: -10, asker: -10 },
    },
    right: {
      text: "Askeri kışlada tut — asayiş önemli",
      effects: { asker: 5, halk: -15, aclik: -5 },
    },
  },

  // ─── UNCONDITIONAL: Hediye ───
  {
    id: "hediye",
    characterName: "Elçi",
    text: "Uzak diyarlardan bir elçi heyeti geldi. Sana altın işlemeli bir zırh, nadir bir kuş ve bilinmeyen otlar getirdiler. Dostluk teklif ediyorlar.",
    image: require("../../../assets/cards/elci.jpg"),
    left: {
      text: "Hediyeleri kabul et ve onurlandır",
      effects: { kut: 10, halk: 5, asker: 5 },
    },
    right: {
      text: "Hediyeleri reddet — borçlu kalmayalım",
      effects: { halk: -5, kut: -5, aclik: 5 },
    },
  },
];
