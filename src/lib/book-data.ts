// lib/book-data.ts
import { quranBook, bookCategories, allBooks } from "./mainpage-book";

export type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  slug?: string //for SEO URL
  school?: string; //for jurisprudence school
  downloadLinks: string[];
  readLinks: string[];
  volumes?: number;
  keywords: string[];
};

export type BookCategory = {
  id: string;
  title: string;
  books: Book[];
};

const historyBooks: Book [] = [
   {
        "id": "bulugh-al-maram",
        "title": "Bulugh al-Maram",
        "description": "The Muqaddimah, written by the eminent Islamic scholar and historian Ibn Khaldun in the 14th century, is a foundational text in the fields of sociology, historiography, and philosophy of history. Often translated as The Introduction, this work serves as a preface to Ibn Khaldun's larger historical narrative, providing profound insights into the nature of society, the dynamics of civilizations, and the processes of social change. Ibn Khaldun introduces his innovative concepts, such as 'Asabiyyah (social cohesion or group solidarity) and the cyclical theory of history, which explains how societies rise, flourish, and eventually decline. He argues that strong social bonds and collective identity are essential for the prosperity of any civilization, while the weakening of these bonds leads to its downfall.",
        "coverImage": "/images/Goodreads.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1enCwLJsPqqeLzNEvhZUwWSM6b5VNnmko"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1enCwLJsPqqeLzNEvhZUwWSM6b5VNnmko/preview"
        ],
        keywords: []
      },
       {
        "id": "in-the-shadow-of-the-sword",
        "title": "In the Shadow of the Sword",
        "description": "In the Shadow of the Sword: The Birth of Islam and the Rise of the Global Arab Empire offers a captivating historical narrative that delves into the origins of Islam and the subsequent expansion of the Arab Empire. This work explores the socio-political dynamics that facilitated the rapid spread of Islam, analyzing key events, figures, and movements that shaped early Islamic history. The author investigates how the teachings of the Prophet Muhammad (peace be upon him) and the early caliphs influenced the establishment of a vast empire, which laid the foundations for future civilizations. By weaving together historical facts and engaging storytelling, this book provides readers with a nuanced understanding of the transformative impact of Islam on the world stage and the enduring legacy of the Arab Empire.",
        "coverImage": "/images/In the Shadow of the Sword_ The Birth of Islam and the Rise of the Global Arab Empire.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1PPpHBMIOUKLHN0f_fUIrIRAIUFAbVgeX"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1PPpHBMIOUKLHN0f_fUIrIRAIUFAbVgeX/preview"
        ],
        keywords: []
      },
      {
        "id": "great-women-of-islam",
        "title": "Great Women of Islam",
        "description": "Great Women of Islam showcases the inspiring stories and contributions of influential women from the time of the Prophet Muhammad (PBUH). The book highlights the vital roles these women played in shaping Islamic history, emphasizing their strength, wisdom, and resilience. Through engaging narratives, it sheds light on their significant achievements in various fields, such as education, community service, and social reform. The work serves as a tribute to these remarkable women, offering readers valuable insights into their legacies and the lessons that can be learned from their lives.",
        "coverImage": "/images/Great Women of Islam (Paperback).jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1hLtwF_EVQK5ZFxYaVkbfYkcj7CdeE5LZ"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1hLtwF_EVQK5ZFxYaVkbfYkcj7CdeE5LZ/preview"
        ],
        keywords: []
      },
    
      {
        "id": "khilafate-usmania",
        "title": "Khilafate Usmania",
        "description": "Khilafate Usmania (Ottoman Caliphate) provides an in-depth historical account of the rise and fall of the Ottoman Empire, which ruled much of the Islamic world for centuries. The book highlights the significant achievements, governance, military prowess, and cultural contributions of the Ottoman Caliphs. It also explores the eventual decline of the empire and its impact on the modern Middle East, offering a detailed narrative on the political, social, and religious factors that shaped this powerful caliphate.",
        "coverImage": "/images/khilafateusmania.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download%id=1MlH5gmBhGz-omoWn8dihDEGNtr622Erf"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1MlH5gmBhGz-omoWn8dihDEGNtr622Erf/preview"
        ],
        keywords: []
      },
      {
        "id": "khilafat-e-rashida",
        "title": "Khilafat-e-Rashida",
        "description": "Khilafat-e-Rashida details the era of the Rightly Guided Caliphs, the first four successors of Prophet Muhammad (PBUH) who led the Muslim world after his passing. This book covers the leadership of Abu Bakr, Umar, Uthman, and Ali, focusing on their governance, justice, military conquests, and challenges. It highlights their dedication to the principles of Islam, offering insights into their contributions to the expansion and consolidation of the Islamic state.",
        "coverImage": "/images/khilafat_e_rashida.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1wNljGzb0H2_sYprjdpHRmpznC9hkJYF5"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wNljGzb0H2_sYprjdpHRmpznC9hkJYF5/preview"
        ],
        keywords: []
      },
      {
        "id": "the-caliphate-of-banu-umayyah-",
        "title": "The Caliphate of Banu Umayyah ",
        "description": "In The Caliphate of Banu Umayyah, Ibn Kathir offers a thorough analysis of the Umayyad Dynasty, which was the first hereditary Islamic caliphate. The book provides an account of the political, military, and cultural developments during this period, examining the caliphs' roles in expanding the Islamic empire. It also discusses the internal struggles, conflicts with external empires, and the eventual decline of Umayyad rule, offering readers a historical perspective on this critical era of Islamic history.",
        "coverImage": "/images/banu-umayyah.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1bc9oIJTyhCxWql-MawE3Q0YEWNB7vhCN"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1bc9oIJTyhCxWql-MawE3Q0YEWNB7vhCN/preview"
        ],
        keywords: []
      },
      {
        "id": "khilafat-o-malukiyat",
        "title": "Khilafat o Malukiyat",
        "description": "Khilafat o Malukiyat explores the transition from the Islamic caliphate system to monarchical rule within Islamic history, particularly focusing on the Umayyad dynasty. The author delves into the differences between the principles of caliphate governance and the monarchical practices that followed. It presents a critical look at the political shifts, the change in leadership styles, and the influence this transition had on the Muslim world, highlighting the tension between ideal Islamic governance and the realities of power politics.",
        "coverImage": "/images/khilafatomalukiyat.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1WckGZvYvRxQ7E4I1Xh9MM-_3Y2ThdjUG"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1WckGZvYvRxQ7E4I1Xh9MM-_3Y2ThdjUG/preview"
        ],
        keywords: []
      }
    ]

const philosophyBooks: Book [] = [

  {
        "id": "reconstruction-of-religious-thought-in-islam",
        "title": "Reconstruction of Religious Thought in Islam",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/reconstruction-of-religious-thoughts.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1Ea_UKYhdYuk87qbUJbcDC6xFMs5y5KdK/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1Ea_UKYhdYuk87qbUJbcDC6xFMs5y5KdK/view?usp=drive_link"
        ],
        keywords: []
      },
      {
        "id": "alchemy-of-happiness",
        "title": " Alchemy of Happiness",
        "description": "Written by the renowned Persian philosopher Al-Ghazali, The Alchemy of Happiness is a spiritual guide that focuses on achieving true happiness through self-awareness and the pursuit of inner purity. It delves into the nature of the soul, the importance of religious practice, and the realization of divine love. Ghazali's work teaches the balance between worldly life and spiritual growth, offering wisdom that encourages a deep connection with God while navigating life's challenges.",
        "coverImage": "/images/alchemyofhappiness.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1E6DMOZ8W9ivF3WBGJYTffnqY2MvWxBRY/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1E6DMOZ8W9ivF3WBGJYTffnqY2MvWxBRY/view?usp=drive_link"
        ],
        keywords: []
      },
      {
        "id": "the-perfect-state",
        "title": "The Perfect State",
        "description": "Authored by the philosopher Al-Farabi, The Perfect State is a pioneering work in political philosophy, discussing the ideal society governed by virtuous and wise leadership. Al-Farabi merges Islamic and Greek philosophical ideas to outline a vision where justice, ethics, and intellect reign supreme. He describes the characteristics of a ruler who embodies knowledge and righteousness, promoting a utopian vision of governance that inspires order, peace, and moral excellence.",
        "coverImage": "/images/perfect-state.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1rDq7o1QS-HcRqNEcSoIQCWaF8B1d6o8d/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1rDq7o1QS-HcRqNEcSoIQCWaF8B1d6o8d/view?usp=drive_link"
        ],
        keywords: []
      },
      {
        "id": "minhaj-al-abideen",
        "title": " Minhaj Al-Abideen",
        "description": "Minhaj Al-Abideen is a profound guide by Imam Al-Ghazali, outlining the spiritual path of worship and devotion to Allah. The book is structured around the stages and obstacles that believers face in their journey towards spiritual fulfillment. It provides practical advice on overcoming worldly distractions, improving one's character, and attaining closeness to God. Al-Ghazali emphasizes sincerity, humility, and perseverance as essential qualities for spiritual progress.",
        "coverImage": "/images/minhaj-abideen.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1_F1yiH3-9fEMn901kxWAth9lNwRxHjoB/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1_F1yiH3-9fEMn901kxWAth9lNwRxHjoB/view?usp=drive_link"
        ],
        keywords: []
      },
      {
        "id": "Inchorence-of-philosophy",
        "title": "The Incoherence of Philosophy",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/incoherenceofphilosophy.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1ic7jIMnTybMlYztaSgWYN5jfJ97fKKY3/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ic7jIMnTybMlYztaSgWYN5jfJ97fKKY3/view?usp=drive_link"
        ],
        keywords: []
      },
      {
        "id": "Sharah-Al-Mukhtasar",
        "title": "Sharah al-mukhtasar",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/sharahalmukhtasar.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1HvK07vDhWaXkXbiVJ2MNR9r8IiznxBnM/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1HvK07vDhWaXkXbiVJ2MNR9r8IiznxBnM/view?usp=drive_link"

        ],
        keywords: []
      },
    ]

const islamicJurisprudenceBooks: BookCategory[] = [
  {
    "id": "usul-al-hanafi",
    "title": "Foundation of Hanafi Jurisprudence </br> (Usul al-Fiqh al-Hanafi)",
    "books": [
      {
        "id": "Mukhtasar-al-quduri",
        "title": "The Mukhtasar Al-Quduri",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/mukhtasar.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801906.us.archive.org/27/items/quduri.....-eng..-ahmad-ibn-muh/Quduri.....Eng..Ahmad%20Ibn%20Muh.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801906.us.archive.org/27/items/quduri.....-eng..-ahmad-ibn-muh/Quduri.....Eng..Ahmad%20Ibn%20Muh.pdf", //1
         
        ],
        keywords: []
      },
      {
        "id": "al-hidaya",
        "title": "Al-Hidayah",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/alhidayah.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/12uk5bsgD__X2U4_ahTLv_z2sdUXbbvsa/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/12uk5bsgD__X2U4_ahTLv_z2sdUXbbvsa/view?usp=drive_link", //1
         
        ],
        keywords: []
      },
      {
        "id": "al-figh-al-muyassur",
        "title": "Al-Fiqh-Ul-Muyassar",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/fiqhalmuyassar.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://dn790006.ca.archive.org/0/items/al-fiqh-ul-muyassar-urdu/AL-FIQH-UL-MUYASSAR-URDU.pdf", //1
          
        ],
        "readLinks": [
          "https://dn790006.ca.archive.org/0/items/al-fiqh-ul-muyassar-urdu/AL-FIQH-UL-MUYASSAR-URDU.pdf", //1
         
        ],
        keywords: []
      },
      {
        "id": "ascent-to-felicity",
        "title": "Ascent To Felicity (Maraqi al-Sa‘adat)",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/acsenttofecility.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801806.us.archive.org/29/items/ascent-to-felicity/Ascent%20to%20Felicity.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801806.us.archive.org/29/items/ascent-to-felicity/Ascent%20to%20Felicity.pdf", //1
         
        ],
        keywords: []
      },
      {
        "id": "umdat-ul-fiqh",
        "title": "Umdat ul Fiqh",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi (d. 1981): A comprehensive, well-organized four-volume set covering the five pillars of Islam (beliefs, purification, prayer, zakat, fasting, and hajj). It’s detailed yet accessible for laypeople, making it a highly recommended resource for Urdu readers. Available through publishers in Pakistan, such as Mohra Sharif.",
        "coverImage": "/images/umdatulfiqh.jpg",
        "volumes": 3,
        "downloadLinks": [
          "https://ia801304.us.archive.org/2/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-1.pdf", //1
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-2.pdf",
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-3.pdf"
          
        ],
        "readLinks": [
          "https://ia801304.us.archive.org/2/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-1.pdf", //1
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-2.pdf",
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-3.pdf"
         
        ],
        keywords: []
      },
      {
        "id": "zubdat-ul-fiqh",
        "title": "Zubdat Ul Fiqh",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/zubdatulfiqh.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801708.us.archive.org/21/items/Zubdat-ul-fiqhhanafiUrdu/Zubdat-ul-Fiqh.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801708.us.archive.org/21/items/Zubdat-ul-fiqhhanafiUrdu/Zubdat-ul-Fiqh.pdf", //1
         
        ],
        keywords: []
      },
      {
        "id": "bahar-e-shariat",
        "title": "Bahar e Shariat",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/bahareshariat.jpeg",
        "volumes": 6,
        "downloadLinks": [
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-a.pdf", //1
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-b.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-b%20%281%29.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-b.pdf"
          
        ],
        "readLinks": [
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-a.pdf", //1
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-b.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-b%20%281%29.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-b.pdf"
        ],
        keywords: []
      },
      {
        "id": "fiqh-e-hanafi",
        "title": "Fiqh e Hanafi",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/fiqhehanafi.jpeg",
        "volumes": 3,
        "downloadLinks": [
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%201.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%202.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%203.pdf"
          
        ],
        "readLinks": [
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%201.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%202.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%203.pdf"
        ],
        keywords: []
      },
    ]
  },
   {
    "id": "usul-al-maliki",
    "title": "Foundation of Maliki Jurisprudence </br> (Usul al-Fiqh al-Maliki)",
    "books": [
      {
        "id": "al-muqaddimat-al-izziyat",
        "title": "Al-Muqaddimat-Al-Izziyat",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/almuqaddimah.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1RBdE3uRDFCddxr-rurFMA74BTgTKmm8J/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1RBdE3uRDFCddxr-rurFMA74BTgTKmm8J/view?usp=drive_link", //1
         
        ],
        keywords: []
      },
      {
        "id": "al-murshad-al-muin",
        "title": "Al-Murshad-Al-Muin",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/almurshid.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1aZ-RbwgWo1LUgLBbXYlMwyi0cFP3yKLe/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1aZ-RbwgWo1LUgLBbXYlMwyi0cFP3yKLe/view?usp=drive_link", //1
         
        ],
        keywords: []
      },
      {
        "id": "akhdari",
        "title": "Mukhtasar Al-Akhdari",
        "description": "The understanding of the acts of worship according to the Maliki school of Islamic law. Imam al-Akhdari . He is an Algerian scholar whose full name is Abū Yazīd ʿAbdur Raḥmān bin Muḥammad al-Ṣaghīr bin Muḥammad bin ʿĀmir.",
        "coverImage": "/images/almukhtasar.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1OcYzt4ZlwYamCq5At_wJt5CegQbF_pWr/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1OcYzt4ZlwYamCq5At_wJt5CegQbF_pWr/view?usp=drive_link", //1
         
        ],
        keywords: []
      },
      {
        "id": "al-muwatta",
        "title": "Al-Muwatta",
        "description": "A foundational hadith collection and fiqh text by Imam Malik himself, it’s advanced but essential for understanding Maliki rulings. Beginners should avoid studying it without a teacher due to its complexity. English translations, like Aisha Bewley’s, are available.",
        "coverImage": "/images/al-muwatta.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq/edit", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq/edit", //1
         
        ],
        keywords: []
      },
    ]
  },
   {
    "id": "usul-al-shafi'i",
    "title": "Foundation of Shafi'i Jurisprudence </br> (Usul al-Fiqh al-Shafi'i)",
    "books": [
       {
        "id": "safinat-al-najah",
        "title": "Safinat Al-Naja",
        "description": "A concise Shafi’i fiqh text focusing on worship (purification, prayer, fasting, zakat). It’s widely used in Shafi’i curricula and suitable for beginners.",
        "coverImage": "/images/safinatalnaja.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
          
        ],
        "readLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
         
        ],
        keywords: []
      },
       {
        "id": "The Reliance of the Traveller",
        "title": "The Reliance of the Traveller",
        "description": "The Reliance of the Traveller (Umdat as-Salik) is a classical manual of Islamic jurisprudence (fiqh) according to the Shafi'i school, translated and annotated by Nuh Ha Mim Keller. This authoritative work covers a wide range of topics, including acts of worship, marriage, business transactions, criminal law, and much more, providing practical guidelines for Muslims on how to lead a life in accordance with Islamic principles. The book is not only a legal guide but also a spiritual manual, combining legal rulings with moral and ethical teachings. It has become a widely referenced text for both scholars and laypersons, offering a clear and concise path for adhering to Islamic law and maintaining personal piety.",
        "coverImage": "/images/reliance-of-traveller.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://dn790002.ca.archive.org/0/items/sharia-reliance-of-the-traveller/Sharia%20-%20Reliance%20Of%20The%20Traveller.pdf", //1
          
        ],
        "readLinks": [
          "https://dn790002.ca.archive.org/0/items/sharia-reliance-of-the-traveller/Sharia%20-%20Reliance%20Of%20The%20Traveller.pdf", //1
         
        ],
        keywords: []
      },
    ]
   },
   {
    "id": "usul-al-hanbali",
    "title": "Foundation of Hanbali Jurisprudence </br> (Usul al-Fiqh al-Hanbali)",
    "books": [
     
    ]
  },
]


const iqbalBooks: Book[] = [
  {
        "id": "bang-e-dara",
        "title": " Bang-e-Dara",
        "description": "Bang-e-Dara (The Call of the Marching Bell) is a collection of poems by the renowned philosopher and poet Allama Muhammad Iqbal. Written over a span of several years, the poems are a mix of personal reflections and nationalistic aspirations. The early poems in the collection are marked by a deep connection to Iqbal's homeland and contain verses on nature, love, and human emotions. However, as the collection progresses, Iqbal’s poetry shifts toward awakening the Muslim Ummah from its slumber. In these poems, he laments the decline of Islamic civilization and calls for a revival through self-awareness, action, and unity. Bang-e-Dara is a timeless masterpiece that continues to inspire individuals striving for intellectual and spiritual growth.",
        "coverImage": "/images/bangedara.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1fIX03tsiIX2Wx1yCJyeqjb0olQufnBZR"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1fIX03tsiIX2Wx1yCJyeqjb0olQufnBZR/preview"
        ],
          keywords: []

      },
      {
        "id": "baal-e-jibreel",
        "title": " Baal-e-Jibreel",
        "description": "Baal-e-Jibreel (Gabriel's Wing) is a profound poetic work by Allama Iqbal that delves into the themes of selfhood, spirituality, and the pursuit of higher ideals. The book is divided into three sections, each reflecting Iqbal’s deep philosophical musings on life, faith, and human potential. The first section, written in Persian, invokes the spirit of Gabriel, symbolizing divine inspiration and guidance. The Urdu section focuses on the Muslim world's need for self-realization and resilience. Throughout the work, Iqbal urges Muslims to awaken from their slumber, break free from complacency, and reclaim their lost glory through strength, wisdom, and faith. The final section speaks to the timeless values of courage, justice, and perseverance. Baal-e-Jibreel is not only a call to action but also a profound meditation on human potential and the spiritual journey.",
        "coverImage": "/images/baalejibreal.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&pid=1wli8OnPHsAjolpxjb582D-BplsIkF1pW"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wli8OnPHsAjolpxjb582D-BplsIkF1pW/preview"
        ],
          keywords: []

      },
      {
        "id": "shikwa-jawab-e-shikwa",
        "title": "Shikwa Jawab-e-Shikwa",
        "description": "Shikwa (The Complaint) and Jawab-e-Shikwa (The Answer to the Complaint) are two interconnected poems that present a unique dialogue between a disillusioned Muslim and Allah. In Shikwa, Iqbal expresses the frustration and disappointment of Muslims, questioning why they suffer despite being faithful. The poem articulates the grievances of the Muslim community, lamenting their fallen state in the world. Jawab-e-Shikwa is Allah’s response, delivered in majestic and empowering language. Iqbal’s Allah tells the Muslim world that their downfall is not due to divine abandonment but their own neglect of the principles of Islam. He emphasizes that Muslims must reclaim their position by embodying the virtues of courage, unity, and hard work. These two poems resonate with powerful emotions and remain some of Iqbal’s most celebrated works, touching on the themes of divine justice, human responsibility, and the revival of the Islamic spirit.",
        "coverImage": "/images/shikwa.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1wIkk_b845XRTxJ_OQXS0Xd7HaNJSJ66a"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wIkk_b845XRTxJ_OQXS0Xd7HaNJSJ66a/preview"
        ],
          keywords: []
      },
      {
        "id": "reconstruction-of-religious-thought-in-islam",
        "title": "Reconstruction of Religious Thought in Islam",
        "description": "In The Reconstruction of Religious Thought in Islam, Allama Iqbal offers a groundbreaking analysis of Islamic philosophy in the modern age. This collection of essays reflects Iqbal’s efforts to reconcile Islamic teachings with contemporary intellectual challenges. Iqbal explores subjects such as the role of reason in Islam, the nature of reality, and the relationship between religion and science. He critiques traditional Islamic theology for becoming stagnant and calls for a dynamic, evolving understanding of the faith. Iqbal argues that Islamic thought must be reconstructed to meet the demands of modern life, and he emphasizes the importance of ijtihad (independent reasoning) in this process. This book is a profound contribution to Islamic philosophy and is essential reading for those seeking to engage with the intellectual and spiritual dimensions of Islam in a modern context.                ",
        "coverImage": "/images/reconstruction-of-religious-thoughts.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1nHNj2F883pJ0xu8Sghy8tZhidyd9Z-7N"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1nHNj2F883pJ0xu8Sghy8tZhidyd9Z-7N/preview"
        ],
          keywords: []
      },
      {
        "id": "zarb-e-kaleem",
        "title": "Zarb-e-Kaleem",
        "description": "Zarb-e-Kaleem (The Rod of Moses) is one of Allama Iqbal’s most significant works, written as a philosophical response to the various challenges facing the Muslim world in the 20th century. This collection of poetry is a passionate critique of Western materialism and the weakening state of Muslim societies. Iqbal uses the metaphor of Moses' Rod, symbolizing a tool of transformation and deliverance, to encourage Muslims to awaken from their slumber and lead a moral and spiritual revolution. The themes in Zarb-e-Kaleem emphasize the importance of self-awareness, the need for a new moral order, and the revitalization of the Muslim Ummah through action and faith. This work serves as a call to Muslims to resist external domination and internal decay by adhering to the true principles of Islam.",
        "coverImage": "/images/zarbekaleem.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1ExIM2ZrEwxp5LapjK5P8mGJjlcrNfXty"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ExIM2ZrEwxp5LapjK5P8mGJjlcrNfXty/preview"
        ],
          keywords: []
      },
      {
        "id": "javed-nama",
        "title": "Javed Nama",
        "description": "Javed Nama is often regarded as one of Allama Iqbal’s most ambitious works, taking the form of a spiritual journey akin to Dante’s Divine Comedy. Written in Persian, Javed Nama chronicles Iqbal’s celestial journey through the spheres of the universe, where he meets great historical and spiritual figures who impart their wisdom. The journey is named after Iqbal’s son, Javed, symbolizing the transmission of wisdom to future generations. Throughout this allegorical journey, Iqbal addresses the themes of selfhood, immortality, and the eternal struggle between good and evil. The work explores Islamic, Sufi, and philosophical concepts, blending them into a powerful narrative that encourages Muslims to seek knowledge, cultivate their inner strength, and contribute to the betterment of humanity.",
        "coverImage": "/images/javednama.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1vEzz0DRssHO4MZ2S5lpB0mXsIOmmVnjU"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1vEzz0DRssHO4MZ2S5lpB0mXsIOmmVnjU/preview"
        ],
          keywords: []
      },
      {
        "id": "kulyat-e-iqba",
        "title": "Kulyat-e-Iqba",
        "description": "Kulyat-e-Iqbal is a comprehensive collection of Allama Muhammad Iqbal’s Urdu and Persian poetry, encompassing his major poetic works. The collection brings together his profound thoughts on philosophy, religion, selfhood, and society. Iqbal's poetry resonates with themes of spiritual awakening, the quest for freedom, and the realization of human potential. His works such as Bang-e-Dara, Baal-e-Jibreel, Zarb-e-Kaleem, and Asrar-e-Khudi are all included in this volume, reflecting his deep concern for the Muslim Ummah and humanity as a whole. Kulyat-e-Iqbal offers readers a complete picture of Iqbal’s literary genius, providing insights into his intellectual journey, his thoughts on the human condition, and his vision for a just and enlightened world. This collection is a treasure trove for those seeking to explore the depth of Iqbal’s poetic universe.                ",
        "coverImage": "/images/kulyateiqbal.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1xSguMdTt3lAy2TqQNTH6x8fqOvLBJPLp"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1xSguMdTt3lAy2TqQNTH6x8fqOvLBJPLp/preview"
        ],
          keywords: []
      },
      {
        "id": "aaina-e-haram",
        "title": "Aaina-e-Haram",
        "description": "Aaina-e-Haram (The Mirror of the Sacred) is a poetic work that addresses the relationship between the Muslim individual and the broader community, urging introspection and moral rejuvenation. Iqbal, in this collection, reflects on the struggles of the Muslim world and calls for a return to the true essence of Islam. He emphasizes that Muslims must examine their inner selves, just as one looks into a mirror, to recognize their shortcomings and reclaim their spiritual and intellectual heritage. Aaina-e-Haram focuses on moral reform, personal accountability, and the importance of unity among Muslims. This work is another of Iqbal’s powerful reminders that self-improvement is key to overcoming the challenges faced by the Ummah.",
        "coverImage": "/images/ainaeharam.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=15vH9tchHp97AT1SQi-VVBcZ7oKlTaoCP"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15vH9tchHp97AT1SQi-VVBcZ7oKlTaoCP/preview"
        ],
          keywords: []
      }
    ]

const theologyMysticismBooks: Book[] = [
  {
        "id": "Sharah-Al-Maqasid",
        "title": "Sharah alMaqasid",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/sharahalmaqasid.jpeg",
        "volumes": 5,
        "downloadLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
          "https://drive.google.com/file/d/1hAW_0sXH8UV6nRm8qeyJarb8yx89wq8v/view?usp=drive_link", //2
          "https://drive.google.com/file/d/1wjImGWZQnLCnsIyCM8d8z6PD0MR2OUPu/view?usp=drive_link", //3
          "https://drive.google.com/file/d/1ePXeDb2ntjmFROTmqDE9nsTvMQXNTTFx/view?usp=drive_link", //4
          "https://drive.google.com/file/d/12-BZYmLElmoEXyi1HbGhqncXBccLsybJ/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
          "https://drive.google.com/file/d/1hAW_0sXH8UV6nRm8qeyJarb8yx89wq8v/view?usp=drive_link", //2
          "https://drive.google.com/file/d/1wjImGWZQnLCnsIyCM8d8z6PD0MR2OUPu/view?usp=drive_link", //3
          "https://drive.google.com/file/d/1ePXeDb2ntjmFROTmqDE9nsTvMQXNTTFx/view?usp=drive_link", //4
          "https://drive.google.com/file/d/12-BZYmLElmoEXyi1HbGhqncXBccLsybJ/view?usp=drive_link"
        ],
        keywords:[]
      },
      {
        "id": "Kitab-al-Irshad",
        "title": "Kitāb al-Irshād ilā Qawāṭiʿ al-Adillah fī Uṣūl al-Iʿtiqād",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/kitabalirshad.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1ata_idEYfdAuAz_znIxBLcRRap-3IYe_/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ata_idEYfdAuAz_znIxBLcRRap-3IYe_/view?usp=drive_link"

        ],
        keywords:[]
      },
      {
        "id": "Creed-of-tahawiyyah",
        "title": "al-ʻAqīdah al-Ṭaḥāwīyah",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/aqidaetahawiya.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1IXu9JBl8sGQo5xcTkxKXNScwquI0p0Sl/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1IXu9JBl8sGQo5xcTkxKXNScwquI0p0Sl/view?usp=drive_link"

        ],
        keywords:[]
      },
    ]


export async function getBookById(category: string, bookId: string): Promise<Book | null> {
  let books: Book[] = []

  switch (category) {
    case "iqbal":
      books = iqbalBooks
      break
    case "theologynmysticism":
      books = theologyMysticismBooks
      break
      case "islamic-jurisprudence":
        books = islamicJurisprudenceBooks.flatMap((cat) => cat.books)
        break
      case "philosophy":
      books = philosophyBooks
      break
      case "islamic-history":
      books = historyBooks
      break
    default:
      books = []
  }

  return books.find((book) => book.id === bookId) || null
}

export const historyCategory = (): BookCategory => ({
  id: "islamic-history",
  title: "Islamic History",
  books: historyBooks,
})
export const philosophyCategory = (): BookCategory => ({
  id: "philosophy",
  title: "Islamic Philosophy",
  books: philosophyBooks,
})
export const islamicJurisprudenceCategory = (): BookCategory => ({
  id: "islamic-jurisprudence",
  title: "Islamic Jurisprudence",
  books: islamicJurisprudenceBooks.flatMap((cat) => cat.books),
})

export const TheologyMysticismCategory = (): BookCategory => ({
  id: "theologynmysticism",
  title: "Theology & Mysticism",
  books: theologyMysticismBooks,
})

export const iqbal = (): BookCategory => ({
  id: "iqbalCategory",
  title: "Allama Iqbal Books",
  books: iqbalBooks,
})

// ✅ Exporting mainpage books for sitemap
export const mainpageBooks = (): Book[] => [quranBook, ...bookCategories.flatMap((category) => category.books)];