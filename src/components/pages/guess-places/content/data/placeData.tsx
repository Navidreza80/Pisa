import { Place } from "../types/index";

// Array of places with their details for the game
const PLACES: Place[] = [
  {
    id: 1,
    name: "کیش",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/kish.jpg",
    hints: ["جزیره", "جنوب ایران", "منطقه آزاد", "آب‌های نیلگون"],
  },
  {
    id: 2,
    name: "اصفهان",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbo9zJUCIhxh-hRk-5n44eiFAQGDtrlCezw&s",
    hints: ["سی و سه پل", "نقش جهان", "معماری اسلامی", "مرکز ایران"],
  },
  {
    id: 3,
    name: "ماسال",
    image:
      "https://cdn.parsine.com/thumbnail/rYlVUjkxgRb0/MiLLs3pIbSZq8dQJqRxCdShr_50Wkc4jY1ki41nuqlzgATG38T600hDGnsV29RXhJUB_IP96qSVK0zijOaKVC280JV_13GIF/00332656415620-1080x605.jpg",
    hints: ["شمال ایران", "ابرها", "کلبه‌های چوبی", "طبیعت بکر"],
  },
  {
    id: 4,
    name: "شیراز",
    image:
      "https://parsstock.ir/600/10150/1290973-%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-27-%D8%AF%D8%B3%D8%A7%D9%85%D8%A8%D8%B1-2015-%D9%85%D8%B3%D8%AC%D8%AF-%D9%86%D8%B5%DB%8C%D8%B1%D8%A7%D9%84%D9%85%D9%84%DA%A9-%D8%AF%D8%B1-%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%D9%87%D9%85%DA%86%D9%86%DB%8C%D9%86-%D8%A8%D9%87-%D8%B9%D9%86%D9%88%D8%A7%D9%86-%D9%85%D8%B3%D8%AC%D8%AF-%D8%B5%D9%88%D8%B1%D8%AA%DB%8C-%D8%B4%D9%86%D8%A7%D8%AE%D8%AA%D9%87-%D9%85%DB%8C-%D8%B4%D9%88%D8%AF.jpg",
    hints: ["حافظیه", "باغ ارم", "پایتخت فرهنگی", "جنوب غرب"],
  },
  {
    id: 5,
    name: "تبریز",
    image:
      "https://www.pateh.com/blog/wp-content/uploads/2024/03/Sightseeing-places-in-Tabriz-18.webp",
    hints: ["بازار تاریخی", "شهری سردسیر", "آذربایجان شرقی", "کوه سهند"],
  },
  {
    id: 6,
    name: "رامسر",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2019/12/ramsar-attractions-cover.jpg",
    hints: ["زیبایی شمال", "دریا و جنگل", "هتل قدیم", "تله‌کابین"],
  },
  {
    id: 7,
    name: "تهران",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/sights-of-tehran.jpg",
    hints: ["پایتخت", "برج میلاد", "ترافیک", "کوهپایه البرز"],
  },
  {
    id: 8,
    name: "مشهد",
    image: "https://3click.com/blog/wp-content/uploads/2023/06/00-256.jpg",
    hints: ["زیارت", "حرم امام رضا", "شرق ایران", "شاندیز"],
  },
  {
    id: 9,
    name: "قشم",
    image: "https://www.triptoday.ir/wp-content/uploads/2025/05/q0-1.webp",
    hints: ["جزیره", "دره ستارگان", "جنوب", "غار نمک"],
  },

  {
    id: 10,
    name: "یزد",
    image:
      "https://yazdarghotel.com/wp-content/uploads/2024/04/Sightseeing-places-in-Yazd-1024x546.jpg",
    hints: ["بادگیر", "کویر", "شهر خشتی", "زرتشتیان"],
  },
  {
    id: 11,
    name: "بندر عباس",
    image:
      "https://www.flytoday.ir/blog/wp-content/uploads/2022/11/header_1068x580-8-1024x556-1.jpg",
    hints: ["جنوب ایران", "بندر مهم", "گرمای طاقت فرسا", "غذای دریایی"],
  },
  {
    id: 12,
    name: "اردبیل",
    image:
      "https://www.pateh.com/blog/wp-content/uploads/2024/07/Sightseeing-places-in-Ardabil-29.webp",
    hints: ["شهری سردسیر", "مقبره شیخ صفی", "سراب", "کوه سبلان"],
  },
  {
    id: 13,
    name: "کرمان",
    image:
      "https://cdn.mojnews.com/thumbnail/OGW0fXBLrNkM/ZRF7Lmw5ugQZ9M8xIGBQMqD9e54XxTUIZI1mWhJUOkssWqIXEBKBscNubOhGu0AP/%D8%A7%D8%B1%DA%AF+%D8%B1%D8%A7%DB%8C%D9%86.jpg",
    hints: ["شهر کویری", "بافت تاریخی", "پسته مرغوب", "ارگ بم"],
  },
  {
    id: 14,
    name: "همدان",
    image: "https://www.jabama.com/mag/wp-content/uploads/2020/08/mini.jpg",
    hints: ["شهر تاریخی", "گنجنامه", "آرامگاه بوعلی", "سفال لالجین"],
  },
  {
    id: 15,
    name: "ساری",
    image:
      "https://www.flytoday.ir/blog/wp-content/uploads/2023/06/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%B3%D8%A7%D8%B1%DB%8C-8.jpg",
    hints: ["مرکز مازندران", "جنگل نوردی", "برنج مرغوب", "خانه‌های قدیمی"],
  },
  {
    id: 16,
    name: "ارومیه",
    image: "https://irangard.com/mag/wp-content/uploads/2020/11/Lake-Urmia.jpg",
    hints: ["دریاچه ارومیه", "آذربایجان غربی", "سیب معروف", "کوهستان"],
  },
  {
    id: 17,
    name: "زاهدان",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2021/05/%D8%AA1-4.jpg",
    hints: ["شرق ایران", "مرز پاکستان", "هوتک معروف", "آب و هوای گرم"],
  },
  {
    id: 18,
    name: "کرمانشاه",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2021/12/DUyN2QwYjQ4Z.jpg",
    hints: ["غرب ایران", "طاق بستان", "بیستون", "کله پاچه"],
  },
  {
    id: 19,
    name: "رشت",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2019/12/Cover-1.jpg",
    hints: ["مرکز گیلان", "باران‌های مداوم", "میرزا قاسمی", "بازار سنتی"],
  },

  {
    id: 20,
    name: "بجنورد",
    image:
      "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/2023/06/Asreatrak-%DA%AF%D8%B1%D8%AF%D8%B4%DA%AF%D8%A7%D9%87-%D8%A8%D8%B4%E2%80%8C%D9%82%D8%A7%D8%B1%D8%AF%D8%A7%D8%B4.jpg",
    hints: ["شمال خراسان", "آبشار بش قارداش", "صنایع دستی", "مرز ترکمنستان"],
  },
  {
    id: 21,
    name: "گرگان",
    image:
      "https://melkgorgan.ir/wp-content/uploads/2024/03/%D9%85%DB%8C%D8%AF%D8%A7%D9%86-%D8%A8%D8%B3%DB%8C%D8%AC-%DA%AF%D8%B1%DA%AF%D8%A7%D9%86.jpg1_.webp",
    hints: ["جنگل ناهارخوران", "تالاب آلماگل", "برج قابوس", "اقوام مختلف"],
  },
  {
    id: 22,
    name: "خرم آباد",
    image:
      "https://www.flytoday.ir/blog/wp-content/uploads/2023/09/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%AE%D8%B1%D9%85-%D8%A2%D8%A8%D8%A7%D8%AF.jpg",
    hints: ["قلعه فلک‌الافلاک", "غرب ایران", "آبشار نوژیان", "کوهستان"],
  },
  {
    id: 23,
    name: "سنندج",
    image: "https://emroozkojaberim.com/mi_ax/Original/1402/11/554.jpg",
    hints: ["کردستان", "صنایع دستی", "کوه‌های سرسبز", "آب و هوای معتدل"],
  },
  {
    id: 24,
    name: "بوشهر",
    image:
      "https://api2.kojaro.com/media/2018-2-ae424780-3e5e-4a3c-bd25-cf48adc1c7a5-67c460eec1067c5ba763537b",
    hints: ["جنوب ایران", "بندر مهم", "گرمای شدید", "موسیقی محلی"],
  },
  {
    id: 25,
    name: "ایلام",
    image:
      "https://cdn.mojnews.com/thumbnail/i6m84u7n30QK/wYsQRh7N_U9-KhUZFvV4AomaL5yZePK-ajtEs8kcp-9YVVASashH6K5BPTC17PhAidh8SlFsB25MgjrEllAeh62wSuVx7IRc/%D8%A7%DB%8C%D9%84%D8%A7%D9%85+.jpg",
    hints: ["غرب ایران", "جنگل‌های بلوط", "آثار تاریخی", "مرز عراق"],
  },
  {
    id: 26,
    name: "یزد",
    image:
      "https://yazdarghotel.com/wp-content/uploads/2024/04/Sightseeing-places-in-Yazd-1024x546.jpg",
    hints: ["شهر بادگیرها", "کویر", "قنات تاریخی", "شیرینی معروف"],
  },
  {
    id: 27,
    name: "شهر کرد",
    image:
      "https://last-cdn.com/2024/08/18/Km6HbIoWCpd9OYC4OhJucVun8Sr9LjWcaoj87DAS.jpg",
    hints: ["مرکز چهارمحال", "سردترین شهر ایران", "عشایر", "مناطق کوهستانی"],
  },
  {
    id: 28,
    name: "بیرجند",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/%D8%A8%DB%8C%D8%B1%D8%AC%D9%86%D8%AF_%D9%BE%D8%A7%D9%86%D9%88%D8%B1%D8%A7%D9%85%D8%A7.jpg",
    hints: ["شرق ایران", "باغ و عمارت", "صنایع دستی", "مرز افغانستان"],
  },
  {
    id: 29,
    name: "سمنان",
    image:
      "https://www.snapptrip.com/blog/wp-content/uploads/2023/11/pic-38-650x433.jpg",
    hints: ["مسیر تهران-مشهد", "کویر", "صنایع دستی", "هوا گرم"],
  },

  {
    id: 30,
    name: "قزوین",
    image:
      "https://www.eligasht.com/Blog/wp-content/uploads/2017/11/%D9%82%D8%B2%D9%88%DB%8C%D9%86.jpg",
    hints: ["بناهای تاریخی", "آب انبارها", "غذای محلی", "مسیر کوهنوردی"],
  },
  {
    id: 31,
    name: "نیشابور",
    image:
      "https://last-cdn.com/2024/02/12/3FrGmcQZvQ3I1uWq8Cjj6lx9cIZuBzm6cj7TXtlR.jpg",
    hints: ["شهر دانشمندان", "فیروزه نیشابور", "عمر خیام", "مسیر ترانزیت"],
  },
  {
    id: 32,
    name: "کاشان",
    image:
      "https://api2.kojaro.com/media/2017-8-a25ea7db-da97-43ba-8e3e-533a5c4267d6-67c460ddc1067c5ba76162d7",
    hints: ["باغ فین", "خانه‌های تاریخی", "گلاب گیری", "شهر کویری"],
  },
  {
    id: 33,
    name: "چالوس",
    image:
      "https://www.flytoday.ir/blog/wp-content/uploads/2023/06/New-Project.jpg",
    hints: ["جاده چالوس", "نمکآبرود", "مناطق ییلاقی", "رودخانه"],
  },
  {
    id: 34,
    name: "لاهیجان",
    image:
      "https://img9.irna.ir/d/r2/2022/03/22/4/169549249.jpg?ts=1647923474405",
    hints: ["شهر چای", "تله‌کابین", "استخر لاهیجان", "مناطق سرسبز"],
  },
  {
    id: 35,
    name: "آمل",
    image:
      "https://mazbus.com/wp-content/uploads/2021/05/nb23_photo_2018-04-11_23-39-35.jpg",
    hints: ["دشت لار", "کوه دماوند", "رودخانه هراز", "شهر تاریخی"],
  },
  {
    id: 36,
    name: "بابلسر",
    image:
      "https://s.irangard.com/irangard/TourismObject/58581/Media-b54f84ca.jpg",
    hints: ["ساحل ماسه‌ای", "پل معلق", "مناطق تفریحی", "شمال ایران"],
  },
  {
    id: 37,
    name: "تنکابن",
    image: "https://dobaresafar.ir/wp-content/uploads/2022/07/Aghooz-hal-1.jpg",
    hints: ["مرکبات", "مناطق جنگلی", "ساحل دریای خزر", "آب و هوای مرطوب"],
  },
  {
    id: 38,
    name: "رودسر",
    image: "https://cdn.lifee.ir/Data/RenderMagImage/334?type=1",
    hints: ["برنج مرغوب", "مناطق ساحلی", "قلعه بندبن", "آب گرم"],
  },
  {
    id: 39,
    name: "نور",
    image: "https://cdn.lifee.ir/Data/RenderMagImage/334?type=1",
    hints: ["جنگل نور", "ساحل سیسنگان", "مناطق ییلاقی", "رودخانه"],
  },
  {
    id: 40,
    name: "نوشهر",
    image: "https://cdn.lifee.ir/Data/RenderMagImage/334?type=1",
    hints: ["بندر نوشهر", "پارک جنگلی", "موزه دریایی", "مناطق تفریحی"],
  },

  {
    id: 41,
    name: "فومن",
    image:
      "https://navardino.ir/mag/wp-content/uploads/2024/09/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D9%81%D9%88%D9%85%D9%86.jpg",
    hints: ["قلعه رودخان", "مناطق سرسبز", "کلوچه فومن", "شهر تاریخی"],
  },
  {
    id: 42,
    name: "صومعه سرا",
    image:
      "https://media.shabestan.news/old/fa/Original/1401/12/23/IMG08205727.jpg",
    hints: ["تالاب انزلی", "مناطق جنگلی", "برنج معروف", "پل خشتی"],
  },
  {
    id: 43,
    name: "آستارا",
    image: "https://blogsazan.com/img/1594232303_8514635.jpg",
    hints: [
      "مرز آذربایجان",
      "جنگل‌های هیرکانی",
      "بازار مرزی",
      "آب و هوای مرطوب",
    ],
  },
  {
    id: 44,
    name: "مراغه",
    image:
      "https://api2.kojaro.com/media/2018-5-68cf6d95-1411-446b-be3a-2ce80dd6169e-67c460f1c1067c5ba763d636",
    hints: ["رصدخانه مراغه", "گنبد سرخ", "مناطق تاریخی", "دریاچه"],
  },
  {
    id: 45,
    name: "میانه",
    image:
      "https://www.otaghak.com/blog/wp-content/uploads/2019/03/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C_%D8%AF%DB%8C%D8%AF%D9%86%DB%8C_%D9%85%DB%8C%D8%A7%D9%86%D9%87_%D8%A7%D8%AA%D8%A7%D9%82%DA%A9_-3.jpg",
    hints: ["پل دختر", "مناطق کوهستانی", "مسیر ترانزیت", "تاریخ کهن"],
  },
  {
    id: 46,
    name: "خلخال",
    image:
      "https://ardabilkharid.com/wp-content/uploads/2023/07/%D8%B4%D9%87%D8%B1%D8%B3%D8%AA%D8%A7%D9%86-%D8%AE%D9%84%D8%AE%D8%A7%D9%84.jpg",
    hints: ["مناطق ییلاقی", "آب گرم", "کوهستان", "صنایع دستی"],
  },
  {
    id: 47,
    name: "سرعین",
    image:
      "https://melkardebil.ir/wp-content/uploads/2024/06/-%D8%B2%DB%8C%D8%A8%D8%A7%DB%8C-%D8%B3%D8%B1%D8%B9%DB%8C%D9%86-41683673-e1718701207391.webp",
    hints: ["آب گرم", "مناطق توریستی", "هتل‌های لوکس", "آذربایجان شرقی"],
  },
  {
    id: 48,
    name: "پارس‌آباد",
    image:
      "https://ulduzmughan.com/wp-content/uploads/2017/10/parsabad-mughan-city-1-1.jpg",
    hints: ["مرز جمهوری آذربایجان", "دشت مغان", "کشاورزی", "مناطق گرم"],
  },
  {
    id: 49,
    name: "گرمی",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Germi_Nights1.jpg",
    hints: ["مناطق مرزی", "دشت مغان", "کشاورزی", "آب و هوای معتدل"],
  },
  {
    id: 50,
    name: "مشگین شهر",
    image:
      "https://lahzeakhar.com/Files/Eventimg/338ed51a-b76c-49a6-bd38-870e97f70b35.webp",
    hints: ["قلعه قهقهه", "آب گرم", "مناطق تاریخی", "کوه سبلان"],
  },

  {
    id: 51,
    name: "کوهدشت",
    image: "https://arandtour.com/mi_ax/Original/1402/08/10662.jpg",
    hints: ["مناطق کوهستانی", "طبیعت بکر", "غارها", "لرستان"],
  },
  {
    id: 52,
    name: "الیگودرز",
    image:
      "https://zange-ensha.ir/wp-content/uploads/2025/01/%D8%A7%D9%86%D8%B4%D8%A7-%D8%A7%D9%84%DB%8C%DA%AF%D9%88%D8%AF%D8%B1%D8%B2.webp",
    hints: ["کوهستان", "مناطق ییلاقی", "آب و هوای خنک", "طبیعت زیبا"],
  },
  {
    id: 53,
    name: "بروجرد",
    image:
      "https://www.flytoday.ir/blog/wp-content/uploads/2024/01/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%A8%D8%B1%D9%88%D8%AC%D8%B1%D8%AF-30.jpg",
    hints: ["مسجد جامع", "شهر تاریخی", "صنایع دستی", "مناطق کوهپایه‌ای"],
  },
  {
    id: 54,
    name: "دورود",
    image: "https://cdn.lifee.ir/Data/RenderMagImage/571?type=1",
    hints: ["راه‌آهن", "مناطق کوهستانی", "طبیعت سرسبز", "مرکز استان"],
  },
  {
    id: 55,
    name: "ازنا",
    image:
      "https://rokida.com/wp-content/uploads/2024/01/%D8%A7%D8%B2%D9%86%D8%A7-%DA%A9%D8%AC%D8%A7%D8%B3%D8%AA-%D9%88-%D8%AC%D8%A7%D8%B0%D8%A8%D9%87-%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%A2%D9%86-%DA%A9%D8%AF%D8%A7%D9%85%D9%86%D8%AF%D8%9F2.jpg",
    hints: ["مناطق کوهستانی", "طبیعت بکر", "آب و هوای خنک", "لرستان"],
  },
  {
    id: 56,
    name: "پلدختر",
    image: "https://cdn.mashreghnews.ir/d/2019/04/23/4/2500452.jpg",
    hints: ["پل تاریخی", "مناطق گرم", "طبیعت خاص", "لرستان"],
  },
  {
    id: 57,
    name: "سلسله",
    image:
      "https://newsmedia.tasnimnews.com/Tasnim/Uploaded/Image/1393/12/28/139312281216236934952774.jpg",
    hints: ["مناطق تاریخی", "طبیعت بکر", "کوهستان", "لرستان"],
  },
  {
    id: 58,
    name: "نور آباد",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/New_koshk.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "کوهستان", "لرستان"],
  },
  {
    id: 59,
    name: "کوهرنگ",
    image:
      "https://www.eligasht.com/Blog/wp-content/uploads/2019/06/%DA%A9%D9%88%D9%87%D8%B1%D9%86%DA%AF.jpg4_.jpg",
    hints: ["چشمه کوهرنگ", "مناطق ییلاقی", "آب و هوای خنک", "چهارمحال"],
  },
  {
    id: 60,
    name: "اردل",
    image:
      "https://api2.kojaro.com/media/2022-10-01c92c6c-8c4a-4bc6-b060-bb7a7af5f278-67c46112c1067c5ba7680c32",
    hints: ["مناطق کوهستانی", "طبیعت بکر", "چهارمحال", "آب و هوای خنک"],
  },

  {
    id: 61,
    name: "فریدون شهر",
    image: "https://cdn.mashreghnews.ir/d/2022/02/07/4/3389773.jpg",
    hints: ["مناطق سردسیر", "طبیعت زیبا", "اصفهان", "آب و هوای خنک"],
  },
  {
    id: 62,
    name: "سمیرم",
    image:
      "https://www.pateh.com/blog/wp-content/uploads/2024/07/waterfalls.webp",
    hints: ["مناطق ییلاقی", "طبیعت سرسبز", "اصفهان", "آب و هوای معتدل"],
  },
  {
    id: 63,
    name: "شهرضا",
    image:
      "https://history.mui.ac.ir/sites/media/files/users/user82/shhrda.jpg",
    hints: ["صنایع دستی", "مناطق تاریخی", "اصفهان", "مسجد جامع"],
  },
  {
    id: 64,
    name: "گلپایگان",
    image:
      "https://media.karnaval.ir/uploads/2023/09/9003f99a-654c-4a5d-bca0-7f1b65ebf66d.jpg",
    hints: ["مناطق تاریخی", "صنایع دستی", "اصفهان", "مسجد جامع"],
  },
  {
    id: 65,
    name: "خوانسار",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Khansar_paeizi.jpg",
    hints: ["مناطق ییلاقی", "طبیعت زیبا", "اصفهان", "آب و هوای خنک"],
  },
  {
    id: 66,
    name: "نجف آباد",
    image: "https://www.injaisfahan.ir/images/news/2018/02/19/1519069498.jpg",
    hints: ["شهر صنعتی", "مناطق تاریخی", "اصفهان", "پسته معروف"],
  },
  {
    id: 67,
    name: "مبارکه",
    image:
      "https://www.mobarakeh.ir/images/gallerys/tasavirmobarakeh/p1ba7gi25m1tn81ie91i1v7lq5tb4.jpg",
    hints: ["شهر صنعتی", "مناطق تاریخی", "اصفهان", "کارخانه‌های بزرگ"],
  },
  {
    id: 68,
    name: "دهاقان",
    image:
      "https://lh3.googleusercontent.com/proxy/bABqRODj0aQ6cVILkQ7YUbkM53vCMYiUJq1QAmh10ojj03GDV0zQvzCTzALGMaNfBP7EeXe-D5rCx2Bzyz-JNqVVo4oyGg_J3Hq1DHYgZCy6POIcIoA1qnrWz3LUXck1ZQMrTzQ-GIEa",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "اصفهان", "آب و هوای معتدل"],
  },
  {
    id: 69,
    name: "تیران",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Tiran_ghameshloo.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "اصفهان", "آب و هوای معتدل"],
  },
  {
    id: 70,
    name: "کرون",
    image:
      "https://isftour.ir/wp-content/uploads/2017/08/%D8%AA%DB%8C%D8%B1%D8%A7%D9%86-1-750x350.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "اصفهان", "آب و هوای معتدل"],
  },

  {
    id: 71,
    name: "بوانات",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/bavanat-iran-fars-shiraz-768x530-1.jpg.webp",
    hints: ["مناطق ییلاقی", "طبیعت سرسبز", "فارس", "آب و هوای خنک"],
  },
  {
    id: 72,
    name: "اقلید",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/eghlid-in-iran-768x512-1.jpg.webp",
    hints: ["مناطق کوهستانی", "طبیعت بکر", "فارس", "آب و هوای خنک"],
  },
  {
    id: 73,
    name: "خرم بید",
    image: "https://sepanja.com/public/uploads/place/822/1398716163440.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 74,
    name: "سپیدان",
    image:
      "https://lidomatrip.com/blog/wp-content/uploads/2021/07/%D8%B4%D8%B4-%D9%BE%DB%8C%D8%B1-%D8%B3%D9%BE%DB%8C%D8%AF%D8%A7%D9%86-%DA%A9%D8%AC%D8%A7%D8%B3%D8%AA.jpg",
    hints: ["مناطق ییلاقی", "طبیعت سرسبز", "فارس", "آب و هوای خنک"],
  },
  {
    id: 75,
    name: "مرودشت",
    image:
      "https://ofoghemarvdasht.ir/wp-content/uploads/2023/04/%D8%AA%D8%AE%D8%AA-%D8%AC%D9%85%D8%B4%DB%8C%D8%AF.jpg",
    hints: ["تخت جمشید", "مناطق تاریخی", "فارس", "آثار باستانی"],
  },
  {
    id: 76,
    name: "فسا",
    image:
      "https://ofoghemarvdasht.ir/wp-content/uploads/2023/04/%D8%AA%D8%AE%D8%AA-%D8%AC%D9%85%D8%B4%DB%8C%D8%AF.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 77,
    name: "داراب",
    image: "https://cdn.isna.ir/d/2019/02/24/3/57835505.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای گرم"],
  },
  {
    id: 78,
    name: "زرقان",
    image: "https://img9.irna.ir/d/r2/2020/02/05/3/156941178.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 79,
    name: "کازرون",
    image:
      "https://home.mehromah.ir/uploads/posts/2022-01/1643527582_c261e405-4980-4477-8c8d-5124ce3f6630-840x560.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای گرم"],
  },
  {
    id: 80,
    name: "فراشبند",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np3n1C_7-95tUcL-VrP12D2NlxJZMJIH8GRkxyK1Sha1Q5hiOj8VRHP2EfgnUMpCuRoplNd6yZ6WyH9daVaLoGkctr5n9Q45tVE6y5V5UGQYfoF9wUxocrz7cb2iuxBlVC1QQNIhA=w675-h390-n-k-no",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای گرم"],
  },

  {
    id: 81,
    name: "قیر",
    image:
      "https://newsmedia.tasnimnews.com/Tasnim/Uploaded/Image/1395/09/28/139509281334281459481414.jpg",
    hints: ["مناطق گرم", "طبیعت خاص", "فارس", "آب و هوای خشک"],
  },
  {
    id: 82,
    name: "کارزین",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2020/01/Ghirokarzin.jpg.webp",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 83,
    name: "خرامه",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/kharameh-in-iran.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 84,
    name: "استهبان",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2020/01/istahban-with-gardeshgaranshiraz.jpg",
    hints: ["انگور معروف", "مناطق تاریخی", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 85,
    name: "نی ریز",
    image:
      "https://bashgahfarhangian.com/wp-content/uploads/2022/05/DSC_2811-HDR_10-1-scaled.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای گرم"],
  },
  {
    id: 86,
    name: "بختگان",
    image: "https://irantripadviser.ir/cropw.php?s=1&src=img/427-1.jpg",
    hints: ["دریاچه بختگان", "مناطق تاریخی", "فارس", "آب و هوای گرم"],
  },
  {
    id: 87,
    name: "ارسنجان",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/green-pearl.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 88,
    name: "سروستان",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/green-pearl.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای معتدل"],
  },
  {
    id: 89,
    name: "خنج",
    image:
      "https://gardeshgaranshiraz.com/wp-content/uploads/2018/08/jame-mosque-gardeshgaran-shiraz.jpg",
    hints: ["مناطق تاریخی", "طبیعت زیبا", "فارس", "آب و هوای گرم"],
  },
  {
    id: 90,
    name: "لار",
    image:
      "https://reiseniran.de/wp-content/uploads/2021/12/%D8%B4%D9%87%D8%B1-%D9%84%D8%A7%D8%B1.jpeg",
    hints: ["مناطق گرم", "طبیعت خاص", "فارس", "آب و هوای خشک"],
  },
];
const getRandomPlaces = (): Place[] => {
  const shuffled = [...PLACES];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, 15);
};

export default getRandomPlaces;