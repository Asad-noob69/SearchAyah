"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Head from "next/head"

interface SahabaName {
  name: string
  url: string
}

const englishSahabaNames = [
  { name: "Abu Bakr `Abdullah ibn Abi Quhafa", url: "https://en.wikipedia.org/wiki/Abu_Bakr" },
  { name: "Ali ibn Abi Talib", url: "https://en.wikipedia.org/wiki/Ali_ibn_Abi_Talib" },
  { name: "Aqeel ibn Abi Talib", url: "https://en.wikipedia.org/wiki/Aqeel_ibn_Abi_Talib" },
  { name: "Abdullah ibn Ja'far", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Ja%27far" },
  { name: "Abdur-Rahman ibn Abu Bakr", url: "https://en.wikipedia.org/wiki/Abdul-Rahman_ibn_Abi_Bakr" },
  { name: "Abdur-Rahman ibn Sakran", url: "https://en.wikipedia.org/wiki/Sawdah_bint_Zam%27ah" },
  { name: "Abd al-Rahman ibn Awf", url: "https://en.wikipedia.org/wiki/Abd_al-Rahman_ibn_Awf" },
  { name: "Abdullah ibn Abbas", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Abbas" },
  { name: "Abd-Allah ibn Abd-Allah ibn Ubayy", url: "https://en.wikipedia.org/wiki/Abd-Allah_ibn_Abd-Allah_ibn_Ubayy" },
  { name: "'Abd Allah ibn 'Amr ibn al-'As", url: "https://en.wikipedia.org/wiki/%27Abd_Allah_ibn_%27Amr_ibn_al-%27As" },
  { name: "Abdallah ibn Amir", url: "https://en.wikipedia.org/wiki/Abdallah_ibn_Amir" },
  { name: "Abdullah ibn al-Zubayr", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_al-Zubayr" },
  { name: "Abdullah ibn Hudhafah as-Sahmi", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Hudhafah_as-Sahmi" },
  { name: "Abdullah ibn Jahsh", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Jahsh" },
  { name: "Abdullah ibn Masud", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Masud" },
  { name: "Abdullah ibn Suhayl", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Suhayl" },
  { name: "Abd Allah ibn Hanzala", url: "https://en.wikipedia.org/wiki/Abd_Allah_ibn_Hanzala" },
  { name: "Abd Allah ibn Mas'ada al-Fazari", url: "https://en.wikipedia.org/wiki/Abd_Allah_ibn_Mas%27ada_al-Fazari" },
  { name: "'Abd Allah ibn Rawahah", url: "https://en.wikipedia.org/wiki/%27Abd_Allah_ibn_Rawahah" },
  { name: "Abdullah ibn Salam", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Salam" },
  { name: "Abdullah ibn Unais", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Unais" },
  { name: "Abdullah ibn Amr ibn Haram", url: "https://en.wikipedia.org/w/index.php?title=Abdullah_ibn_Amr_ibn_Haram&amp;action=edit&amp;redlink=1" },
  { name: "Abdullah ibn Zayd", url: "https://en.wikipedia.org/w/index.php?title=Abdullah_ibn_Zayd&amp;action=edit&amp;redlink=1" },
  { name: "Abdullah ibn Umar", url: "https://en.wikipedia.org/wiki/Abd_Allah_ibn_Umar_ibn_al-Khattab" },
  { name: "Abd-Allah ibn Umm-Maktum", url: "https://en.wikipedia.org/wiki/Ibn_Umm_Maktum" },
  { name: "Abdullah ibn Atik", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Atik" },
  { name: "Abbad ibn Bishr", url: "https://en.wikipedia.org/wiki/Abbad_ibn_Bishr" },
  { name: "Abu Basir", url: "https://en.wikipedia.org/wiki/Abu_Basir" },
  { name: "Abu Rafi' al-Qibti", url: "https://en.wikipedia.org/wiki/Abu_Rafi%27_al-Qibti" },
  { name: "Abu Bakra al-Thaqafi", url: "https://en.wikipedia.org/wiki/Abu_Bakra_al-Thaqafi" },
  { name: "Abu Darda", url: "https://en.wikipedia.org/wiki/Abu_Darda" },
  { name: "Abū l-Ṭufayl ʿĀmir b. Wāthila al-Kinānī", url: "https://en.wikipedia.org/wiki/Ab%C5%AB_l-%E1%B9%ACufayl_%CA%BF%C4%80mir_b._W%C4%81thila_al-Kin%C4%81n%C4%AB" },
  { name: "Abid ibn Hamal", url: "https://en.wikipedia.org/w/index.php?title=Abid_ibn_Hamal&amp;action=edit&amp;redlink=1" },
  { name: "Abid ibn Hunay", url: "https://en.wikipedia.org/w/index.php?title=Abid_ibn_Hunay&amp;action=edit&amp;redlink=1" },
  { name: "Abjr al-Muzni", url: "https://en.wikipedia.org/w/index.php?title=Abjr_al-Muzni&amp;action=edit&amp;redlink=1" },
  { name: "Abu al-Aas ibn al-Rabiah", url: "https://en.wikipedia.org/wiki/Abu_al-As_ibn_al-Rabi%27" },
  { name: "Abu Ayyub al-Ansari", url: "https://en.wikipedia.org/wiki/Abu_Ayyub_al-Ansari" },
  { name: "‘Abbas ibn ‘Abd al-Muttalib", url: "https://en.wikipedia.org/wiki/%E2%80%98Abbas_ibn_%E2%80%98Abd_al-Muttalib" },
  { name: "Abu Dardaa", url: "https://en.wikipedia.org/wiki/Abu_Dardaa" },
  { name: "Abû Dhar al-Ghifârî", url: "https://en.wikipedia.org/wiki/Abu-Dahr" },
  { name: "Abu Dujana", url: "https://en.wikipedia.org/wiki/Abu_Dujana_(Sahabah)" },
  { name: "Abu Fuhayra", url: "https://en.wikipedia.org/wiki/Abu_Fuhayra" },
  { name: "Abu Hudhaifah ibn Mughirah", url: "https://en.wikipedia.org/wiki/Abu_Hudhaifah_ibn_al-Mughirah" },
  { name: "Abu-Hudhayfah ibn Utbah", url: "https://en.wikipedia.org/wiki/Abu-Hudhayfah_ibn_Utbah" },
  { name: "Abu Hurairah", url: "https://en.wikipedia.org/wiki/Abu_Hurairah" },
  { name: "Abu Jandal ibn Suhail", url: "https://en.wikipedia.org/wiki/Abu_Jandal_ibn_Suhayl" },
  { name: "Abu Lubaba ibn Abd al-Mundhir", url: "https://en.wikipedia.org/wiki/Abu_Lubaba_ibn_Abd_al-Mundhir" },
  { name: "Abu Musa al-Ashari", url: "https://en.wikipedia.org/wiki/Abu_Musa_al-Ashari" },
  { name: "Abu Qatada al-Ansari", url: "https://en.wikipedia.org/wiki/Abu_Qatada_al-Ansari" },
  { name: "Abu Quhafa", url: "https://en.wikipedia.org/wiki/Abu_Quhafa" },
  { name: "Abu Sa`id al-Khudri", url: "https://en.wikipedia.org/wiki/Abu_Sa%60id_al-Khudri" },
  { name: "Abu Salama `Abd Allah ibn `Abd al-Asad", url: "https://en.wikipedia.org/wiki/Abu_Salama_%60Abd_Allah_ibn_%60Abd_al-Asad" },
  { name: "Abu Sufyan ibn al-Harith", url: "https://en.wikipedia.org/wiki/Abu_Sufyan_ibn_al-Harith" },
  { name: "Abu Sufyan ibn Harb", url: "https://en.wikipedia.org/wiki/Abu_Sufyan_ibn_Harb" },
  { name: "Abu Ubaidah ibn al-Jarrah", url: "https://en.wikipedia.org/wiki/Abu_Ubaidah_ibn_al-Jarrah" },
  { name: "Abu Talhah al Ansari", url: "https://en.wikipedia.org/wiki/Abu_Talha_al-Ansari" },
  { name: "Abu Zama' al-Balaui", url: "https://en.wikipedia.org/w/index.php?title=Abu_Zama%27_al-Balaui&amp;action=edit&amp;redlink=1" },
  { name: "Abzâ al-Khuzâ`î", url: "https://en.wikipedia.org/w/index.php?title=Abz%C3%A2_al-Khuz%C3%A0%60%C3%AE&amp;action=edit&amp;redlink=1" },
  { name: "Adhayna ibn al-Hârith", url: "https://en.wikipedia.org/w/index.php?title=Adhayna_ibn_al-H%C3%A2rith&amp;action=edit&amp;redlink=1" },
  { name: "Adî ibn Hâtim at-Tâî", url: "https://en.wikipedia.org/wiki/Adiyy_ibn_Hatim" },
  { name: "Aflah ibn Abî Qays", url: "https://en.wikipedia.org/w/index.php?title=Aflah_ibn_Ab%C3%AE_Qays&amp;action=edit&amp;redlink=1" },
  { name: "Ahmad ibn Hafs", url: "https://en.wikipedia.org/w/index.php?title=Ahmad_ibn_Hafs&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar Abu `Usayb", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_Abu_%60Usayb&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Jazi", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Jazi&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Mazan ibn Aws", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Mazan_ibn_Aws&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Mu`awiya ibn Salim", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Mu%60awiya_ibn_Salim&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Qatan al-Hamdani", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Qatan_al-Hamdani&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Salim", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Salim&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar ibn Suwa'i ibn `Adi", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_ibn_Suwa%27i_ibn_%60Adi&amp;action=edit&amp;redlink=1" },
  { name: "Ahmar Mawla Umm Salama", url: "https://en.wikipedia.org/w/index.php?title=Ahmar_Mawla_Umm_Salama&amp;action=edit&amp;redlink=1" },
  { name: "Ahyah ibn Umayya ibn Khalaf", url: "https://en.wikipedia.org/w/index.php?title=Ahyah_ibn_Umayya_ibn_Khalaf&amp;action=edit&amp;redlink=1" },
  { name: "Ahzâb bin Usaid", url: "https://en.wikipedia.org/w/index.php?title=Ahz%C3%A2b_bin_Usaid&amp;action=edit&amp;redlink=1" },
  { name: "`Âisha bint Abî Bakr", url: "https://en.wikipedia.org/wiki/Aisha" },
  { name: "Al-'Ala' Al-Hadrami", url: "https://en.wikipedia.org/wiki/Al-Ala%27a_Al-Hadrami" },
  { name: "Al-Bara' ibn Mâlik al-Ansârî", url: "https://en.wikipedia.org/wiki/Al-Baraa_ibn_Malik_al-Ansari" },
  { name: "Al-Bara' ibn Azib", url: "https://en.wikipedia.org/wiki/Al-Bara%27_ibn_Azib" },
  { name: "Al-Hakam ibn Abi al-As", url: "https://en.wikipedia.org/wiki/Al-Hakam_ibn_Abi_al-As" },
  { name: "Al-Mughira", url: "https://en.wikipedia.org/wiki/Al-Mughira" },
  { name: "Abdullah ibn Abi Bakr", url: "https://en.wikipedia.org/wiki/Abdullah_ibn_Abi_Bakr" },
  { name: "Al-Qa'qa'a ibn Amr at-Tamimi", url: "https://en.wikipedia.org/wiki/Al-Qa%27qa%27a_ibn_Amr_at-Tamimi" },
  { name: "Ammar bin Yasir", url: "https://en.wikipedia.org/wiki/Ammar_bin_Yasir" },
  { name: "Amr bin Al`âs", url: "https://en.wikipedia.org/wiki/Amr_bin_Al%27aas" },
  { name: "Amr ibn al-Jamuh", url: "https://en.wikipedia.org/wiki/Amr_ibn_al-Jamuh" },
  { name: "Amru bin Ma'adi Yakrib", url: "https://en.wikipedia.org/wiki/Amru_bin_Ma%27adi_Yakrib" },
  { name: "Anas ibn Nadhar", url: "https://en.wikipedia.org/wiki/Anas_ibn_Nadhar" },
  { name: "Anas ibn Mâlik", url: "https://en.wikipedia.org/wiki/Anas_ibn_Malik" },
  { name: "An-Nu`aymân ibn `Amr", url: "https://en.wikipedia.org/wiki/An-Nuayman_ibn_Amr" },
  { name: "An-Nu`mân ibn Muqarrin", url: "https://en.wikipedia.org/wiki/An-Numan_ibn_Muqarrin" },
  { name: "Arbad ibn Humayrah", url: "https://en.wikipedia.org/wiki/Arbad_ibn_Humayrah" },
  { name: "As'ad ibn Zurarah", url: "https://en.wikipedia.org/wiki/As%27ad_ibn_Zurarah" },
  { name: "Al-Arqam ibn-abil-Arqam", url: "https://en.wikipedia.org/wiki/Al-Arqam_ibn-abil-Arqam" },
  { name: "Asmâ' bint Abî Bakr", url: "https://en.wikipedia.org/wiki/Asma_bint_Abu_Bakr" },
  { name: "Asmâ' bint Umays", url: "https://en.wikipedia.org/wiki/Asma_bint_Umays" },
  { name: "Asim ibn Thabit", url: "https://en.wikipedia.org/wiki/Asim_ibn_thabit" },
  { name: "Asim ibn Amr al-Tamimi", url: "https://en.wikipedia.org/wiki/Asim_ibn_Amr_al-Tamimi" },
  { name: "Atika bint Abdul Muttalib", url: "https://en.wikipedia.org/wiki/Atika_bint_Abdul_Muttalib" },
  { name: "Atiqa bint Zayd", url: "https://en.wikipedia.org/wiki/Atiqa_bint_Zayd" },
  { name: "Attab ibn Asid", url: "https://en.wikipedia.org/wiki/Attab_ibn_Asid" },
  { name: "At-Tufayl ibn Amr ad-Dawsi", url: "https://en.wikipedia.org/wiki/At-Tufayl_ibn_Amr_ad-Dawsi" },
  { name: "Ayman ibn Ubayd", url: "https://en.wikipedia.org/wiki/Ayman_ibn_Ubayd" },
  { name: "Ayyash ibn Abi Rabiah", url: "https://en.wikipedia.org/wiki/Ayyash_ibn_Abi_Rabiah" },
  { name: "Abu Mihjan as Tsaqafi", url: "https://en.wikipedia.org/wiki/Ab%C5%AB_Mi%E1%B8%A5jan_al-Tha%E1%B8%B3af%C4%AB" },
  { name: "Amir bin al-Akwa'", url: "https://en.wikipedia.org/w/index.php?title=Amir_bin_al_akwa&action=edit&redlink=1" },
  { name: "Bashir ibn Sa'ad", url: "https://en.wikipedia.org/wiki/Bashir_ibn_Sa%27ad" },
  { name: "Bilal ibn Malik al-Mazni", url: "https://en.wikipedia.org/w/index.php?title=Bilal_ibn_Malik_al-Mazni&action=edit&redlink=1" },
  { name: "Bilal ibn Rabah al-Habashi", url: "https://en.wikipedia.org/wiki/Bilal_ibn_Rabah_al-Habashi" },
  { name: "Bilal ibn al-Harith", url: "https://en.wikipedia.org/wiki/Bilal_ibn_al-Harith" },
  { name: "Bilal ibn Yahya", url: "https://en.wikipedia.org/w/index.php?title=Bilal_ibn_Yahya&action=edit&redlink=1" },
  { name: "Busr ibn Abi Artat", url: "https://en.wikipedia.org/wiki/Busr_ibn_Abi_Artat" },
  { name: "Dihyah ibn Khalifa al-Kalbi", url: "https://en.wikipedia.org/w/index.php?title=Dihyah_ibn_Khalifa_al-Kalbi&action=edit&redlink=1" },
  { name: "Dhiraar bin Al-Azwar", url: "https://en.wikipedia.org/wiki/Dhiraar_bin_Al-Azwar" },
  { name: "Dhiraar ibn al-Khattab", url: "https://en.wikipedia.org/wiki/Dhiraar_ibn_al-Khattab" },
  { name: "Dhimad Al-Azdi", url: "https://en.wikipedia.org/w/index.php?title=Dhimad_Al-Azdi&action=edit&redlink=1" },
  { name: "Fadl ibn Abbas", url: "https://en.wikipedia.org/wiki/Fadl_ibn_Abbas" },
  { name: "Fatima az-Zahra bint Muhammad", url: "https://en.wikipedia.org/wiki/Fatima_Zahra" },
  { name: "Fatima bint Al-Aswad", url: "https://en.wikipedia.org/wiki/Fatima_bint_Al-Aswad" },
  { name: "Fatima bint Asad", url: "https://en.wikipedia.org/wiki/Fatima_bint_Asad" },
  { name: "Fayruz ad-Daylami", url: "https://en.wikipedia.org/wiki/Fayruz_ad-Daylami" },
  { name: "Fatimah bint al-Khattab", url: "https://en.wikipedia.org/wiki/Fatimah_bint_al-Khattab" },
  { name: "Hasan ibn Ali", url: "https://en.wikipedia.org/wiki/Hasan_ibn_Ali" },
  { name: "Husayn ibn Ali", url: "https://en.wikipedia.org/wiki/Husayn_ibn_Ali" },
  { name: "Ḥamza ibn ʿAbd al-Muṭṭalib", url: "https://en.wikipedia.org/wiki/%E1%B8%A4amza_ibn_%CA%BFAbd_al-Mu%E1%B9%AD%E1%B9%ADalib" },
  { name: "Hanzala Ibn Abi Amir", url: "https://en.wikipedia.org/wiki/Hanzala_Ibn_Abi_Amir" },
  { name: "Ibrahim ibn Muhammad", url: "https://en.wikipedia.org/wiki/Ibrahim_ibn_Muhammad" },
  { name: "Ikrima ibn Abi Jahl", url: "https://en.wikipedia.org/wiki/Ikrimah_ibn_Abu_Jahl" },
  { name: "Imran ibn Husain", url: "https://en.wikipedia.org/wiki/Imran_ibn_Husain" },
  { name: "Iyad ibn Ghanm", url: "https://en.wikipedia.org/wiki/Iyad_ibn_Ghanm" },
  { name: "Jaban al-Kurdi", url: "https://en.wikipedia.org/wiki/Jaban_al-Kurdi" },
  { name: "Jabr", url: "https://en.wikipedia.org/wiki/Jabr_(slave)" },
  { name: "Jabir ibn Abdullah al-Ansari", url: "https://en.wikipedia.org/wiki/Jabir_ibn_Abd-Allah" },
  { name: "Jafar ibn Abi Talib", url: "https://en.wikipedia.org/wiki/Jafar_ibn_Abi_Talib" },
  { name: "Jamila bint Thabit", url: "https://en.wikipedia.org/wiki/Jamila_bint_Thabit" },
  { name: "Jubayr ibn Mut'im", url: "https://en.wikipedia.org/wiki/Jubayr_ibn_Mut%27im" },
  { name: "Julaybib", url: "https://en.wikipedia.org/wiki/Julaybib" },
  { name: "Jumanah bint Abi Talib", url: "https://en.wikipedia.org/wiki/Jumanah_bint_Abi_Talib" },
  { name: "Juwayriya bint al-Harith", url: "https://en.wikipedia.org/wiki/Juwayriya_bint_al-Harith" },
  { name: "Ka'ab ibn malik", url: "https://en.wikipedia.org/w/index.php?title=Ka%27ab_ibn_malik&action=edit&redlink=1" },
  { name: "Ka'b ibn Zuhayr", url: "https://en.wikipedia.org/wiki/Ka%27b_ibn_Zuhair" },
  { name: "Khadijah bint Khuwaylid", url: "https://en.wikipedia.org/wiki/Khadija_bint_Khuwaylid" },
  { name: "Khalid ibn Sa`id", url: "https://en.wikipedia.org/wiki/Khalid_ibn_Sa%60id" },
  { name: "Kharija bin Huzafa", url: "https://en.wikipedia.org/wiki/Kharija_bin_Huzafa" },
  { name: "Khawlah bint Hakim", url: "https://en.wikipedia.org/wiki/Khawlah_bint_Hakim" },
  { name: "Khawlah bint al-Azwar", url: "https://en.wikipedia.org/wiki/Khawlah_bint_al-Azwar" },
  { name: "Khawlah bint Tha'labah", url: "https://en.wikipedia.org/wiki/Khawla_bint_Tha%27labah" },
  { name: "Khubayb ibn Adiy", url: "https://en.wikipedia.org/wiki/Khubayb_ibn_Adiy" },
  { name: "Khunais ibn Hudhafa", url: "https://en.wikipedia.org/wiki/Khunais_ibn_Hudhafa" },
  { name: "Khuzayma ibn Thabit", url: "https://en.wikipedia.org/wiki/Khuzaima_ibn_Thabit" },
  { name: "Khabbab ibn al-Aratt", url: "https://en.wikipedia.org/wiki/Khabbab_ibn_al-Aratt" },
  { name: "Al-Khansa", url: "https://en.wikipedia.org/wiki/Al-Khansa" },
  { name: "Khalid ibn al Walid", url: "https://en.wikipedia.org/wiki/Khalid_ibn_al-Walid" },
  { name: "Labid ibn Rabi'a", url: "https://en.wikipedia.org/wiki/Lab%C4%ABd" },
  { name: "Layla bint al-Minhal", url: "https://en.wikipedia.org/wiki/Layla_bint_al-Minhal" },
  { name: "Lubaba bint al-Harith", url: "https://en.wikipedia.org/wiki/Lubaba_bint_al-Harith" },
  { name: "Lubaynah", url: "https://en.wikipedia.org/wiki/Lubaynah" },
  { name: "Malik al-Dar", url: "https://en.wikipedia.org/wiki/Malik_al-Dar" },
  { name: "Malik bin Huwairith", url: "https://en.wikipedia.org/w/index.php?title=Malik_bin_Huwairith&action=edit&redlink=1" },
  { name: "Maria al-Qibtiyya", url: "https://en.wikipedia.org/wiki/Maria_al-Qibtiyya" },
  { name: "Maymuna bint al-Harith", url: "https://en.wikipedia.org/wiki/Maymuna_bint_al-Harith" },
  { name: "Malik ibn an-Nadr", url: "https://en.wikipedia.org/wiki/Umm_Sulaym_bint_Milhan" },
  { name: "Miqdad ibn al-Aswad", url: "https://en.wikipedia.org/wiki/Miqdad_bin_Al-Aswad" },
  { name: "Mu`adh ibn `Amr", url: "https://en.wikipedia.org/wiki/Muaaz_ibn_Amr" },
  { name: "Mu`adh ibn Jabal", url: "https://en.wikipedia.org/wiki/Muadh_ibn_Jabal" },
  { name: "Mu'awiya ibn Abi Sufyan", url: "https://en.wikipedia.org/wiki/Mu%27awiya_I" },
  { name: "Mu`awwaz ibn `Amr", url: "https://en.wikipedia.org/wiki/Muawwaz_ibn_Amr" },
  { name: "Muhammad ibn Ja'far", url: "https://en.wikipedia.org/wiki/Muhammad_ibn_Ja%27far" },
  { name: "Muhammad ibn Maslamah", url: "https://en.wikipedia.org/wiki/Muhammad_ibn_Maslamah" },
  { name: "Munabbih ibn Kamil", url: "https://en.wikipedia.org/wiki/Munabbih_ibn_Kamil" },
  { name: "Mus`ab ibn `Umair", url: "https://en.wikipedia.org/wiki/Mus%60ab_ibn_%60Umair" },
  { name: "Maslama ibn Mukhallad al-Ansari", url: "https://en.wikipedia.org/wiki/Maslama_ibn_Mukhallad_al-Ansari" },
  { name: "Muhammad ibn Abi Bakr", url: "https://en.wikipedia.org/wiki/Muhammad_ibn_Abi_Bakr" },
  { name: "Muhsin ibn Ali", url: "https://en.wikipedia.org/wiki/Muhsin_ibn_Ali" },
  { name: "Na'ila bint al-Farafisa", url: "https://en.wikipedia.org/wiki/Naila_(Calipha)" },
  { name: "Nasr ibn Hajjaaj", url: "https://en.wikipedia.org/wiki/Nasr_ibn_Hajjaaj" },
  { name: "Nadia", url: "https://en.wikipedia.org/wiki/Al-Nahdiah" },
  { name: "Nauman Nābigha al-Jaʽdī", url: "https://en.wikipedia.org/wiki/N%C4%81bigha_al-Ja%CA%BDd%C4%AB" },
  { name: "Najiyah bint al-Walid", url: "https://en.wikipedia.org/wiki/Najiyah_bint_al-Walid" },
  { name: "Nuaym ibn Masud", url: "https://en.wikipedia.org/wiki/Nuaym_ibn_Masud" },
  { name: "Nu'man ibn Bashir al-Ansari", url: "https://en.wikipedia.org/wiki/Nu%27man_ibn_Bashir_al-Ansari" },
  { name: "Nafi ibn al-Harith", url: "https://en.wikipedia.org/wiki/Nafi_ibn_al-Harith" },
  { name: "Nufay ibn al-Harith", url: "https://en.wikipedia.org/wiki/Nufay_ibn_al-Harith" },
  { name: "Nusaybah bint Ka'ab", url: "https://en.wikipedia.org/wiki/Nusaybah_bint_Ka%27ab" },
  { name: "An-Nawwas ibn Sam'an", url: "https://en.wikipedia.org/w/index.php?title=An-Nawwas_ibn_Sam%27an&action=edit&redlink=1" },
  { name: "Nu'aiman ibn Amr", url: "https://en.wikipedia.org/w/index.php?title=Nu%27aiman_ibn_Amr&action=edit&redlink=1" },
  { name: "Al-Qa'qa' ibn Amr al-Tamimi", url: "https://en.wikipedia.org/wiki/Al-Qa%27qa%27_ibn_Amr_al-Tamimi" },
  { name: "Qatada ibn al-Nu'man", url: "https://en.wikipedia.org/wiki/Qatada_ibn_al-Nu%27man" },
  { name: "Qutaylah bint Abd al-Uzza", url: "https://en.wikipedia.org/wiki/Qutaylah_bint_Abd_al-Uzza" },
  { name: "Qutayla ukht al-Nadr", url: "https://en.wikipedia.org/wiki/Qutayla_ukht_al-Nadr" },
  { name: "Rab'ah ibn Umayah", url: "https://en.wikipedia.org/wiki/Rab%27ah_ibn_Umayah" },
  { name: "Rabiah ibn Kab", url: "https://en.wikipedia.org/wiki/Rabiah_ibn_Kab" },
  { name: "Rabi'ah ibn al-Harith", url: "https://en.wikipedia.org/wiki/Rabi%27ah_ibn_al-Harith" },
  { name: "Ramlah bint Abu Sufyan", url: "https://en.wikipedia.org/wiki/Ramlah_bint_Abu_Sufyan" },
  { name: "Rayhana bint Zayd", url: "https://en.wikipedia.org/wiki/Rayhana_bint_Zayd" },
  { name: "Rebi'i bin Aamer Al-Tamimi", url: "https://en.wikipedia.org/wiki/Rebi%27i_bin_Aamer_Al-Tamimi" },
  { name: "Rufaida Al-Aslamia", url: "https://en.wikipedia.org/wiki/Rufaida_Al-Aslamia" },
  { name: "Ruqayyah bint Muhammad", url: "https://en.wikipedia.org/wiki/Ruqayyah_bint_Muhammad" },
  { name: "Rumaysa bint Milhan", url: "https://en.wikipedia.org/wiki/Rumaysa_bint_Milhan" },
  { name: "Sa'sa'a ibn Suhan", url: "https://en.wikipedia.org/wiki/Sa%27sa%27a_bin_Sohan" },
  { name: "Sa'd ibn Abî Waqâs", url: "https://en.wikipedia.org/wiki/Sad_Ibn_Abi_Waqqas" },
  { name: "Sa'd ibn ar-Rabi'", url: "https://en.wikipedia.org/wiki/Sa%60ad_ibn_ar-Rabi%60" },
  { name: "Sa'd ibn Malik", url: "https://en.wikipedia.org/wiki/Sa%27d_ibn_Malik" },
  { name: "Sa'd ibn Mua'dh", url: "https://en.wikipedia.org/wiki/Sa%27d_ibn_Mua%27dh" },
  { name: "Sa'd ibn Ubadah", url: "https://en.wikipedia.org/wiki/Sa%27d_ibn_Ubadah" },
  { name: "Sabra ibn Ma'bad", url: "https://en.wikipedia.org/wiki/Sabrah_ibn_Ma%27bad" },
  { name: "Sa'îd ibn Âmir al-Jumahi", url: "https://en.wikipedia.org/wiki/Said_ibn_Aamir_al-Jumahi" },
  { name: "Sa'îd ibn Zayd", url: "https://en.wikipedia.org/wiki/Sa%27id_bin_Zayd" },
  { name: "Safiyyah bint 'Abd al-Muttalib", url: "https://en.wikipedia.org/wiki/Safiyyah_bint_%E2%80%98Abd_al-Muttalib" },
  { name: "Safiyyah bint Huyayy", url: "https://en.wikipedia.org/wiki/Safiyyah_bint_Huyayy" },
  { name: "Safwan ibn al-Mu'attal", url: "https://en.wikipedia.org/wiki/Safwan_ibn_Muattal" },
  { name: "Safwan ibn Umayya", url: "https://en.wikipedia.org/wiki/Safwan_ibn_Umayya" },
  { name: "Salama Abu Hashim", url: "https://en.wikipedia.org/wiki/Salama_Abu_Hashim" },
  { name: "Salama ibn al-Aqwa", url: "https://en.wikipedia.org/wiki/Salamah_ibn_al-Akwa" },
  { name: "Salim Mawla Abi Hudhayfah", url: "https://en.wikipedia.org/wiki/Salim_Mawla_Abi_Hudhayfah" },
  { name: "Salma bint Umays", url: "https://en.wikipedia.org/wiki/Salma_bint_Umays" },
  { name: "Salma bint Sakhri ibn 'Amir", url: "https://en.wikipedia.org/wiki/Salma_Umm-ul-Khair" },
  { name: "Salman al-Fârisî", url: "https://en.wikipedia.org/wiki/Salman_the_Persian" },
  { name: "Sahl ibn Sa'd", url: "https://en.wikipedia.org/wiki/Sahl_ibn_Sa%27d" },
  { name: "Sahl ibn Hunaif", url: "https://en.wikipedia.org/wiki/Sahl_ibn_Hunaif" },
  { name: "Sahla bint Suhayl", url: "https://en.wikipedia.org/wiki/Sahla_bint_Suhail" },
  { name: "Salit bin 'Amr 'Ala bin Hadrami", url: "https://en.wikipedia.org/wiki/Salit_bin_%27Amr_%27Ala_bin_Hadrami" },
  { name: "Samra ibn Jundab", url: "https://en.wikipedia.org/wiki/Samra_ibn_Jundab" },
  { name: "Sawdah bint Zam'a", url: "https://en.wikipedia.org/wiki/Sawda_bint_Zama" },
  { name: "As-Sakran ibn Amr", url: "https://en.wikipedia.org/wiki/Sawdah_bint_Zam%27ah" },
  { name: "Shams ibn Uthman", url: "https://en.wikipedia.org/wiki/Shams_ibn_Uthman" },
  { name: "Shadad ibn Aus", url: "https://en.wikipedia.org/wiki/Shadad_ibn_Aus" },
  { name: "Shurahbil ibn Hasana", url: "https://en.wikipedia.org/wiki/Shurahbil_ibn_Hasana" },
  { name: "Al-Shifa bint Abdullah", url: "https://en.wikipedia.org/wiki/Al-Shifa_bint_Abdullah" },
  { name: "Sirin bint Sham'un", url: "https://en.wikipedia.org/wiki/Sirin_(Islamic_history)" },
  { name: "Suhayb ar-Rumi", url: "https://en.wikipedia.org/wiki/Suhayb_ar-Rumi" },
  { name: "Suhayl ibn Amr", url: "https://en.wikipedia.org/wiki/Suhayl_ibn_Amr" },
  { name: "Sumayyah bint Khayyat", url: "https://en.wikipedia.org/wiki/Sumayyah_bint_Khayyat" },
  { name: "Sufyan ibn Awf", url: "https://en.wikipedia.org/wiki/Sufyan_ibn_Awf" },
  { name: "Suraqa bin Malik", url: "https://en.wikipedia.org/wiki/Suraqa_bin_Malik" },
  { name: "Shuja' ibn Wahab al-Asad", url: "https://en.wikipedia.org/wiki/Shuja_ibn_Wahb" },
  { name: "Sinan Bin Salamah bin Mohbik", url: "https://en.wikipedia.org/wiki/Sinan_Bin_Salamah_bin_Mohbik" },
  { name: "Talhah ibn Ubaydullah", url: "https://en.wikipedia.org/wiki/Talhah_ibn_Ubaydullah" },
  { name: "Tamim Abu Ruqayya", url: "https://en.wikipedia.org/wiki/Tamim_Abu_Ruqayya" },
  { name: "Tamim al-Ansari", url: "https://en.wikipedia.org/wiki/Tamim_al-Ansari" },
  { name: "Tamim al-Dari", url: "https://en.wikipedia.org/wiki/Tamim_al-Dari" },
  { name: "Thabit ibn Qays", url: "https://en.wikipedia.org/wiki/Thabit_ibn_Qays" },
  { name: "Thumamah ibn Uthal", url: "https://en.wikipedia.org/wiki/Thumamah_ibn_Uthal" },
  { name: "Thuwaybah", url: "https://en.wikipedia.org/wiki/Thuwaybah" },
  { name: "Tufail Ibn Amr Ad-Dawsi", url: "https://en.wikipedia.org/wiki/Tufayl_ibn_Amr" },
  { name: "Umar Ibn al-Khattab", url: "https://en.wikipedia.org/wiki/Umar" },
  { name: "Uthman Ibn Affan", url: "https://en.wikipedia.org/wiki/Uthman" },
  { name: "Ubadah ibn al-Samit", url: "https://en.wikipedia.org/wiki/Ubadah_ibn_al-Samit" },
  { name: "Ubaydah ibn al-Harith", url: "https://en.wikipedia.org/wiki/Ubaydah_ibn_al-Harith" },
  { name: "Ubayda ibn as-Samit", url: "https://en.wikipedia.org/wiki/Ubayda_ibn_as-Samit" },
  { name: "Ubayy ibn Ka'b ibn Qays", url: "https://en.wikipedia.org/wiki/Ubay_ibn_Ka%27b" },
  { name: "Al-Akhnas ibn Shurayq", url: "https://en.wikipedia.org/wiki/Al-Akhnas_ibn_Shurayq" },
  { name: "Umar ibn Harith", url: "https://en.wikipedia.org/wiki/Umar_ibn_Harith" },
  { name: "Umayr ibn Sa'd al-Ansari", url: "https://en.wikipedia.org/wiki/Umayr_ibn_Sa%27d_al-Ansari" },
  { name: "Umayr ibn Wahb", url: "https://en.wikipedia.org/wiki/Umayr_ibn_Wahb" },
  { name: "Umamah bint Zaynab", url: "https://en.wikipedia.org/wiki/Umamah_bint_Zainab" },
  { name: "Umm Ayman (Baraka bint Tha'laba)", url: "https://en.wikipedia.org/wiki/Umm_Ayman_(Barakah)" },
  { name: "Umm Hakim", url: "https://en.wikipedia.org/wiki/Umm_Hakim" },
  { name: "Umm Hani", url: "https://en.wikipedia.org/wiki/Fakhitah_bint_Abi_Talib" },
  { name: "Umm Haram", url: "https://en.wikipedia.org/wiki/Umm_Haram" },
  { name: "Umm Kulthum bint Abi Bakr", url: "https://en.wikipedia.org/wiki/Umm_Kulthum_bint_Abi_Bakr" },
  { name: "Umm Kulthum bint Asim", url: "https://en.wikipedia.org/wiki/Umm_Kulthum_bint_Asim" },
  { name: "Umm Kulthum bint Muhammad", url: "https://en.wikipedia.org/wiki/Umm_Kulthum_bint_Muhammad" },
  { name: "Umm Kulthum bint Uqba", url: "https://en.wikipedia.org/wiki/Umm_Kulthum_bint_Uqba" },
  { name: "Umm Ma'bad", url: "https://en.wikipedia.org/wiki/Umm_Ma%27bad" },
  { name: "Umm Ruman bint 'Amir", url: "https://en.wikipedia.org/wiki/Um_Ruman" },
  { name: "Umm Salamah", url: "https://en.wikipedia.org/wiki/Umm_Salama" },
  { name: "Umm Sharik", url: "https://en.wikipedia.org/wiki/Umm_Shareek" },
  { name: "Umm Ubays", url: "https://en.wikipedia.org/wiki/Umm_Ubays" },
  { name: "Umm ul-Banin", url: "https://en.wikipedia.org/wiki/Umm_ul-Banin" },
  { name: "Ukasha Bin al-Mihsan", url: "https://en.wikipedia.org/wiki/Expedition_of_Ukasha_bin_Al-Mihsan" },
  { name: "Uqbah ibn Amir", url: "https://en.wikipedia.org/wiki/Uqbah_ibn_Amir" },
  { name: "Urwah ibn Mas'ud", url: "https://en.wikipedia.org/wiki/Urwah_ibn_Mas%27ud" },
  { name: "Usama ibn Zayd", url: "https://en.wikipedia.org/wiki/Usama_ibn_Zayd" },
  { name: "Utbah ibn Ghazwan", url: "https://en.wikipedia.org/wiki/Utbah_ibn_Ghazwan" },
  { name: "Utban ibn Malik", url: "https://en.wikipedia.org/wiki/Utban_ibn_Malik" },
  { name: "Uthman ibn Abi al-As", url: "https://en.wikipedia.org/wiki/Uthman_ibn_Abi_al-As" },
  { name: "Uthman ibn Hunayf", url: "https://en.wikipedia.org/w/index.php?title=Uthman_ibnn_Hunaif&action=edit&redlink=1" },
  { name: "Uthman ibn Madh'un", url: "https://en.wikipedia.org/wiki/Uthman_bin_Maz%27oon" },
  { name: "Uthman ibn Talha", url: "https://en.wikipedia.org/wiki/Uthman_ibn_Talha" },
  { name: "Wahb ibn Sa'd", url: "https://en.wikipedia.org/wiki/Wahb_ibn_Sa%27d" },
  { name: "Wahb ibn Umayr", url: "https://en.wikipedia.org/wiki/Wahb_ibn_Umayr" },
  { name: "Wahshi ibn Harb", url: "https://en.wikipedia.org/wiki/Wahshi_ibn_Harb" },
  { name: "Wabisa ibn Ma'bad al-Asadi", url: "https://en.wikipedia.org/wiki/Wabisa_ibn_Ma%27bad_al-Asadi" },
  { name: "Walid ibn Uqba", url: "https://en.wikipedia.org/wiki/Walid_ibn_Uqba" },
  { name: "Walid ibn al Walid", url: "https://en.wikipedia.org/wiki/Walid_ibn_al_Walid" },
  { name: "Yasir ibn Amir", url: "https://en.wikipedia.org/wiki/Yasir_ibn_Amir" },
  { name: "Yazid Ibn Abi Sufyaan", url: "https://en.wikipedia.org/wiki/Yazid_ibn_Abi_Sufyan" },
  { name: "Zayd al-Khayr", url: "https://en.wikipedia.org/wiki/Zayd_al-Khayr" },
  { name: "Zayd ibn al-Khattab", url: "https://en.wikipedia.org/wiki/Zayd_ibn_al-Khattab" },
  { name: "Zayd ibn Arqam", url: "https://en.wikipedia.org/wiki/Zayd_ibn_Arqam" },
  { name: "Zayd ibn Harithah", url: "https://en.wikipedia.org/wiki/Zayd_ibn_Harithah" },
  { name: "Zayd ibn Thabit", url: "https://en.wikipedia.org/wiki/Zayd_ibn_Thabit" },
  { name: "Zaynab bint Ali", url: "https://en.wikipedia.org/wiki/Zaynab_bint_Ali" },
  { name: "Zaynab bint Jahsh", url: "https://en.wikipedia.org/wiki/Zaynab_bint_Jahsh" },
  { name: "Zaynab bint Khuzayma", url: "https://en.wikipedia.org/wiki/Zaynab_bint_Khuzayma" },
  { name: "Zaynab bint Muhammad", url: "https://en.wikipedia.org/wiki/Zaynab_bint_Muhammad" },
  { name: "Zish Shamalain", url: "https://en.wikipedia.org/wiki/Zish_Shamalain" },
  { name: "Zubair ibn al-Awam", url: "https://en.wikipedia.org/wiki/Zubair_ibn_al-Awam" },
  { name: "Zunairah al-Rumiya", url: "https://en.wikipedia.org/wiki/Zunairah_al-Rumiya" }
 ]

const urduSahabaNames = [
  {
    "name": "آمنہ بنت وہب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A2%D9%85%D9%86%DB%81_%D8%A8%D9%86%D8%AA_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "آنسہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A2%D9%86%D8%B3%DB%81"
  },
  {
    "name": "امامہ بنت زینب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85%D8%A7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%B2%DB%8C%D9%86%D8%A8"
  },
  {
    "name": "ابان بن سعید بن العاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D8%A7%D9%86_%D8%A8%D9%86_%D8%B3%D8%B9%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D9%84%D8%B9%D8%A7%D8%B5"
  },
  {
    "name": "ابراہیم بن محمد",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D8%B1%D8%A7%DB%81%DB%8C%D9%85_%D8%A8%D9%86_%D9%85%D8%AD%D9%85%D8%AF"
  },
  {
    "name": "ابن ام مکتوم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%86_%D8%A7%D9%85_%D9%85%DA%A9%D8%AA%D9%88%D9%85"
  },
  {
    "name": "ابوالعاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%A7%D9%84%D8%B9%D8%A7%D8%B5"
  },
  {
    "name": "ابو العاص بن ربیع",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D8%B9%D8%A7%D8%B5_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9"
  },
  {
    "name": "ابو الہیثم بن تیہان",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%DB%81%DB%8C%D8%AB%D9%85_%D8%A8%D9%86_%D8%AA%DB%8C%DB%81%D8%A7%D9%86"
  },
  {
    "name": "ابو امیہ مخزومی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%D9%85%DB%8C%DB%81_%D9%85%D8%AE%D8%B2%D9%88%D9%85%DB%8C"
  },
  {
    "name": "ابو العلاء حضرمی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%A1_%D8%AD%D8%B6%D8%B1%D9%85%DB%8C"
  },
  {
    "name": "ابو ایمن",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%DB%8C%D9%85%D9%86"
  },
  {
    "name": "ابوایوب انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%A7%DB%8C%D9%88%D8%A8_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابوبکر صدیق",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%A8%DA%A9%D8%B1_%D8%B5%D8%AF%DB%8C%D9%82"
  },
  {
    "name": "ابوجندل",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%AC%D9%86%D8%AF%D9%84"
  },
  {
    "name": "ابو حذیفہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%AD%D8%B0%DB%8C%D9%81%DB%81"
  },
  {
    "name": "ابو دجانہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%AF%D8%AC%D8%A7%D9%86%DB%81"
  },
  {
    "name": "ابودرداء",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%AF%D8%B1%D8%AF%D8%A7%D8%A1"
  },
  {
    "name": "ابوذر غفاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B0%D8%B1_%D8%BA%D9%81%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابو رافع",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B1%D8%A7%D9%81%D8%B9"
  },
  {
    "name": "ابوسبرہ بن ابو رہم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B3%D8%A8%D8%B1%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D8%B1%DB%81%D9%85"
  },
  {
    "name": "ابوسفیان بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B3%D9%81%DB%8C%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "ابو سفیان بن حرب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B3%D9%81%DB%8C%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D8%B1%D8%A8"
  },
  {
    "name": "ابو سلمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B3%D9%84%D9%85%DB%81_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81_%D8%A7%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%A7%D8%B3%D8%AF"
  },
  {
    "name": "ابوسفیان بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B3%D9%81%DB%8C%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "ابو سفیان بن حرب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B3%D9%81%DB%8C%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D8%B1%D8%A8"
  },
  {
    "name": "ابو صرمہ انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B5%D8%B1%D9%85%DB%81_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابو الضیاح انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D8%B6%DB%8C%D8%A7%D8%AD_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابوطلحہ انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B7%D9%84%D8%AD%DB%81_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابوعبیدہ ابن جراح",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%B9%D8%A8%DB%8C%D8%AF%DB%81_%D8%A7%D8%A8%D9%86_%D8%AC%D8%B1%D8%A7%D8%AD"
  },
  {
    "name": "ابو عیسی حارثی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D8%B9%DB%8C%D8%B3%DB%8C_%D8%AD%D8%A7%D8%B1%D8%AB%DB%8C"
  },
  {
    "name": "ابو فضالہ انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%81%D8%B6%D8%A7%D9%84%DB%81_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابو فکیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%81%DA%A9%DB%8C%DB%81"
  },
  {
    "name": "ابو قتادہ انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%82%D8%AA%D8%A7%D8%AF%DB%81_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابوقیس حرمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D9%82%DB%8C%D8%B3_%D8%AD%D8%B1%D9%85%DB%81"
  },
  {
    "name": "ابو کبشہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%DA%A9%D8%A8%D8%B4%DB%81"
  },
  {
    "name": "ابو لبابہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%84%D8%A8%D8%A7%D8%A8%DB%81"
  },
  {
    "name": "ابو محجن ثقفی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%85%D8%AD%D8%AC%D9%86_%D8%AB%D9%82%D9%81%DB%8C"
  },
  {
    "name": "ابو محذورہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%85%D8%AD%D8%B0%D9%88%D8%B1%DB%81"
  },
  {
    "name": "ابو ملیل انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88_%D9%85%D9%84%DB%8C%D9%84_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ابوموسٰی اشعری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D9%85%D9%88%D8%B3%D9%B0%DB%8C_%D8%A7%D8%B4%D8%B9%D8%B1%DB%8C"
  },
  {
    "name": "ابوہریرہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%DB%81%D8%B1%DB%8C%D8%B1%DB%81"
  },
  {
    "name": "ابی بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%DB%8C_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "ابی بن کعب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%DB%8C_%D8%A8%D9%86_%DA%A9%D8%B9%D8%A8"
  },
  {
    "name": "ابی بن معاذ بن انس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%DB%8C_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0_%D8%A8%D9%86_%D8%A7%D9%86%D8%B3"
  },
  {
    "name": "احنف بن قیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%AD%D9%86%D9%81_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3"
  },
  {
    "name": "اسامہ بن زید",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D8%A7%D9%85%DB%81_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "اسعد بن زرارہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B2%D8%B1%D8%A7%D8%B1%DB%81"
  },
  {
    "name": "اسود بن سریع",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D9%88%D8%AF_%D8%A8%D9%86_%D8%B3%D8%B1%DB%8C%D8%B9"
  },
  {
    "name": "اسیرہ بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%DB%8C%D8%B1%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "ام البنین",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%A7%D9%84%D8%A8%D9%86%DB%8C%D9%86"
  },
  {
    "name": "ام ایمن",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%A7%DB%8C%D9%85%D9%86"
  },
  {
    "name": "ام حکیم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%AD%DA%A9%DB%8C%D9%85"
  },
  {
    "name": "ام رومان",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%B1%D9%88%D9%85%D8%A7%D9%86"
  },
  {
    "name": "ام سلیم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%B3%D9%84%DB%8C%D9%85"
  },
  {
    "name": "ام شریک",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%B4%D8%B1%DB%8C%DA%A9"
  },
  {
    "name": "ام عبیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%B9%D8%A8%DB%8C%D8%B3"
  },
  {
    "name": "ام عمارہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%D8%B9%D9%85%D8%A7%D8%B1%DB%81"
  },
  {
    "name": "ام کلثوم بنت عاصم",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%A7%D9%85_%DA%A9%D9%84%D8%AB%D9%88%D9%85_%D8%A8%D9%86%D8%AA_%D8%B9%D8%A7%D8%B5%D9%85&action=edit&redlink=1"
  },
  {
    "name": "ام کلثوم بنت محمد",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%DA%A9%D9%84%D8%AB%D9%88%D9%85_%D8%A8%D9%86%D8%AA_%D9%85%D8%AD%D9%85%D8%AF"
  },
  {
    "name": "ام کلثوم بنت عقبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85_%DA%A9%D9%84%D8%AB%D9%88%D9%85_%D8%A8%D9%86%D8%AA_%D8%B9%D9%82%D8%A8%DB%81"
  },
  {
    "name": "احنف بن قیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%AD%D9%86%D9%81_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3"
  },
  {
    "name": "اخنس بن حبیب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%AE%D9%86%D8%B3_%D8%A8%D9%86_%D8%AD%D8%A8%DB%8C%D8%A8"
  },
  {
    "name": "ارقم بن ابی الارقم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B1%D9%82%D9%85_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%84%D8%A7%D8%B1%D9%82%D9%85"
  },
  {
    "name": "اسعد بن یزید",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%DB%8C%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "اسماء بنت ابی بکر",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%A8%D9%86%D8%AA_%D8%A7%D8%A8%DB%8C_%D8%A8%DA%A9%D8%B1"
  },
  {
    "name": "اسماء بنت عمیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%A8%D9%86%D8%AA_%D8%B9%D9%85%DB%8C%D8%B3"
  },
  {
    "name": "اسید بن حضیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D8%B3%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AD%D8%B6%DB%8C%D8%B1"
  },
  {
    "name": "امرؤ القیس بن عابس",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%85%D8%B1%D8%A4_%D8%A7%D9%84%D9%82%DB%8C%D8%B3_%D8%A8%D9%86_%D8%B9%D8%A7%D8%A8%D8%B3"
  },
  {
    "name": "انس بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%86%D8%B3_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "انس بن معاذ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%86%D8%B3_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0"
  },
  {
    "name": "انیس بن قتادہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%86%DB%8C%D8%B3_%D8%A8%D9%86_%D9%82%D8%AA%D8%A7%D8%AF%DB%81"
  },
  {
    "name": "النہدیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%84%D9%86%DB%81%D8%AF%DB%8C%DB%81"
  },
  {
    "name": "اوس بن خولی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%88%D8%B3_%D8%A8%D9%86_%D8%AE%D9%88%D9%84%DB%8C"
  },
  {
    "name": "اوس بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%88%D8%B3_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "اوس بن صامت",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%88%D8%B3_%D8%A8%D9%86_%D8%B5%D8%A7%D9%85%D8%AA"
  },
  {
    "name": "اوس بن معاذ",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%D9%88%D8%B3_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0"
  },
  {
    "name": "ایاس بن ابی البکیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%DB%8C%D8%A7%D8%B3_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%84%D8%A8%DA%A9%DB%8C%D8%B1"
  },
  {
    "name": "ایمن بن خریم",
    "url": "https://ur.wikipedia.org/wiki/%D8%A7%DB%8C%D9%85%D9%86_%D8%A8%D9%86_%D8%AE%D8%B1%DB%8C%D9%85"
  },
  {
    "name": "براء بن عازب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%B1%D8%A7%D8%A1_%D8%A8%D9%86_%D8%B9%D8%A7%D8%B2%D8%A8"
  },
  {
    "name": "براء بن مالک انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%B1%D8%A7%D8%A1_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "بریدہ بن حصیب",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%B1%DB%8C%D8%AF%DB%81_%D8%A8%D9%86_%D8%AD%D8%B5%DB%8C%D8%A8"
  },
  {
    "name": "بجير بن ابی بجير",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%AC%D9%8A%D8%B1_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A8%D8%AC%D9%8A%D8%B1"
  },
  {
    "name": "بشر بن البراء",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%B4%D8%B1_%D8%A8%D9%86_%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D8%A1"
  },
  {
    "name": "بشیر بن سعد ابو النعمان ابن ثعلبہ الانصاری الخزرجی",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D8%B4%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "بلال بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D9%84%D8%A7%D9%84_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "بلال ابن رباح",
    "url": "https://ur.wikipedia.org/wiki/%D8%A8%D9%84%D8%A7%D9%84_%D8%A7%D8%A8%D9%86_%D8%B1%D8%A8%D8%A7%D8%AD"
  },
  {
    "name": "بلال بن یحیى",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%A8%D9%84%D8%A7%D9%84_%D8%A8%D9%86_%DB%8C%D8%AD%DB%8C%D9%89&action=edit&redlink=1"
  },
  {
    "name": "تمیم بن الحمام",
    "url": "https://ur.wikipedia.org/wiki/%D8%AA%D9%85%DB%8C%D9%85_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D9%85"
  },
  {
    "name": "تمیم بن اوس داری",
    "url": "https://ur.wikipedia.org/wiki/%D8%AA%D9%85%DB%8C%D9%85_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3_%D8%AF%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "تمیم ربیعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AA%D9%85%DB%8C%D9%85_%D8%B1%D8%A8%DB%8C%D8%B9%DB%81"
  },
  {
    "name": "تمیم مولی خراش",
    "url": "https://ur.wikipedia.org/wiki/%D8%AA%D9%85%DB%8C%D9%85_%D9%85%D9%88%D9%84%DB%8C_%D8%AE%D8%B1%D8%A7%D8%B4"
  },
  {
    "name": "تمیم بن زید",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%AA%D9%85%DB%8C%D9%85_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF&action=edit&redlink=1"
  },
  {
    "name": "ثابت بن اقرم",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%A7%D9%82%D8%B1%D9%85"
  },
  {
    "name": "ثابت بن الجذع",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%A7%D9%84%D8%AC%D8%B0%D8%B9"
  },
  {
    "name": "ثابت بن خالد",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%AE%D8%A7%D9%84%D8%AF"
  },
  {
    "name": "ثابت بن دحداح",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%AF%D8%AD%D8%AF%D8%A7%D8%AD"
  },
  {
    "name": "ثابت بن ضحاک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%B6%D8%AD%D8%A7%DA%A9"
  },
  {
    "name": "ثابت بن عبید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%B9%D8%A8%DB%8C%D8%AF"
  },
  {
    "name": "ثابت بن عمرو انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "ثابت بن قیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3"
  },
  {
    "name": "ثابت بن المنذر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D9%86%D8%B0%D8%B1"
  },
  {
    "name": "ثابت بن ہزال",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%A7%D8%A8%D8%AA_%D8%A8%D9%86_%DB%81%D8%B2%D8%A7%D9%84"
  },
  {
    "name": "ثعلبہ بن الحارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%B9%D9%84%D8%A8%DB%81_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "ثعلبہ بن حاطب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%B9%D9%84%D8%A8%DB%81_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B7%D8%A8"
  },
  {
    "name": "ثعلبہ بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%B9%D9%84%D8%A8%DB%81_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "ثعلبہ بن عمرو بن محصن",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%B9%D9%84%D8%A8%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D9%85%D8%AD%D8%B5%D9%86"
  },
  {
    "name": "ثعلبہ بن عنمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D8%B9%D9%84%D8%A8%DB%81_%D8%A8%D9%86_%D8%B9%D9%86%D9%85%DB%81"
  },
  {
    "name": "ثقف بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D9%82%D9%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "ثمامہ بن اثال",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D9%85%D8%A7%D9%85%DB%81_%D8%A8%D9%86_%D8%A7%D8%AB%D8%A7%D9%84"
  },
  {
    "name": "ثمامہ بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D9%85%D8%A7%D9%85%DB%81_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "ثویبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D9%88%DB%8C%D8%A8%DB%81"
  },
  {
    "name": "ثوبان بن بجدد",
    "url": "https://ur.wikipedia.org/wiki/%D8%AB%D9%88%D8%A8%D8%A7%D9%86_%D8%A8%D9%86_%D8%A8%D8%AC%D8%AF%D8%AF"
  },
  {
    "name": "جابر بن عبداللہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%A7%D8%A8%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81"
  },
  {
    "name": "جابر بن عبداللہ بن رئاب",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%AC%D8%A7%D8%A8%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B1%D8%A6%D8%A7%D8%A8&action=edit&redlink=1"
  },
  {
    "name": "جبار بن صخر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%A8%D8%A7%D8%B1_%D8%A8%D9%86_%D8%B5%D8%AE%D8%B1"
  },
  {
    "name": "جبیر بن ایاس",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%A8%DB%8C%D8%B1_%D8%A8%D9%86_%D8%A7%DB%8C%D8%A7%D8%B3"
  },
  {
    "name": "جبیر بن مطعم",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%A8%DB%8C%D8%B1_%D8%A8%D9%86_%D9%85%D8%B7%D8%B9%D9%85"
  },
  {
    "name": "جریر بن عبداللہ البجلی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%B1%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81_%D8%A7%D9%84%D8%A8%D8%AC%D9%84%DB%8C"
  },
  {
    "name": "جعفر ابن ابی طالب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D8%B9%D9%81%D8%B1_%D8%A7%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8"
  },
  {
    "name": "جلیبیب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AC%D9%84%DB%8C%D8%A8%DB%8C%D8%A8"
  },
  {
    "name": "حارث بن ابی ہالہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%DB%81%D8%A7%D9%84%DB%81"
  },
  {
    "name": "حارث بن انس بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%A7%D9%86%D8%B3_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "حارث بن اوس بن معاذ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0"
  },
  {
    "name": "حارث بن خالد",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%AE%D8%A7%D9%84%D8%AF"
  },
  {
    "name": "حارث بن خزمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%AE%D8%B2%D9%85%DB%81"
  },
  {
    "name": "حارث بن عبد العزی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B9%D8%B2%DB%8C"
  },
  {
    "name": "حارث بن عمیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D8%B1"
  },
  {
    "name": "حارث بن عبدالمطلب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%A8"
  },
  {
    "name": "حارث بن قیس بن خلدہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3_%D8%A8%D9%86_%D8%AE%D9%84%D8%AF%DB%81"
  },
  {
    "name": "حارث بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "حارث بن معاذ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0"
  },
  {
    "name": "حارث بن ہشام بن مغیرہ",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A8%D9%86_%DB%81%D8%B4%D8%A7%D9%85_%D8%A8%D9%86_%D9%85%D8%BA%DB%8C%D8%B1%DB%81&action=edit&redlink=1"
  },
  {
    "name": "حارثہ بن زید انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB%DB%81_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "حارثہ بن سراقہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B1%D8%AB%DB%81_%D8%A8%D9%86_%D8%B3%D8%B1%D8%A7%D9%82%DB%81"
  },
  {
    "name": "حاطب بن ابی بلتعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B7%D8%A8_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A8%D9%84%D8%AA%D8%B9%DB%81"
  },
  {
    "name": "حاطب بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B7%D8%A8_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "حاطب بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A7%D8%B7%D8%A8_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "حباب بن منذر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A8%D8%A7%D8%A8_%D8%A8%D9%86_%D9%85%D9%86%D8%B0%D8%B1"
  },
  {
    "name": "حبیب بن زید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A8%DB%8C%D8%A8_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "حبیبہ بنت ام حبیبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%A8%DB%8C%D8%A8%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%85_%D8%AD%D8%A8%DB%8C%D8%A8%DB%81"
  },
  {
    "name": "حجر بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%AC%D8%B1_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "حذیفہ بن یمان",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B0%DB%8C%D9%81%DB%81_%D8%A8%D9%86_%DB%8C%D9%85%D8%A7%D9%86"
  },
  {
    "name": "حرام بن ملحان",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B1%D8%A7%D9%85_%D8%A8%D9%86_%D9%85%D9%84%D8%AD%D8%A7%D9%86"
  },
  {
    "name": "حرقوص العنبری",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B1%D9%82%D9%88%D8%B5_%D8%A7%D9%84%D8%B9%D9%86%D8%A8%D8%B1%DB%8C"
  },
  {
    "name": "حریث بن زید بن عبد ربہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B1%DB%8C%D8%AB_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%B1%D8%A8%DB%81"
  },
  {
    "name": "حزن بن ابی وہب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B2%D9%86_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "حسان بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B3%D8%A7%D9%86_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "حسن ابن علی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B3%D9%86_%D8%A7%D8%A8%D9%86_%D8%B9%D9%84%DB%8C"
  },
  {
    "name": "حسن بن جابر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B3%D9%86_%D8%A8%D9%86_%D8%AC%D8%A7%D8%A8%D8%B1"
  },
  {
    "name": "حسین ابن علی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B3%DB%8C%D9%86_%D8%A7%D8%A8%D9%86_%D8%B9%D9%84%DB%8C"
  },
  {
    "name": "حصین بن الحارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B5%DB%8C%D9%86_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "حطاب بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D8%B7%D8%A7%D8%A8_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "حفصہ بنت عمر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D9%81%D8%B5%DB%81_%D8%A8%D9%86%D8%AA_%D8%B9%D9%85%D8%B1"
  },
  {
    "name": "حکم بن عمیر الثمالی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%DA%A9%D9%85_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D8%B1_%D8%A7%D9%84%D8%AB%D9%85%D8%A7%D9%84%DB%8C"
  },
  {
    "name": "حکیم بن حزام",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%DA%A9%DB%8C%D9%85_%D8%A8%D9%86_%D8%AD%D8%B2%D8%A7%D9%85"
  },
  {
    "name": "حلیمہ سعدیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D9%84%DB%8C%D9%85%DB%81_%D8%B3%D8%B9%D8%AF%DB%8C%DB%81"
  },
  {
    "name": "حمنہ بنت جحش",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D9%85%D9%86%DB%81_%D8%A8%D9%86%D8%AA_%D8%AC%D8%AD%D8%B4"
  },
  {
    "name": "حمزہ بن عبدالمطلب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D9%85%D8%B2%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%A8"
  },
  {
    "name": "حنظلہ بن ربیع",
    "url": "https://ur.wikipedia.org/wiki/%D8%AD%D9%86%D8%B8%D9%84%DB%81_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9"
  },
  {
    "name": "خارجہ بن حذافہ سہمی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B1%D8%AC%DB%81_%D8%A8%D9%86_%D8%AD%D8%B0%D8%A7%D9%81%DB%81_%D8%B3%DB%81%D9%85%DB%8C"
  },
  {
    "name": "خارجہ بن حمیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B1%D8%AC%DB%81_%D8%A8%D9%86_%D8%AD%D9%85%DB%8C%D8%B1"
  },
  {
    "name": "خارجہ بن زید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B1%D8%AC%DB%81_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B2%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "خالد بن ابی البکیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%84%D8%A8%DA%A9%DB%8C%D8%B1"
  },
  {
    "name": "خالد بن سعید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D8%B3%D8%B9%DB%8C%D8%AF"
  },
  {
    "name": "خالد بن عاص",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A7%D8%B5&action=edit&redlink=1"
  },
  {
    "name": "خالد بن عمرو بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "خالد بن قیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3"
  },
  {
    "name": "خالد بن قیس بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D9%82%DB%8C%D8%B3_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "خالد بن ولید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D9%84%D8%AF_%D8%A8%D9%86_%D9%88%D9%84%DB%8C%D8%AF"
  },
  {
    "name": "خباب بن ارت",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A8%D8%A7%D8%A8_%D8%A8%D9%86_%D8%A7%D8%B1%D8%AA"
  },
  {
    "name": "خباب مولى عتبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A8%D8%A7%D8%A8_%D9%85%D9%88%D9%84%D9%89_%D8%B9%D8%AA%D8%A8%DB%81"
  },
  {
    "name": "خبیب بن اساف",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A8%DB%8C%D8%A8_%D8%A8%D9%86_%D8%A7%D8%B3%D8%A7%D9%81"
  },
  {
    "name": "خبیب بن الاسود انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A8%DB%8C%D8%A8_%D8%A8%D9%86_%D8%A7%D9%84%D8%A7%D8%B3%D9%88%D8%AF_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  },
  {
    "name": "خبیب بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%A8%DB%8C%D8%A8_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "خداش بن قتادہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%AF%D8%A7%D8%B4_%D8%A8%D9%86_%D9%82%D8%AA%D8%A7%D8%AF%DB%81"
  },
  {
    "name": "خدیجہ بنت خویلد",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%AF%DB%8C%D8%AC%DB%81_%D8%A8%D9%86%D8%AA_%D8%AE%D9%88%DB%8C%D9%84%D8%AF"
  },
  {
    "name": "خراش بن الصمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%B1%D8%A7%D8%B4_%D8%A8%D9%86_%D8%A7%D9%84%D8%B5%D9%85%DB%81"
  },
  {
    "name": "خرباق ابن ساریہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%B1%D8%A8%D8%A7%D9%82_%D8%A7%D8%A8%D9%86_%D8%B3%D8%A7%D8%B1%DB%8C%DB%81"
  },
  {
    "name": "خریم بن فاتک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%B1%DB%8C%D9%85_%D8%A8%D9%86_%D9%81%D8%A7%D8%AA%DA%A9"
  },
  {
    "name": "خزیمہ بن اوس",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%B2%DB%8C%D9%85%DB%81_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3"
  },
  {
    "name": "خزیمہ بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D8%B2%DB%8C%D9%85%DB%81_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "خلاد بن رافع بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%84%D8%A7%D8%AF_%D8%A8%D9%86_%D8%B1%D8%A7%D9%81%D8%B9_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "خلاد بن سوید",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%84%D8%A7%D8%AF_%D8%A8%D9%86_%D8%B3%D9%88%DB%8C%D8%AF"
  },
  {
    "name": "خلاد بن عمرو بن الجموح",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%84%D8%A7%D8%AF_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%D9%84%D8%AC%D9%85%D9%88%D8%AD"
  },
  {
    "name": "خلیفہ بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%84%DB%8C%D9%81%DB%81_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "الخنساء، ارثی العرب",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%86%D8%B3%D8%A7%D8%A1"
  },
  {
    "name": "خنیس بن حذافہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%86%DB%8C%D8%B3_%D8%A8%D9%86_%D8%AD%D8%B0%D8%A7%D9%81%DB%81"
  },
  {
    "name": "خوات بن جبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%88%D8%A7%D8%AA_%D8%A8%D9%86_%D8%AC%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "خولہ بنت حکیم",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%88%D9%84%DB%81_%D8%A8%D9%86%D8%AA_%D8%AD%DA%A9%DB%8C%D9%85"
  },
  {
    "name": "خولی بن ابی خولی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%88%D9%84%DB%8C_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%AE%D9%88%D9%84%DB%8C"
  },
  {
    "name": "خویلد بن عمرو السلمی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%D9%88%DB%8C%D9%84%D8%AF_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A7%D9%84%D8%B3%D9%84%D9%85%DB%8C"
  },
  {
    "name": "خیثمہ بن الحارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AE%DB%8C%D8%AB%D9%85%DB%81_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "دحیہ الکلبی",
    "url": "https://ur.wikipedia.org/wiki/%D8%AF%D8%AD%DB%8C%DB%81_%D8%A7%D9%84%DA%A9%D9%84%D8%A8%DB%8C"
  },
  {
    "name": "دعثور بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%AF%D8%B9%D8%AB%D9%88%D8%B1_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "ذو البجادین",
    "url": "https://ur.wikipedia.org/wiki/%D8%B0%D9%88_%D8%A7%D9%84%D8%A8%D8%AC%D8%A7%D8%AF%DB%8C%D9%86"
  },
  {
    "name": "ذو الشمالين بن عبد عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B0%D9%88_%D8%A7%D9%84%D8%B4%D9%85%D8%A7%D9%84%D9%8A%D9%86_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "ذو الخویصرہ یمانی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B0%D9%88_%D8%A7%D9%84%D8%AE%D9%88%DB%8C%D8%B5%D8%B1%DB%81_%DB%8C%D9%85%D8%A7%D9%86%DB%8C"
  },
  {
    "name": "ذکوان بن عبد قیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B0%DA%A9%D9%88%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D9%82%DB%8C%D8%B3"
  },
  {
    "name": "رافع بن خدیج",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A7%D9%81%D8%B9_%D8%A8%D9%86_%D8%AE%D8%AF%DB%8C%D8%AC"
  },
  {
    "name": "رافع بن عمیرہ طائی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A7%D9%81%D8%B9_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D8%B1%DB%81_%D8%B7%D8%A7%D8%A6%DB%8C"
  },
  {
    "name": "رافع بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A7%D9%81%D8%B9_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "رافع بن المعلى",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A7%D9%81%D8%B9_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%89"
  },
  {
    "name": "ربیعہ بن امیہ",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%B1%D8%A8%DB%8C%D8%B9%DB%81_%D8%A8%D9%86_%D8%A7%D9%85%DB%8C%DB%81&action=edit&redlink=1"
  },
  {
    "name": "ربیعہ بن کعب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A8%DB%8C%D8%B9%DB%81_%D8%A8%D9%86_%DA%A9%D8%B9%D8%A8"
  },
  {
    "name": "ربيعہ بن حارث",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%B1%D8%A8%D9%8A%D8%B9%DB%81_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB&action=edit&redlink=1"
  },
  {
    "name": "ربیعہ بن اکثم",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A8%DB%8C%D8%B9%DB%81_%D8%A8%D9%86_%D8%A7%DA%A9%D8%AB%D9%85"
  },
  {
    "name": "ربیع بن ایاس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D8%A8%DB%8C%D8%B9_%D8%A8%D9%86_%D8%A7%DB%8C%D8%A7%D8%B3"
  },
  {
    "name": "رفاعہ بن رافع",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D9%81%D8%A7%D8%B9%DB%81_%D8%A8%D9%86_%D8%B1%D8%A7%D9%81%D8%B9"
  },
  {
    "name": "رملہ بنت ابوسفیان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D9%85%D9%84%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D8%A8%D9%88%D8%B3%D9%81%DB%8C%D8%A7%D9%86"
  },
  {
    "name": "رفیدہ الاسلمیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D9%81%DB%8C%D8%AF%DB%81_%D8%A7%D9%84%D8%A7%D8%B3%D9%84%D9%85%DB%8C%DB%81"
  },
  {
    "name": "رقیہ بنت محمد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B1%D9%82%DB%8C%DB%81_%D8%A8%D9%86%D8%AA_%D9%85%D8%AD%D9%85%D8%AF"
  },
  {
    "name": "زاهر بن حرام",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%D8%A7%D9%87%D8%B1_%D8%A8%D9%86_%D8%AD%D8%B1%D8%A7%D9%85"
  },
  {
    "name": "زبیر ابن العوام",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%D8%A8%DB%8C%D8%B1_%D8%A7%D8%A8%D9%86_%D8%A7%D9%84%D8%B9%D9%88%D8%A7%D9%85"
  },
  {
    "name": "زنیرہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%D9%86%DB%8C%D8%B1%DB%81_%D8%A7%D9%84%D8%B1%D9%88%D9%85%DB%8C%DB%81"
  },
  {
    "name": "زیاد بن کعب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%A7%D8%AF_%D8%A8%D9%86_%DA%A9%D8%B9%D8%A8"
  },
  {
    "name": "زیاد بن ابی سفیان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%A7%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B3%D9%81%DB%8C%D8%A7%D9%86"
  },
  {
    "name": "زیاد بن لبید",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%A7%D8%AF_%D8%A8%D9%86_%D9%84%D8%A8%DB%8C%D8%AF"
  },
  {
    "name": "زید الخیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A7%D9%84%D8%AE%DB%8C%D8%B1"
  },
  {
    "name": "زید ابن الخطاب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A7%D8%A8%D9%86_%D8%A7%D9%84%D8%AE%D8%B7%D8%A7%D8%A8"
  },
  {
    "name": "زید بن ارقم",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D8%B1%D9%82%D9%85"
  },
  {
    "name": "زید بن حارثہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB%DB%81"
  },
  {
    "name": "زید بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "زید بن ثعلبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AB%D8%B9%D9%84%D8%A8%DB%81"
  },
  {
    "name": "زید بن دثنہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AF%D8%AB%D9%86%DB%81"
  },
  {
    "name": "زید بن سہل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B3%DB%81%D9%84"
  },
  {
    "name": "زینب بنت علی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D9%86%D8%A8_%D8%A8%D9%86%D8%AA_%D8%B9%D9%84%DB%8C"
  },
  {
    "name": "زینب بنت جحش",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D9%86%D8%A8_%D8%A8%D9%86%D8%AA_%D8%AC%D8%AD%D8%B4"
  },
  {
    "name": "زینب بنت خزیمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D9%86%D8%A8_%D8%A8%D9%86%D8%AA_%D8%AE%D8%B2%DB%8C%D9%85%DB%81"
  },
  {
    "name": "زینب بنت محمد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B2%DB%8C%D9%86%D8%A8_%D8%A8%D9%86%D8%AA_%D9%85%D8%AD%D9%85%D8%AF"
  },
  {
    "name": "سالم مولی ابی حذیفہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A7%D9%84%D9%85_%D9%85%D9%88%D9%84%DB%8C_%D8%A7%D8%A8%DB%8C_%D8%AD%D8%B0%DB%8C%D9%81%DB%81"
  },
  {
    "name": "سالم بن عمير",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A7%D9%84%D9%85_%D8%A8%D9%86_%D8%B9%D9%85%D9%8A%D8%B1"
  },
  {
    "name": "سائب بن خلاد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A7%D8%A6%D8%A8_%D8%A8%D9%86_%D8%AE%D9%84%D8%A7%D8%AF"
  },
  {
    "name": "سائب بن مظعون",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A7%D8%A6%D8%A8_%D8%A8%D9%86_%D9%85%D8%B8%D8%B9%D9%88%D9%86"
  },
  {
    "name": "سائب بن عثمان بن مظعون",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A7%D8%A6%D8%A8_%D8%A8%D9%86_%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D8%B8%D8%B9%D9%88%D9%86"
  },
  {
    "name": "سبرہ بن فاتک",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A8%D8%B1%DB%81_%D8%A8%D9%86_%D9%81%D8%A7%D8%AA%DA%A9"
  },
  {
    "name": "سبرہ بن معبد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%A8%D8%B1%DB%81_%D8%A8%D9%86_%D9%85%D8%B9%D8%A8%D8%AF"
  },
  {
    "name": "سحبان وائل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%AD%D8%A8%D8%A7%D9%86_%D9%88%D8%A7%D8%A6%D9%84"
  },
  {
    "name": "سراقہ بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B1%D8%A7%D9%82%DB%81_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "سعد بن ابی وقاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D9%88%D9%82%D8%A7%D8%B5"
  },
  {
    "name": "سعد بن خولیٰ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%AE%D9%88%D9%84%DB%8C%D9%B0"
  },
  {
    "name": "سعد بن خیثمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%AE%DB%8C%D8%AB%D9%85%DB%81"
  },
  {
    "name": "سعد بن ربیع",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9"
  },
  {
    "name": "سعد بن زید اشہلی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF_%D8%A7%D8%B4%DB%81%D9%84%DB%8C"
  },
  {
    "name": "سعد بن زید زرقی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF_%D8%B2%D8%B1%D9%82%DB%8C"
  },
  {
    "name": "سعد بن عبادہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%D8%A7%D8%AF%DB%81"
  },
  {
    "name": "سعد بن عبید",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%DB%8C%D8%AF"
  },
  {
    "name": "سعد بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "سعد بن معاذ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0"
  },
  {
    "name": "سعد بن عبادہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%D8%A7%D8%AF%DB%81"
  },
  {
    "name": "سعید بن جبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AC%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "سعید بن زید",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "سعید بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D8%B9%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "سفیان بن عبداللہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%81%DB%8C%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81"
  },
  {
    "name": "سکران بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DA%A9%D8%B1%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "سلمہ بن اکوع",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%84%D9%85%DB%81_%D8%A8%D9%86_%D8%A7%DA%A9%D9%88%D8%B9"
  },
  {
    "name": "سلمہ بنت عمیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%84%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%B9%D9%85%DB%8C%D8%B3"
  },
  {
    "name": "سلمہ ام الخیر",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%B3%D9%84%D9%85%DB%81_%D8%A7%D9%85_%D8%A7%D9%84%D8%AE%DB%8C%D8%B1&action=edit&redlink=1"
  },
  {
    "name": "سلمہ بن سلامہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%84%D9%85%DB%81_%D8%A8%D9%86_%D8%B3%D9%84%D8%A7%D9%85%DB%81"
  },
  {
    "name": "سلمان فارسی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%84%D9%85%D8%A7%D9%86_%D9%81%D8%A7%D8%B1%D8%B3%DB%8C"
  },
  {
    "name": "سلیط بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%84%DB%8C%D8%B7_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "سمرہ بن جندب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%85%D8%B1%DB%81_%D8%A8%D9%86_%D8%AC%D9%86%D8%AF%D8%A8"
  },
  {
    "name": "سمیہ بنت خباط",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%85%DB%8C%DB%81_%D8%A8%D9%86%D8%AA_%D8%AE%D8%A8%D8%A7%D8%B7"
  },
  {
    "name": "سنان بن ابوسنان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%86%D8%A7%D9%86_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88%D8%B3%D9%86%D8%A7%D9%86"
  },
  {
    "name": "سہل بن بیضا",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%D9%84_%D8%A8%D9%86_%D8%A8%DB%8C%D8%B6%D8%A7"
  },
  {
    "name": "سہل بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%D9%84_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "سہل بن حنیف",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%D9%84_%D8%A8%D9%86_%D8%AD%D9%86%DB%8C%D9%81"
  },
  {
    "name": "سہلہ بنت سہیل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%D9%84%DB%81_%D8%A8%D9%86%D8%AA_%D8%B3%DB%81%DB%8C%D9%84"
  },
  {
    "name": "سہیل بن بیضا",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%DB%8C%D9%84_%D8%A8%D9%86_%D8%A8%DB%8C%D8%B6%D8%A7"
  },
  {
    "name": "سہیل بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%81%DB%8C%D9%84_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "سودہ بنت زمعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%88%D8%AF%DB%81_%D8%A8%D9%86%D8%AA_%D8%B2%D9%85%D8%B9%DB%81"
  },
  {
    "name": "سیرین زوجہ حسان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%DB%8C%D8%B1%DB%8C%D9%86_%D8%B2%D9%88%D8%AC%DB%81_%D8%AD%D8%B3%D8%A7%D9%86"
  },
  {
    "name": "سویبط بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%88%DB%8C%D8%A8%D8%B7_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "سوید بن مخشی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B3%D9%88%DB%8C%D8%AF_%D8%A8%D9%86_%D9%85%D8%AE%D8%B4%DB%8C"
  },
  {
    "name": "شجاع بن وہب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B4%D8%AC%D8%A7%D8%B9_%D8%A8%D9%86_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "شداد بن اوس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B4%D8%AF%D8%A7%D8%AF_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3"
  },
  {
    "name": "شرحبیل بن حسنہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B4%D8%B1%D8%AD%D8%A8%DB%8C%D9%84_%D8%A8%D9%86_%D8%AD%D8%B3%D9%86%DB%81"
  },
  {
    "name": "شقران صالح",
    "url": "https://ur.wikipedia.org/wiki/%D8%B4%D9%82%D8%B1%D8%A7%D9%86_%D8%B5%D8%A7%D9%84%D8%AD"
  },
  {
    "name": "شماس بن عثمان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B4%D9%85%D8%A7%D8%B3_%D8%A8%D9%86_%D8%B9%D8%AB%D9%85%D8%A7%D9%86"
  },
  {
    "name": "صفوان بن امیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D9%81%D9%88%D8%A7%D9%86_%D8%A8%D9%86_%D8%A7%D9%85%DB%8C%DB%81"
  },
  {
    "name": "صفوان بن بیضاء",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D9%81%D9%88%D8%A7%D9%86_%D8%A8%D9%86_%D8%A8%DB%8C%D8%B6%D8%A7%D8%A1"
  },
  {
    "name": "صفوان بن معطل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D9%81%D9%88%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D8%B9%D8%B7%D9%84"
  },
  {
    "name": "صفیہ بنت حی بن اخطب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D9%81%DB%8C%DB%81_%D8%A8%D9%86%D8%AA_%D8%AD%DB%8C_%D8%A8%D9%86_%D8%A7%D8%AE%D8%B7%D8%A8"
  },
  {
    "name": "صفیہ بنت عبد المطلب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D9%81%DB%8C%DB%81_%D8%A8%D9%86%D8%AA_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%A8"
  },
  {
    "name": "صعصعہ بن صوحان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D8%B9%D8%B5%D8%B9%DB%81_%D8%A8%D9%86_%D8%B5%D9%88%D8%AD%D8%A7%D9%86"
  },
  {
    "name": "صعصعہ بن ناجیہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%D8%B9%D8%B5%D8%B9%DB%81_%D8%A8%D9%86_%D9%86%D8%A7%D8%AC%DB%8C%DB%81"
  },
  {
    "name": "صہیب الرومی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B5%DB%81%DB%8C%D8%A8_%D8%A7%D9%84%D8%B1%D9%88%D9%85%DB%8C"
  },
  {
    "name": "ضحاک بن حارثہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B6%D8%AD%D8%A7%DA%A9_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB%DB%81"
  },
  {
    "name": "ضحاک بن سفیان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B6%D8%AD%D8%A7%DA%A9_%D8%A8%D9%86_%D8%B3%D9%81%DB%8C%D8%A7%D9%86"
  },
  {
    "name": "ضحاک بن عبد عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B6%D8%AD%D8%A7%DA%A9_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "ضرار بن ازور",
    "url": "https://ur.wikipedia.org/wiki/%D8%B6%D8%B1%D8%A7%D8%B1_%D8%A8%D9%86_%D8%A7%D8%B2%D9%88%D8%B1"
  },
  {
    "name": "ضماد بن ثعلبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B6%D9%85%D8%A7%D8%AF_%D8%A8%D9%86_%D8%AB%D8%B9%D9%84%D8%A8%DB%81"
  },
  {
    "name": "طفیل بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%B7%D9%81%DB%8C%D9%84_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "طفیل بن عمرو دوسی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B7%D9%81%DB%8C%D9%84_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%AF%D9%88%D8%B3%DB%8C"
  },
  {
    "name": "طلحہ بن عبید اللہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B7%D9%84%D8%AD%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%DB%8C%D8%AF_%D8%A7%D9%84%D9%84%DB%81"
  },
  {
    "name": "طلحہ بن عتبہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B7%D9%84%D8%AD%DB%81_%D8%A8%D9%86_%D8%B9%D8%AA%D8%A8%DB%81"
  },
  {
    "name": "طلیب بن عمیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B7%D9%84%DB%8C%D8%A8_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D8%B1"
  },
  {
    "name": "ظہیر بن رافع",
    "url": "https://ur.wikipedia.org/wiki/%D8%B8%DB%81%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B1%D8%A7%D9%81%D8%B9"
  },
  {
    "name": "عائشہ بنت ابی بکر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D8%A6%D8%B4%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D8%A8%DB%8C_%D8%A8%DA%A9%D8%B1"
  },
  {
    "name": "عاقل بن ابی البکیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%82%D9%84_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%84%D8%A8%DA%A9%DB%8C%D8%B1"
  },
  {
    "name": "عاصم بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D8%B5%D9%85_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "عامر بن ابی البکیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%85%D8%B1_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%84%D8%A8%DA%A9%DB%8C%D8%B1"
  },
  {
    "name": "عامر بن اکوع",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%85%D8%B1_%D8%A8%D9%86_%D8%A7%DA%A9%D9%88%D8%B9"
  },
  {
    "name": "عامر بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%85%D8%B1_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "عامر بن ربیعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%85%D8%B1_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9%DB%81"
  },
  {
    "name": "ابو فہیرہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A7%D9%85%D8%B1_%D8%A8%D9%86_%D9%81%DB%81%DB%8C%D8%B1%DB%81"
  },
  {
    "name": "عباد بن بشر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%A7%D8%AF_%D8%A8%D9%86_%D8%A8%D8%B4%D8%B1"
  },
  {
    "name": "عبادہ بن صامت",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%A7%D8%AF%DB%81_%D8%A8%D9%86_%D8%B5%D8%A7%D9%85%D8%AA"
  },
  {
    "name": "عباد بن قيس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%A7%D8%AF_%D8%A8%D9%86_%D9%82%D9%8A%D8%B3"
  },
  {
    "name": "عباس بن عبدالمطلب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%A7%D8%B3_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%A8"
  },
  {
    "name": "عیاش بن ابی ربیعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%DB%8C%D8%A7%D8%B4_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B1%D8%A8%DB%8C%D8%B9%DB%81"
  },
  {
    "name": "عبد الرحمن بن ابی بکر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A8%DA%A9%D8%B1"
  },
  {
    "name": "عبد الرحمن بن جبر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_%D8%A8%D9%86_%D8%AC%D8%A8%D8%B1"
  },
  {
    "name": "عبدالرحمن بن سمرہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_%D8%A8%D9%86_%D8%B3%D9%85%D8%B1%DB%81"
  },
  {
    "name": "عبدالرحمن بن عوف",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_%D8%A8%D9%86_%D8%B9%D9%88%D9%81"
  },
  {
    "name": "عبد الرحمن بن معاذ بن جبل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_%D8%A8%D9%86_%D9%85%D8%B9%D8%A7%D8%B0_%D8%A8%D9%86_%D8%AC%D8%A8%D9%84"
  },
  {
    "name": "عبد اللہ بن ابی اوفی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%88%D9%81%DB%8C"
  },
  {
    "name": "عبد اللہ بن ابی خولی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%AE%D9%88%D9%84%DB%8C"
  },
  {
    "name": "عبد الله بن ابی قحافہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%D9%87_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D9%82%D8%AD%D8%A7%D9%81%DB%81"
  },
  {
    "name": "عبد اللہ بن ارقم",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D8%B1%D9%82%D9%85"
  },
  {
    "name": "عبد اللہ بن انیس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D9%86%DB%8C%D8%B3"
  },
  {
    "name": "عبد اللہ بن جبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AC%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "عبد اللہ بن جحش",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AC%D8%AD%D8%B4"
  },
  {
    "name": "عبد اللہ بن جعفر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AC%D8%B9%D9%81%D8%B1"
  },
  {
    "name": "عبد اللہ بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "عبد اللہ بن حذافہ سہمی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AD%D8%B0%D8%A7%D9%81%DB%81_%D8%B3%DB%81%D9%85%DB%8C"
  },
  {
    "name": "عبد اللہ بن حمیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%AD%D9%85%DB%8C%D8%B1"
  },
  {
    "name": "عبد اللہ بن رواحہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B1%D9%88%D8%A7%D8%AD%DB%81"
  },
  {
    "name": "عبد اللہ ابن زبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A7%D8%A8%D9%86_%D8%B2%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "عبد اللہ بن سراقہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%D8%B1%D8%A7%D9%82%DB%81"
  },
  {
    "name": "عبد اللہ بن سعید",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%D8%B9%DB%8C%D8%AF"
  },
  {
    "name": "عبد اللہ بن سلام",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%D9%84%D8%A7%D9%85"
  },
  {
    "name": "عبد اللہ بن سلمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%D9%84%D9%85%DB%81"
  },
  {
    "name": "عبد اللہ بن سہل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%DB%81%D9%84"
  },
  {
    "name": "عبد اللہ بن سہیل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B3%DB%81%DB%8C%D9%84"
  },
  {
    "name": "عبد اللہ بن طارق",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B7%D8%A7%D8%B1%D9%82"
  },
  {
    "name": "عبد اللہ بن عبد اللہ بن ابی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C"
  },
  {
    "name": "عبد اللہ بن عمر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1"
  },
  {
    "name": "عبد الله بن مغفل",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%D9%87_%D8%A8%D9%86_%D9%85%D8%BA%D9%81%D9%84"
  },
  {
    "name": "عبد الله بن مخرمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%D9%87_%D8%A8%D9%86_%D9%85%D8%AE%D8%B1%D9%85%DB%81"
  },
  {
    "name": "عبد اللہ بن مسعود",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D9%85%D8%B3%D8%B9%D9%88%D8%AF"
  },
  {
    "name": "عبد اللہ بن مظعون",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D9%85%D8%B8%D8%B9%D9%88%D9%86"
  },
  {
    "name": "عبد اللہ بن عباس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%D8%A7%D8%B3"
  },
  {
    "name": "عبد اللہ بن عبداللہ بن ابی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C"
  },
  {
    "name": "عبد اللہ بن عمر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1"
  },
  {
    "name": "عبد الله بن عمرو بن حرام",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%D9%87_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%AD%D8%B1%D8%A7%D9%85"
  },
  {
    "name": "عبد اللہ بن عمرو بن العاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%D9%84%D8%B9%D8%A7%D8%B5"
  },
  {
    "name": "عبد اللہ ابن زبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%DB%81_%D8%A7%D8%A8%D9%86_%D8%B2%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "عبیدہ ابن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%DB%8C%D8%AF%DB%81_%D8%A7%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "عبید بن اوس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3"
  },
  {
    "name": "عبدیا لیل بن ناشب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%A8%D8%AF%DB%8C%D8%A7_%D9%84%DB%8C%D9%84_%D8%A8%D9%86_%D9%86%D8%A7%D8%B4%D8%A8"
  },
  {
    "name": "عتاب بن اسید",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AA%D8%A7%D8%A8_%D8%A8%D9%86_%D8%A7%D8%B3%DB%8C%D8%AF"
  },
  {
    "name": "عتبہ بن غزوان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AA%D8%A8%DB%81_%D8%A8%D9%86_%D8%BA%D8%B2%D9%88%D8%A7%D9%86"
  },
  {
    "name": "عتبان بن مالك",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AA%D8%A8%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%D9%83"
  },
  {
    "name": "عثمان بن حنیف",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D9%86%DB%8C%D9%81"
  },
  {
    "name": "عثمان بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "عثمان بن عفان",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D9%81%D8%A7%D9%86"
  },
  {
    "name": "عثمان بن مظعون",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D8%B8%D8%B9%D9%88%D9%86"
  },
  {
    "name": "عثمان ابو قحافہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AB%D9%85%D8%A7%D9%86_%D8%A7%D8%A8%D9%88_%D9%82%D8%AD%D8%A7%D9%81%DB%81"
  },
  {
    "name": "عدی بن حاتم",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AF%DB%8C_%D8%A8%D9%86_%D8%AD%D8%A7%D8%AA%D9%85"
  },
  {
    "name": "عدی بن ابو الزغباء",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%AF%DB%8C_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D8%B2%D8%BA%D8%A8%D8%A7%D8%A1"
  },
  {
    "name": "عروہ بارقی",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%B1%D9%88%DB%81_%D8%A8%D8%A7%D8%B1%D9%82%DB%8C"
  },
  {
    "name": "عروہ بن مسعود",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%B1%D9%88%DB%81_%D8%A8%D9%86_%D9%85%D8%B3%D8%B9%D9%88%D8%AF"
  },
  {
    "name": "عروہ بن زبیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%B1%D9%88%DB%81_%D8%A8%D9%86_%D8%B2%D8%A8%DB%8C%D8%B1"
  },
  {
    "name": "عصمہ بن وبرہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D8%B5%D9%85%DB%81_%D8%A8%D9%86_%D9%88%D8%A8%D8%B1%DB%81"
  },
  {
    "name": "عکاشہ بن محصن",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%DA%A9%D8%A7%D8%B4%DB%81_%D8%A8%D9%86_%D9%85%D8%AD%D8%B5%D9%86"
  },
  {
    "name": "عکرمہ بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%DA%A9%D8%B1%D9%85%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "عقبہ بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%82%D8%A8%DB%81_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "عقبہ بن وہب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%82%D8%A8%DB%81_%D8%A8%D9%86_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "عقیل ابن ابی طالب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%82%DB%8C%D9%84_%D8%A7%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8"
  },
  {
    "name": "علی بن ابی طالب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%84%DB%8C_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8"
  },
  {
    "name": "عمار بن یاسر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%A7%D8%B1_%D8%A8%D9%86_%DB%8C%D8%A7%D8%B3%D8%B1"
  },
  {
    "name": "عمارہ بن حزم",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%A7%D8%B1%DB%81_%D8%A8%D9%86_%D8%AD%D8%B2%D9%85"
  },
  {
    "name": "عمران بن حصین",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%D8%B5%DB%8C%D9%86"
  },
  {
    "name": "عمرو بن ابی عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "عمرو بن ایاس",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%DB%8C%D8%A7%D8%B3"
  },
  {
    "name": "عمر بن خطاب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1_%D8%A8%D9%86_%D8%AE%D8%B7%D8%A7%D8%A8"
  },
  {
    "name": "عمرو ابن العاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A7%D8%A8%D9%86_%D8%A7%D9%84%D8%B9%D8%A7%D8%B5"
  },
  {
    "name": "عمرو بن الجموح",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%D9%84%D8%AC%D9%85%D9%88%D8%AD"
  },
  {
    "name": "عمرو بن حارثہ",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB%DB%81&action=edit&redlink=1"
  },
  {
    "name": "عمرو بن حمق",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%AD%D9%85%D9%82"
  },
  {
    "name": "عمرو بن سراقہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%B3%D8%B1%D8%A7%D9%82%DB%81"
  },
  {
    "name": "عمیر بن ابی وقاص",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%DB%8C%D8%B1_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D9%88%D9%82%D8%A7%D8%B5"
  },
  {
    "name": "عمير بن الحمام",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%D9%8A%D8%B1_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D9%85"
  },
  {
    "name": "عمیر بن رئاب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B1%D8%A6%D8%A7%D8%A8"
  },
  {
    "name": "عمیر بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "عمیر بن وہب",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%DB%8C%D8%B1_%D8%A8%D9%86_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "عمیر بن عوف",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%85%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B9%D9%88%D9%81"
  },
  {
    "name": "عوف بن الحارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%88%D9%81_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "عویم بن ساعدہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%D9%88%DB%8C%D9%85_%D8%A8%D9%86_%D8%B3%D8%A7%D8%B9%D8%AF%DB%81"
  },
  {
    "name": "عیاش بن ابی ربیعہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%DB%8C%D8%A7%D8%B4_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B1%D8%A8%DB%8C%D8%B9%DB%81"
  },
  {
    "name": "عیاض بن زہیر",
    "url": "https://ur.wikipedia.org/wiki/%D8%B9%DB%8C%D8%A7%D8%B6_%D8%A8%D9%86_%D8%B2%DB%81%DB%8C%D8%B1"
  },
  {
    "name": "غضیف بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D8%BA%D8%B6%DB%8C%D9%81_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "غیلان بن سلمہ",
    "url": "https://ur.wikipedia.org/wiki/%D8%BA%DB%8C%D9%84%D8%A7%D9%86_%D8%A8%D9%86_%D8%B3%D9%84%D9%85%DB%81"
  },
  {
    "name": "فاطمۃ الزھراء",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%A7%D8%B7%D9%85%DB%83_%D8%A7%D9%84%D8%B2%DA%BE%D8%B1%D8%A7%D8%A1"
  },
  {
    "name": "فاطمہ بنت خطاب",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%AE%D8%B7%D8%A7%D8%A8"
  },
  {
    "name": "فاطمہ بنت الاسود",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%84%D8%A7%D8%B3%D9%88%D8%AF&action=edit&redlink=1"
  },
  {
    "name": "فاطمہ بنت الولید بن عبد شمس",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%84%D9%88%D9%84%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%B4%D9%85%D8%B3&action=edit&redlink=1"
  },
  {
    "name": "فاطمہ بنت الولید بن المغیرہ",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%84%D9%88%D9%84%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D8%BA%DB%8C%D8%B1%DB%81&action=edit&redlink=1"
  },
  {
    "name": "فاطمہ بنت الزبیر",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%84%D8%B2%D8%A8%DB%8C%D8%B1&action=edit&redlink=1"
  },
  {
    "name": "فاطمہ بنت اسد",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D8%B3%D8%AF"
  },
  {
    "name": "فراس بن نضر",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%B1%D8%A7%D8%B3_%D8%A8%D9%86_%D9%86%D8%B6%D8%B1"
  },
  {
    "name": "فضالہ بن عبید",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%B6%D8%A7%D9%84%DB%81_%D8%A8%D9%86_%D8%B9%D8%A8%DB%8C%D8%AF"
  },
  {
    "name": "فضل ابن عباس",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%D8%B6%D9%84_%D8%A7%D8%A8%D9%86_%D8%B9%D8%A8%D8%A7%D8%B3"
  },
  {
    "name": "فیروز الدیلمی",
    "url": "https://ur.wikipedia.org/wiki/%D9%81%DB%8C%D8%B1%D9%88%D8%B2_%D8%A7%D9%84%D8%AF%DB%8C%D9%84%D9%85%DB%8C"
  },
  {
    "name": "قتادہ بن نعمان",
    "url": "https://ur.wikipedia.org/wiki/%D9%82%D8%AA%D8%A7%D8%AF%DB%81_%D8%A8%D9%86_%D9%86%D8%B9%D9%85%D8%A7%D9%86"
  },
  {
    "name": "قدامہ بن مظعون",
    "url": "https://ur.wikipedia.org/wiki/%D9%82%D8%AF%D8%A7%D9%85%DB%81_%D8%A8%D9%86_%D9%85%D8%B8%D8%B9%D9%88%D9%86"
  },
  {
    "name": "قطبہ بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%D9%82%D8%B7%D8%A8%DB%81_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "قیس بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D9%82%DB%8C%D8%B3_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "قیس بن سکن",
    "url": "https://ur.wikipedia.org/wiki/%D9%82%DB%8C%D8%B3_%D8%A8%D9%86_%D8%B3%DA%A9%D9%86"
  },
  {
    "name": "کثیر بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%AB%DB%8C%D8%B1_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "کعب بن جماز",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%B9%D8%A8_%D8%A8%D9%86_%D8%AC%D9%85%D8%A7%D8%B2"
  },
  {
    "name": "کعب بن زہیر",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%B9%D8%A8_%D8%A8%D9%86_%D8%B2%DB%81%DB%8C%D8%B1"
  },
  {
    "name": "کعب بن زید",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%B9%D8%A8_%D8%A8%D9%86_%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "کعب بن عجرہ",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%B9%D8%A8_%D8%A8%D9%86_%D8%B9%D8%AC%D8%B1%DB%81"
  },
  {
    "name": "کعب بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D8%B9%D8%A8_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "کلثوم بن ہدم",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D9%84%D8%AB%D9%88%D9%85_%D8%A8%D9%86_%DB%81%D8%AF%D9%85"
  },
  {
    "name": "کناز بن حصین",
    "url": "https://ur.wikipedia.org/wiki/%DA%A9%D9%86%D8%A7%D8%B2_%D8%A8%D9%86_%D8%AD%D8%B5%DB%8C%D9%86"
  },
  {
    "name": "لبابہ بنت حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%84%D8%A8%D8%A7%D8%A8%DB%81_%D8%A8%D9%86%D8%AA_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "لبید بن ربیعہ عامری",
    "url": "https://ur.wikipedia.org/wiki/%D9%84%D8%A8%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9%DB%81_%D8%B9%D8%A7%D9%85%D8%B1%DB%8C"
  },
  {
    "name": "لبینہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%84%D8%A8%DB%8C%D9%86%DB%81"
  },
  {
    "name": "لقیط بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%D9%84%D9%82%DB%8C%D8%B7_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "لیلی بنت منہل",
    "url": "https://ur.wikipedia.org/w/index.php?title=%D9%84%DB%8C%D9%84%DB%8C_%D8%A8%D9%86%D8%AA_%D9%85%D9%86%DB%81%D9%84&action=edit&redlink=1"
  },
  {
    "name": "مالک بن ابو خولیٰ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D8%AE%D9%88%D9%84%DB%8C%D9%B0"
  },
  {
    "name": "مالک بن امیہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%A7%D9%85%DB%8C%DB%81"
  },
  {
    "name": "مالک بن انس",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%A7%D9%86%D8%B3"
  },
  {
    "name": "مالک بن رافع",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%B1%D8%A7%D9%81%D8%B9"
  },
  {
    "name": "مالک بن ربيعہ بن البدن",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%B1%D8%A8%D9%8A%D8%B9%DB%81_%D8%A8%D9%86_%D8%A7%D9%84%D8%A8%D8%AF%D9%86"
  },
  {
    "name": "مالک بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "مالک بن عمیلہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D9%84%DB%81"
  },
  {
    "name": "مالک بن قدامہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%A8%D9%86_%D9%82%D8%AF%D8%A7%D9%85%DB%81"
  },
  {
    "name": "مالک دینار",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%DA%A9_%D8%AF%DB%8C%D9%86%D8%A7%D8%B1"
  },
  {
    "name": "ماریہ قبطیہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A7%D8%B1%DB%8C%DB%81_%D9%82%D8%A8%D8%B7%DB%8C%DB%81"
  },
  {
    "name": "مبشر بن عبد المنذر",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%A8%D8%B4%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%85%D9%86%D8%B0%D8%B1"
  },
  {
    "name": "مجذر بن ذیاد",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%AC%D8%B0%D8%B1_%D8%A8%D9%86_%D8%B0%DB%8C%D8%A7%D8%AF"
  },
  {
    "name": "محرز بن نضلہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%AD%D8%B1%D8%B2_%D8%A8%D9%86_%D9%86%D8%B6%D9%84%DB%81"
  },
  {
    "name": "محمد بن ابی بکر",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%AD%D9%85%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%A8%DA%A9%D8%B1"
  },
  {
    "name": "محمد بن مسلمہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%AD%D9%85%D8%AF_%D8%A8%D9%86_%D9%85%D8%B3%D9%84%D9%85%DB%81"
  },
  {
    "name": "مدلج بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%AF%D9%84%D8%AC_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "مرارہ بن ربيع",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B1%D8%A7%D8%B1%DB%81_%D8%A8%D9%86_%D8%B1%D8%A8%D9%8A%D8%B9"
  },
  {
    "name": "مرثد بن ابو مرثد",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B1%D8%AB%D8%AF_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D9%85%D8%B1%D8%AB%D8%AF"
  },
  {
    "name": "مروان بن حکم",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B1%D9%88%D8%A7%D9%86_%D8%A8%D9%86_%D8%AD%DA%A9%D9%85"
  },
  {
    "name": "مسطح بن اثاثہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B3%D8%B7%D8%AD_%D8%A8%D9%86_%D8%A7%D8%AB%D8%A7%D8%AB%DB%81"
  },
  {
    "name": "مسعود بن اوس",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B3%D8%B9%D9%88%D8%AF_%D8%A8%D9%86_%D8%A7%D9%88%D8%B3"
  },
  {
    "name": "مسعود بن ربیع",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B3%D8%B9%D9%88%D8%AF_%D8%A8%D9%86_%D8%B1%D8%A8%DB%8C%D8%B9"
  },
  {
    "name": "مصعب بن عمیر",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B5%D8%B9%D8%A8_%D8%A8%D9%86_%D8%B9%D9%85%DB%8C%D8%B1"
  },
  {
    "name": "مقداد بن اسود",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%82%D8%AF%D8%A7%D8%AF_%D8%A8%D9%86_%D8%A7%D8%B3%D9%88%D8%AF"
  },
  {
    "name": "معاذ بن جبل",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%A7%D8%B0_%D8%A8%D9%86_%D8%AC%D8%A8%D9%84"
  },
  {
    "name": "معاذ بن عمرو بن جموح",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%A7%D8%B0_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%AC%D9%85%D9%88%D8%AD"
  },
  {
    "name": "معاویہ بن ابو سفیان",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%A7%D9%88%DB%8C%DB%81_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D8%B3%D9%81%DB%8C%D8%A7%D9%86"
  },
  {
    "name": "معبد بن وهب",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%A8%D8%AF_%D8%A8%D9%86_%D9%88%D9%87%D8%A8"
  },
  {
    "name": "معتب بن عبید",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%AA%D8%A8_%D8%A8%D9%86_%D8%B9%D8%A8%DB%8C%D8%AF"
  },
  {
    "name": "معتب بن قشیر",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D8%AA%D8%A8_%D8%A8%D9%86_%D9%82%D8%B4%DB%8C%D8%B1"
  },
  {
    "name": "معقل بن المنذر",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%82%D9%84_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D9%86%D8%B0%D8%B1"
  },
  {
    "name": "معقل بن یسار",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%82%D9%84_%D8%A8%D9%86_%DB%8C%D8%B3%D8%A7%D8%B1"
  },
  {
    "name": "معمر بن ابی سرح",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%85%D8%B1_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B3%D8%B1%D8%AD"
  },
  {
    "name": "معمر بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%85%D8%B1_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "معن بن عدی",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%86_%D8%A8%D9%86_%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "معن بن یزید",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%86_%D8%A8%D9%86_%DB%8C%D8%B2%DB%8C%D8%AF"
  },
  {
    "name": "معوذ بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%88%D8%B0_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "معوذ بن عمرو بن الجموح",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%D9%88%D8%B0_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88_%D8%A8%D9%86_%D8%A7%D9%84%D8%AC%D9%85%D9%88%D8%AD"
  },
  {
    "name": "معیقیب بن ابی فاطمہ دوسی",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%B9%DB%8C%D9%82%DB%8C%D8%A8_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D9%81%D8%A7%D8%B7%D9%85%DB%81_%D8%AF%D9%88%D8%B3%DB%8C"
  },
  {
    "name": "مغیرہ ابن شعبہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D8%BA%DB%8C%D8%B1%DB%81_%D8%A7%D8%A8%D9%86_%D8%B4%D8%B9%D8%A8%DB%81"
  },
  {
    "name": "مقداد بن اسود",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%82%D8%AF%D8%A7%D8%AF_%D8%A8%D9%86_%D8%A7%D8%B3%D9%88%D8%AF"
  },
  {
    "name": "ملیل بن وبرہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%84%DB%8C%D9%84_%D8%A8%D9%86_%D9%88%D8%A8%D8%B1%DB%81"
  },
  {
    "name": "منذر بن عرفجہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%86%D8%B0%D8%B1_%D8%A8%D9%86_%D8%B9%D8%B1%D9%81%D8%AC%DB%81"
  },
  {
    "name": "منذر بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%86%D8%B0%D8%B1_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "منذر بن قدامہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%86%D8%B0%D8%B1_%D8%A8%D9%86_%D9%82%D8%AF%D8%A7%D9%85%DB%81"
  },
  {
    "name": "منذر بن محمد",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%D9%86%D8%B0%D8%B1_%D8%A8%D9%86_%D9%85%D8%AD%D9%85%D8%AF"
  },
  {
    "name": "مہجع بن صالح",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%DB%81%D8%AC%D8%B9_%D8%A8%D9%86_%D8%B5%D8%A7%D9%84%D8%AD"
  },
  {
    "name": "میمونہ بنت حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%85%DB%8C%D9%85%D9%88%D9%86%DB%81_%D8%A8%D9%86%D8%AA_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "نائلہ بنت الفرافصہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%A7%D8%A6%D9%84%DB%81_%D8%A8%D9%86%D8%AA_%D8%A7%D9%84%D9%81%D8%B1%D8%A7%D9%81%D8%B5%DB%81"
  },
  {
    "name": "نابغہ جعدی",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%A7%D8%A8%D8%BA%DB%81_%D8%AC%D8%B9%D8%AF%DB%8C"
  },
  {
    "name": "نحات بن ثعلبہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%AD%D8%A7%D8%AA_%D8%A8%D9%86_%D8%AB%D8%B9%D9%84%D8%A8%DB%81"
  },
  {
    "name": "نصر بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B5%D8%B1_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "نعمان بن ابو خزمہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%A7%D8%A8%D9%88_%D8%AE%D8%B2%D9%85%DB%81"
  },
  {
    "name": "نعمان بن بشیر",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%A8%D8%B4%DB%8C%D8%B1"
  },
  {
    "name": "نعمان بن سنان",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B3%D9%86%D8%A7%D9%86"
  },
  {
    "name": "نعمان بن عبد عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "نعمان بن عصر",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D8%B5%D8%B1"
  },
  {
    "name": "نعمان بن قوقل",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D9%82%D9%88%D9%82%D9%84"
  },
  {
    "name": "نعمان بن مالک",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D8%A7%D9%84%DA%A9"
  },
  {
    "name": "نعمان بن مقرن",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D9%85%D9%82%D8%B1%D9%86"
  },
  {
    "name": "نعیم بن مسعود",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%DB%8C%D9%85_%D8%A8%D9%86_%D9%85%D8%B3%D8%B9%D9%88%D8%AF"
  },
  {
    "name": "نعیمان بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D8%B9%DB%8C%D9%85%D8%A7%D9%86_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "نوفل بن ثعلبہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D9%88%D9%81%D9%84_%D8%A8%D9%86_%D8%AB%D8%B9%D9%84%D8%A8%DB%81"
  },
  {
    "name": "نوفل بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%D9%86%D9%88%D9%81%D9%84_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "واقد بن عبد الله",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D8%A7%D9%82%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D9%84%D9%87"
  },
  {
    "name": "ودفہ بن اياس",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D8%AF%D9%81%DB%81_%D8%A8%D9%86_%D8%A7%D9%8A%D8%A7%D8%B3"
  },
  {
    "name": "وحشی بن حرب",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D8%AD%D8%B4%DB%8C_%D8%A8%D9%86_%D8%AD%D8%B1%D8%A8"
  },
  {
    "name": "ودیعہ بن عمرو",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D8%AF%DB%8C%D8%B9%DB%81_%D8%A8%D9%86_%D8%B9%D9%85%D8%B1%D9%88"
  },
  {
    "name": "ولید ابن الولید",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D9%84%DB%8C%D8%AF_%D8%A7%D8%A8%D9%86_%D8%A7%D9%84%D9%88%D9%84%DB%8C%D8%AF"
  },
  {
    "name": "ولید بن عقبہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%D9%84%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B9%D9%82%D8%A8%DB%81"
  },
  {
    "name": "وہب بن ابی سرح",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%DB%81%D8%A8_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B3%D8%B1%D8%AD"
  },
  {
    "name": "وہب بن سعد",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%DB%81%D8%A8_%D8%A8%D9%86_%D8%B3%D8%B9%D8%AF"
  },
  {
    "name": "وہب بن كلدہ",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%DB%81%D8%A8_%D8%A8%D9%86_%D9%83%D9%84%D8%AF%DB%81"
  },
  {
    "name": "وہب بن محصن",
    "url": "https://ur.wikipedia.org/wiki/%D9%88%DB%81%D8%A8_%D8%A8%D9%86_%D9%85%D8%AD%D8%B5%D9%86"
  },
  {
    "name": "ہاشم بن عتبہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D8%A7%D8%B4%D9%85_%D8%A8%D9%86_%D8%B9%D8%AA%D8%A8%DB%81"
  },
  {
    "name": "ہالہ بنت وہب",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D8%A7%D9%84%DB%81_%D8%A8%D9%86%D8%AA_%D9%88%DB%81%D8%A8"
  },
  {
    "name": "ہانی بن نیار",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D8%A7%D9%86%DB%8C_%D8%A8%D9%86_%D9%86%DB%8C%D8%A7%D8%B1"
  },
  {
    "name": "ہبیل بن وبرہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D8%A8%DB%8C%D9%84_%D8%A8%D9%86_%D9%88%D8%A8%D8%B1%DB%81"
  },
  {
    "name": "ہشام بن عاص",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D8%B4%D8%A7%D9%85_%D8%A8%D9%86_%D8%B9%D8%A7%D8%B5"
  },
  {
    "name": "ہلال بن المعلی",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%84%D8%A7%D9%84_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D8%B9%D9%84%DB%8C"
  },
  {
    "name": "ہلال بن ابی خولی",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%84%D8%A7%D9%84_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%AE%D9%88%D9%84%DB%8C"
  },
  {
    "name": "ہلال بن امیہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%84%D8%A7%D9%84_%D8%A8%D9%86_%D8%A7%D9%85%DB%8C%DB%81"
  },
  {
    "name": "ہمام بن حارث",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%85%D8%A7%D9%85_%D8%A8%D9%86_%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "ہند بنت ابی امیہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%86%D8%AF_%D8%A8%D9%86%D8%AA_%D8%A7%D8%A8%DB%8C_%D8%A7%D9%85%DB%8C%DB%81"
  },
  {
    "name": "ہند بنت عتبہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%86%D8%AF_%D8%A8%D9%86%D8%AA_%D8%B9%D8%AA%D8%A8%DB%81"
  },
  {
    "name": "ہند بنت عوف بن زہیر",
    "url": "https://ur.wikipedia.org/wiki/%DB%81%D9%86%D8%AF_%D8%A8%D9%86%D8%AA_%D8%B9%D9%88%D9%81_%D8%A8%D9%86_%D8%B2%DB%81%DB%8C%D8%B1"
  },
  {
    "name": "یاسر بن عامر",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%A7%D8%B3%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1"
  },
  {
    "name": "یزید بن اخنس",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D8%AE%D9%86%D8%B3"
  },
  {
    "name": "یزید بن الحارث",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB"
  },
  {
    "name": "يزيد بن المنذر",
    "url": "https://ur.wikipedia.org/wiki/%D9%8A%D8%B2%D9%8A%D8%AF_%D8%A8%D9%86_%D8%A7%D9%84%D9%85%D9%86%D8%B0%D8%B1"
  },
  {
    "name": "یزید بن ثابت",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AB%D8%A7%D8%A8%D8%AA"
  },
  {
    "name": "یزید بن ثعلبہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%AB%D8%B9%D9%84%D8%A8%DB%81"
  },
  {
    "name": "يزيد بن رقيش",
    "url": "https://ur.wikipedia.org/wiki/%D9%8A%D8%B2%D9%8A%D8%AF_%D8%A8%D9%86_%D8%B1%D9%82%D9%8A%D8%B4"
  },
  {
    "name": "یزید بن زمعہ",
    "url": "https://ur.wikipedia.org/wiki/%DB%8C%D8%B2%DB%8C%D8%AF_%D8%A8%D9%86_%D8%B2%D9%85%D8%B9%DB%81"
  },
  {
    "name": "يزيد بن عامر انصاری",
    "url": "https://ur.wikipedia.org/wiki/%D9%8A%D8%B2%D9%8A%D8%AF_%D8%A8%D9%86_%D8%B9%D8%A7%D9%85%D8%B1_%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C"
  }
  // Add more names...
]

export default function SahabaSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [language, setLanguage] = useState<"english" | "urdu">("english")
  const [filteredNames, setFilteredNames] = useState<SahabaName[]>(englishSahabaNames)

  const handleSearch = (value: string) => {
    const names = language === "english" ? englishSahabaNames : urduSahabaNames
    const filtered = names.filter((sahaba) => sahaba.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredNames(filtered)
  }

  const handleLanguageChange = (newLanguage: "english" | "urdu") => {
    setLanguage(newLanguage)
    setSearchTerm("")
    setFilteredNames(newLanguage === "english" ? englishSahabaNames : urduSahabaNames)
  }

  return (
    <>
    <Head>
        <title>SearchAyah: Search The Sahaba</title>
        <meta name="description" content="Search any Sahaba using the searchbar and it will guide you to the wikipedia of each sahaba by the names" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching Sahaba, Finding Sahaba, Easy Sahaba, learn Sahaba, Companions of prophet(SAW), Companions, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search about Companions" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching word will appear on the suggestion making it easy for the user to get hadith in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/sahaba" />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleSearch(e.target.value)
          }}
          placeholder="Search Name..."
          className="w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-sm sm:text-base mb-4"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
        <label className="text-slate-800">Translation Languages</label>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as "english" | "urdu")}
          className="px-4 py-2 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-slate-800"
        >
          <option value="english">English</option>
          <option value="urdu">اردو</option>
        </select>
      </div>

      <ul className={`space-y-4 mt-8 ${language === "urdu" ? "text-right" : ""}`}>
        {filteredNames.map((sahaba, index) => (
          <li key={index} className="list-none border-2 border-[#67b2b4] rounded-2xl text-center font-bold text-[1.3rem] p-4 bg-transparent tracking-wider cursor-pointer text-[#164363] transition duration-500 hover:bg-[#67b2b480] hover:border-[#67b2b480]">
            <a
              href={sahaba.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-800 hover:text-[#374a4d] transition-colors"
            >
              {sahaba.name}
              <sup className="mx-2">{language === "urdu" ? "رضي الله عنه" : "R.A"}</sup>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

