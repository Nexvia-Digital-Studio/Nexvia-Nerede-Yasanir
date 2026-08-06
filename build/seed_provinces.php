<?php
/**
 * İller tablosunu seed eder.
 * Kaynak: TÜİK ADNKS 2023 nüfusu (https://data.tuik.gov.tr).
 * Koordinatlar OpenStreetMap il merkezleri.
 * Çalıştırma: php build/seed_provinces.php
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

// id, ad, lat, lng, bolge, deniz, nüfus(TÜİK 2023)
$provinces = [
    [1,'Adana',37.0000,35.3213,'Akdeniz',0,2274167],
    [2,'Adıyaman',37.7644,38.2763,'Güneydoğu',0,632733],
    [3,'Afyonkarahisar',38.7507,30.5456,'Ege',0,736891],
    [4,'Ağrı',39.7191,43.0503,'Doğu Anadolu',0,511448],
    [5,'Amasya',40.6499,35.8353,'Karadeniz',0,346222],
    [6,'Ankara',39.9208,32.8541,'İç Anadolu',0,5747325],
    [7,'Antalya',36.8969,30.7133,'Akdeniz',1,2619332],
    [8,'Artvin',41.1828,41.8183,'Karadeniz',0,168162],
    [9,'Aydın',37.8560,27.8416,'Ege',0,1148285],
    [10,'Balıkesir',39.6484,27.8826,'Marmara',0,1261090],
    [11,'Bilecik',40.1426,29.9793,'Marmara',0,228357],
    [12,'Bingöl',38.8847,40.4986,'Doğu Anadolu',0,282693],
    [13,'Bitlis',38.4011,42.1080,'Doğu Anadolu',0,353988],
    [14,'Bolu',40.7392,31.6094,'Karadeniz',0,323080],
    [15,'Burdur',37.7203,30.2908,'Akdeniz',0,270544],
    [16,'Bursa',40.1885,29.0610,'Marmara',0,3194192],
    [17,'Çanakkale',40.1553,26.4142,'Marmara',1,542157],
    [18,'Çankırı',40.6013,33.6134,'İç Anadolu',0,194425],
    [19,'Çorum',40.5499,34.9533,'Karadeniz',0,532242],
    [20,'Denizli',37.7765,29.0864,'Ege',0,1052820],
    [21,'Diyarbakır',37.9144,40.2306,'Güneydoğu',0,1796336],
    [22,'Edirne',41.6764,26.5559,'Marmara',0,410217],
    [23,'Elazığ',38.6810,39.2264,'Doğu Anadolu',0,585987],
    [24,'Erzincan',39.7464,39.4914,'Doğu Anadolu',0,234331],
    [25,'Erzurum',39.9043,41.2679,'Doğu Anadolu',0,740149],
    [26,'Eskişehir',39.7767,30.5206,'İç Anadolu',0,898369],
    [27,'Gaziantep',37.0662,37.3833,'Güneydoğu',0,2131132],
    [28,'Giresun',40.9128,38.3895,'Karadeniz',1,441434],
    [29,'Gümüşhane',40.4386,39.5086,'Karadeniz',0,143875],
    [30,'Hakkari',37.5744,43.7408,'Doğu Anadolu',0,284027],
    [31,'Hatay',36.2066,36.1572,'Akdeniz',0,1670612],
    [32,'Isparta',37.7648,30.5566,'Akdeniz',0,440207],
    [33,'Mersin',36.8121,34.6415,'Akdeniz',1,1889031],
    [34,'İstanbul',41.0082,28.9784,'Marmara',1,15655924],
    [35,'İzmir',38.4237,27.1428,'Ege',1,4467199],
    [36,'Kars',40.6013,43.0975,'Doğu Anadolu',0,281148],
    [37,'Kastamonu',41.3887,33.7827,'Karadeniz',0,381512],
    [38,'Kayseri',38.7333,35.4853,'İç Anadolu',0,1449059],
    [39,'Kırklareli',41.7333,27.2167,'Marmara',0,366551],
    [40,'Kırşehir',39.1425,34.1709,'İç Anadolu',0,244417],
    [41,'Kocaeli',40.8533,29.8815,'Marmara',1,2023429],
    [42,'Konya',37.8746,32.4932,'İç Anadolu',0,2303560],
    [43,'Kütahya',39.4242,29.9833,'Ege',0,581280],
    [44,'Malatya',38.3552,38.3095,'Doğu Anadolu',0,812438],
    [45,'Manisa',38.6191,27.4289,'Ege',0,1468727],
    [46,'Kahramanmaraş',37.5858,36.9371,'Akdeniz',0,1175253],
    [47,'Mardin',37.3122,40.7340,'Güneydoğu',0,878491],
    [48,'Muğla',37.2154,28.3636,'Ege',0,1002305],
    [49,'Muş',38.7432,41.5065,'Doğu Anadolu',0,399037],
    [50,'Nevşehir',38.6939,34.6857,'İç Anadolu',0,316536],
    [51,'Niğde',37.9667,34.6833,'İç Anadolu',0,351389],
    [52,'Ordu',40.9839,37.8797,'Karadeniz',1,758094],
    [53,'Rize',41.0201,40.5234,'Karadeniz',1,348116],
    [54,'Sakarya',40.7569,30.3781,'Marmara',1,1077137],
    [55,'Samsun',41.2867,36.3300,'Karadeniz',1,1362177],
    [56,'Siirt',37.9333,41.9417,'Güneydoğu',0,329663],
    [57,'Sinop',42.0231,35.1531,'Karadeniz',1,217553],
    [58,'Sivas',39.7503,37.0156,'İç Anadolu',0,636850],
    [59,'Tekirdağ',40.9833,27.5167,'Marmara',1,1104366],
    [60,'Tokat',40.3167,36.5500,'Karadeniz',0,596454],
    [61,'Trabzon',41.0050,39.7228,'Karadeniz',1,819429],
    [62,'Tunceli',39.1079,39.5401,'Doğu Anadolu',0,84511],
    [63,'Şanlıurfa',37.1674,38.7955,'Güneydoğu',0,2150963],
    [64,'Uşak',38.6742,29.4059,'Ege',0,371656],
    [65,'Van',38.4942,43.3800,'Doğu Anadolu',0,1132287],
    [66,'Yozgat',39.8181,34.8147,'İç Anadolu',0,397321],
    [67,'Zonguldak',41.4564,31.7987,'Karadeniz',1,590826],
    [68,'Aksaray',38.3687,34.0370,'İç Anadolu',0,429729],
    [69,'Bayburt',40.2552,40.2254,'Karadeniz',0,84925],
    [70,'Karaman',37.1759,33.2287,'İç Anadolu',0,264330],
    [71,'Kırıkkale',39.8468,33.5153,'İç Anadolu',0,289776],
    [72,'Batman',37.8812,41.1351,'Güneydoğu',0,633810],
    [73,'Şırnak',37.5187,42.4537,'Güneydoğu',0,245629],
    [74,'Bartın',41.6358,32.3375,'Karadeniz',1,194521],
    [75,'Ardahan',41.1105,42.7017,'Doğu Anadolu',0,91477],
    [76,'Iğdır',39.9237,44.0450,'Doğu Anadolu',0,196839],
    [77,'Yalova',40.6500,29.2667,'Marmara',1,265592],
    [78,'Karabük',41.2061,32.6204,'Karadeniz',0,240035],
    [79,'Kilis',36.7184,37.1212,'Güneydoğu',0,147023],
    [80,'Osmaniye',37.0742,36.2478,'Akdeniz',0,566359],
    [81,'Düzce',40.8438,31.1565,'Karadeniz',0,405128],
];

$pdo = db();
$pdo->beginTransaction();
$sql = 'INSERT INTO iller (id, ad, lat, lng, bolge, deniz, nufus) VALUES (?,?,?,?,?,?,?)';
$st = $pdo->prepare($sql);
foreach ($provinces as $p) {
    $st->execute($p);
}
$pdo->commit();
echo "✓ " . count($provinces) . " il seed edildi.\n";
echo "  Toplam nüfus: " . array_sum(array_column($provinces, 6)) . "\n";
