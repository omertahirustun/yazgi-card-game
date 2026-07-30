import { Card } from "../engine/types";

export const cards: Card[] = [
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
    left: {
      text: "Önünde eğil ve sadakatini sun",
      effects: { halk: 15, kut: 10, asker: 5 },
    },
    right: {
      text: "Gözlerinin içine bak — eşit olduğunu hissettir",
      effects: { kut: 15, asker: 10, aclik: -10, halk: -10 },
    },
  },
];
