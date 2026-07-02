const AAPD_URL = "https://www.aapd.org/research/oral-health-policies--recommendations/";
const AAPD_LINK = `<a href="${AAPD_URL}" target="_blank" rel="noopener">AAPD kılavuzu</a>`;

// ponytail: every calculator on this site fills the same two elements
// (#textResults, #textMath) and reveals the same #results box, so that
// three-line dance is centralized here instead of repeated in every branch.
function showResult(resultHtml, mathHtml) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('textResults').innerHTML = resultHtml;
    document.getElementById('textMath').innerHTML = mathHtml;
}

// mg/kg dose rounded up to a whole mg, capped at a max (single-dose or daily ceiling).
function capped(value, max) {
    return Math.ceil(Math.min(value, max));
}

// ponytail: `+''` coerces an empty field to 0, not NaN, so a blank input
// silently produced a "0kg patient" dose instead of an error. Check the
// raw string first.
function isBlank(id) {
    return document.getElementById(id).value.trim() === '';
}

function doAntibioticCalc() {
    if (isBlank('idAgeNum') || isBlank('idWeightNum')) {
        showResult('lütfen yaş ve kilo bilgilerini giriniz.', '');
        return;
    }
    var ptAgeNum = +document.getElementById('idAgeNum').value;
    var ptWeight = +document.getElementById('idWeightNum').value;
    var antibioticMed = document.getElementById('idAntibioticMed').value;

    function calcAmox() {
        if (ptAgeNum > 0.25 && ptWeight < 40) {
            var dailyMinEight = ptWeight * 20, dailyMaxEight = ptWeight * 40;
            var divMinDoseEight = capped(dailyMinEight / 3, 500);
            var divMaxDoseEight = capped(dailyMaxEight / 3, 500);
            var dailyMinTwelve = ptWeight * 25, dailyMaxTwelve = ptWeight * 45;
            var divMinDoseTwelve = capped(dailyMinTwelve / 2, 875);
            var divMaxDoseTwelve = capped(dailyMaxTwelve / 2, 875);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                Her 8 saatte bir <b>${divMinDoseEight}-${divMaxDoseEight}mg/doz</b> (maksimum tek doz 500mg)
                <br> VEYA <br>
                Her 12 saatte bir <b>${divMinDoseTwelve}-${divMaxDoseTwelve}mg/doz</b> (maksimum tek doz 875mg).`,
                `Hesaplama:
                    <br>${ptWeight}kg * 20-40mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük ${Math.ceil(dailyMinEight)}-${Math.ceil(dailyMaxEight)}mg
                    <br>/ 3 doz, tek doz maksimum 500mg = 8 saatte bir ${divMinDoseEight}-${divMaxDoseEight}mg
                    <br>VEYA
                    <br>${ptWeight}kg * 25-45mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük ${Math.ceil(dailyMinTwelve)}-${Math.ceil(dailyMaxTwelve)}mg
                    <br>/ 2 doz, tek doz maksimum 875mg = 12 saatte bir ${divMinDoseTwelve}-${divMaxDoseTwelve}mg`);
        } else if (ptWeight >= 40 || ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 8 saatte bir <b>250-500mg</b>
                <br> VEYA <br>
                12 saatte bir <b>500-875mg</b>`,
                'Hesaplama: <br> Yetişkin dozu kullanılmıştır');
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcAmoxCP() {
        if (ptAgeNum > 0.25 && ptWeight <= 40) {
            var minDoseTwelve = capped(ptWeight * 25, 1750);
            var maxDoseTwelve = capped(ptWeight * 45, 1750);
            var divMinDoseTwelve = Math.ceil(minDoseTwelve / 2);
            var divMaxDoseTwelve = Math.ceil(maxDoseTwelve / 2);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için,
                <b>${antibioticMed}</b> kullanımı:
                <br> Toplamda <b>${minDoseTwelve}-${maxDoseTwelve}mg/gün</b> olacak şekilde, her 12 saatte bir <b>${divMinDoseTwelve}-${divMaxDoseTwelve}mg/doz</b>
                (maksimum tek doz 875 mg; maksimum günlük doz 1750 mg)<br>
                (klavulonik asit sebebiyle süspansiyon veya çiğneme tableti önerilir).`,
                `Hesaplama:
                    <br>${ptWeight}kg * 25-45mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük ${minDoseTwelve}-${maxDoseTwelve}mg
                    <br>${minDoseTwelve}-${maxDoseTwelve}mg/gün / 2 = 12 saatte bir ${divMinDoseTwelve}-${divMaxDoseTwelve}mg`);
        } else if (ptWeight > 40 || ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında <b>${ptWeight}</b>, kg bir hasta için, <b>${antibioticMed}</b> kullanımı:
                <br> 12 saatte bir <b>500-875mg</b> (tablet önerilir).`,
                "Hesaplama: <br> Yetişkin dozu kullanılmıştır");
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcAzithro() {
        if (ptAgeNum < 18) {
            var minDoseOne = capped(ptWeight * 10, 500);
            var maxDoseOne = capped(ptWeight * 12, 500);
            var minDoseTwo = capped(ptWeight * 5, 250);
            var maxDoseTwo = capped(ptWeight * 6, 250);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                1.gün tek doz <b>${minDoseOne}-${maxDoseOne}mg</b>, (maksimum 500mg/gün), <br>takibinde tedavinin kalanı için (2-5 gün) boyunca günlük tek doz <b>${minDoseTwo}-${maxDoseTwo}mg</b>`,
                `Hesaplama:
                    <br>1. gün için: ${ptWeight}kg * 10-12mg/kg/doz (tek doz, çocuk/adolesanlar için) = ${minDoseOne}-${maxDoseOne}mg
                    <br>2-5. gün için: ${ptWeight}kg * 5-6mg/kg/gün (günde tek doz, çocuk/adolesanlar için) = ${minDoseTwo}-${maxDoseTwo}mg`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                1.gün tek doz <b>500mg</b>
                <br> takibinde tedavinin kalanı için (2-5 gün) boyunca günlük tek doz <b>250mg</b>`,
                "Hesaplama: <br>Yetişkin dozu kullanılmıştır");
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcCepha() {
        if (ptAgeNum < 18) {
            var minDoseOne = capped(ptWeight * 25, 2000);
            var maxDoseOne = capped(ptWeight * 50, 2000);
            var minDoseTwo = capped(ptWeight * 75, 4000);
            var maxDoseTwo = capped(ptWeight * 100, 4000);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                    Hafif ve orta derece enfeksiyonlar için, 4-2 doza bölerek 6-12 saatte bir <b>${minDoseOne}-${maxDoseOne}mg/gün</b> (maksimum 2g/gün). <br>
                    Ciddi enfeksiyonlar için, 4-3 doza bölerek 6-8 saatte bir <b>${minDoseTwo}-${maxDoseTwo}mg/gün</b> (maksimum 4g/gün).`,
                `Hesaplama:
                    <br>Yaş <18 ise hafif-orta enfeksiyonlarda: ${ptWeight}kg * 25-50mg/kg/gün = ${minDoseOne}-${maxDoseOne}mg/gün
                    <br>Yaş <18 ise ciddi enfeksiyonlarda: ${ptWeight}kg * 75-100mg/kg/gün (>6 ay ve <16 yaş için) = ${minDoseTwo}-${maxDoseTwo}mg/gün`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 6 saatte bir <b>250-1000mg</b>  (maksimum 4g/gün).`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcCalr() {
        if (ptAgeNum < 18) {
            var doseDay = capped(ptWeight * 15, 1000);
            var doseSingle = Math.ceil(doseDay / 2);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                <b>${doseDay}mg/gün</b> dozlara bölünerek (<b>${doseSingle}mg/doz</b>) 12 saatte bir (maksimum 500mg/doz).`,
                `Hesaplama:
                    <br>${ptWeight}kg * 15mg/kg/gün = ${doseDay}mg/gün
                    <br>${doseDay}mg/gün / 2 = 12 saatte bir ${doseSingle}mg`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 12 saatte bir <b>500mg</b>`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcClinda() {
        var clindaNote = `<br><i class="uyari-metin">Not: klindamisin artık dental işlemler öncesi endokardit profilaksisi için önerilmemektedir (bkz. profilaksi hesaplayıcı, ${AAPD_LINK}).</i>`;
        if (ptAgeNum < 18) {
            var minDose = ptWeight * 20, maxDose = ptWeight * 30;
            var divMinDose = capped(minDose / 3, 450);
            var divMaxDose = capped(maxDose / 3, 450);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                8 saatte bir <b>${divMinDose}-${divMaxDose}mg/doz</b> (maksimum tek doz 450mg); MRSA şüphesinde 30-40mg/kg/gün'e çıkılabilir.
                ${clindaNote}`,
                `Hesaplama:
                    <br>${ptWeight}kg * 20-30mg/kg/gün (<18 yaş için) = ${Math.ceil(minDose)}-${Math.ceil(maxDose)}mg/gün
                    <br>/ 3 doz, tek doz maksimum 450mg = 8 saatte bir ${divMinDose}-${divMaxDose}mg`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 6-8 saatte bir <b>300-450mg</b> (maksimum günlük doz 1800mg).
                ${clindaNote}`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcDoxy() {
        if (ptAgeNum > 8 && ptAgeNum < 18) {
            var eachDose = capped(ptWeight * 2.2, 100);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 12 saatte bir <b>${eachDose}mg/doz</b> (maksimum tek doz 100mg).`,
                `Hesaplama:
                    <br>${ptWeight}kg * 2.2mg/kg/doz = ${eachDose}mg/doz`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> <b>100-200mg/gün</b> günlük tek doz veya 2'ye bölünerek 12 saatte bir <b>100-200mg/gün</b>`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcMetro() {
        if (ptAgeNum < 18) {
            var doseSingle = capped(ptWeight * 10, 250);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı:
                    <br>Genel anaerobik enfeksiyonlar için çocuk/adolesanlarda AAPD'nin ayrı bir doz önerisi yoktur.
                    <br>Penisiline alerjik çocuk/adolesanlarda, nekrotizan gingivitis dahil periodontal hastalık tedavisinde:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; 7 gün boyunca 8 saatte bir <b>${doseSingle}mg/doz</b> (maksimum tek doz 250mg)`,
                `Hesaplama:
                    <br>${ptWeight}kg * 10mg/kg/doz (maksimum tek doz 250mg) = 8 saatte bir ${doseSingle}mg`);
        } else if (ptAgeNum >= 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı:
                    <br>Anaerobik enfeksiyonlar için: penisilin (veya alerjikse 2./3. kuşak sefalosporin) ile birlikte 8 saatte bir <b>500mg</b>
                    <br>Penisiline alerjik yetişkinlerde, nekrotizan gingivitis dahil periodontal hastalık tedavisinde:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; 7 gün boyunca 8 saatte bir <b>250-500mg</b>`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function CalcPenVK() {
        if (ptAgeNum < 18) {
            var minDose = capped(ptWeight * 25, 2000);
            var maxDose = capped(ptWeight * 50, 2000);
            var divMinDose = Math.ceil(minDose / 4);
            var divMaxDose = Math.ceil(maxDose / 4);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                Toplamda <b>${minDose}-${maxDose}mg/gün</b> olacak şekilde 6 saatte bir <b>${divMinDose}-${divMaxDose}mg/doz</b> (maksimum günlük doz 2000mg).`,
                `Hesaplama:
                    <br>${ptWeight}kg * 25-50mg/kg/gün (çocuk/adolesanlar için) = ${minDose}-${maxDose}mg/gün
                    <br>${minDose}-${maxDose}mg/gün / 4 = 6 saatte bir  ${divMinDose}-${divMaxDose}mg`);
        } else if (ptAgeNum > 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                6-8 saatte bir <b>250-500mg</b>`,
                `Hesaplama: <br>Yetişkin dozu kullanılmıştır`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    switch (antibioticMed) {
        case 'Amoksisilin': calcAmox(); break;
        case 'Ko-Amoksilav': calcAmoxCP(); break;
        case 'Azitromisin': calcAzithro(); break;
        case 'Sefaleksin': calcCepha(); break;
        case 'Klaritromisin': calcCalr(); break;
        case 'Klindamisin': calcClinda(); break;
        case 'Doksisiklin': calcDoxy(); break;
        case 'Metronidazol': calcMetro(); break;
        case 'Fenoksimetilpenisilin': CalcPenVK(); break;
    }
}

function doProphCalc() {
    var ptType = document.getElementById('idPtType').value;
    if (ptType === 'child' && isBlank('idWeightNum')) {
        showResult('lütfen kilo bilgisini giriniz.', '');
        return;
    }
    var ptWeight = +document.getElementById('idWeightNum').value;
    var ptOral = document.getElementById('idOral').value;
    var ptAllergy = document.getElementById('idAllergy').value;

    function calcAdult() {
        if (ptOral === 'Yes' && ptAllergy === 'No') {
            showResult("Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Amoksisilin (2g oral)</b>",
                "Hesaplama: Yetişkin dozu kullanılmıştır");
        } else if (ptOral === 'No' && ptAllergy === 'No') {
            showResult("Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Ampisilin (2g IM/IV), Sefazolin (1g IM/IV), veya Seftriakson (1g IM/IV)</b>",
                "Hesaplama: Yetişkin dozu kullanılmıştır");
        } else if (ptOral === 'Yes' && ptAllergy === 'Yes') {
            showResult("Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefaleksin (2g oral), Azitromisin (500mg oral), Klaritromisin (500mg oral), veya Doksisiklin (100mg oral)</b>",
                "Hesaplama: Yetişkin dozu kullanılmıştır");
        } else if (ptOral === 'No' && ptAllergy === 'Yes') {
            showResult("Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefazolin (1g IM/IV) veya Seftriakson (1g IM/IV)</b>",
                "Hesaplama: Yetişkin dozu kullanılmıştır");
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    function calcChild() {
        if (ptOral === 'Yes' && ptAllergy === 'No') {
            var ptDoseText = capped(ptWeight * 50, 2000);
            showResult(`Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Amoksisilin (${ptDoseText}mg oral)</b>`,
                `Hesaplama:
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseText}mg (yetişkin dozuna kadar, 2g)`);
        } else if (ptOral === 'No' && ptAllergy === 'No') {
            var ptDoseAmpText = capped(ptWeight * 50, 2000);
            var ptDoseCefText = capped(ptWeight * 50, 1000);
            showResult(`Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Ampisilin (${ptDoseAmpText}mg IM/IV), Sefazolin (${ptDoseCefText}mg IM/IV), veya Seftriakson (${ptDoseCefText}mg IM/IV)</b>`,
                `Hesaplama:
                <br>
                <br>Ampisilin için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseAmpText}mg (yetişkin dozuna kadar, 2g)
                <br>
                <br>Sefazolin ve Seftriakson için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseCefText}mg (yetişkin dozuna kadar, 1g)`);
        } else if (ptOral === 'Yes' && ptAllergy === 'Yes') {
            var ptDoseCepText = capped(ptWeight * 50, 2000);
            var ptDoseAziText = capped(ptWeight * 15, 500);
            var ptDoseDoxText = capped(ptWeight * 2.2, 100);
            showResult(`Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefaleksin (${ptDoseCepText}mg oral), Azitromisin (${ptDoseAziText}mg oral), Klaritromisin (${ptDoseAziText}mg oral), veya Doksisiklin (${ptDoseDoxText}mg oral)</b>`,
                `Hesaplama:
                <br>
                <br>Sefaleksin için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseCepText}mg (yetişkin dozuna kadar, 2g)
                <br>
                <br>Azitromisin ve Klaritromisin için,
                <br>${ptWeight}kg * 15mg/kg = ${ptDoseAziText}mg (yetişkin dozuna kadar, 500mg)
                <br>
                <br>Doksisiklin için,
                <br>${ptWeight}kg * 2.2mg/kg = ${ptDoseDoxText}mg (yetişkin dozuna kadar, 100mg)`);
        } else if (ptOral === 'No' && ptAllergy === 'Yes') {
            var ptDoseText = capped(ptWeight * 50, 1000);
            showResult(`Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefazolin (${ptDoseText}mg IM/IV) veya Seftriakson (${ptDoseText}mg IM/IV)</b>`,
                `Hesaplama:
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseText}mg (yetişkin dozuna kadar, 1g)`);
        } else {
            showResult("Bilgi yok.", "");
        }
    }

    switch (ptType) {
        case 'adult': calcAdult(); break;
        case 'child': calcChild(); break;
    }
}

function doFlorCalc() {
    document.getElementById("results").style.display = "block";
    var fluorideNum = "0";
    var ptAgeGroup = document.getElementById('idAgeGroup').value;
    var ptFluorideConc = document.getElementById('idFluorideConc').value;

    if ((ptAgeGroup === 'ageGroup2' && ptFluorideConc === 'fluorideConc1') || (ptAgeGroup === 'ageGroup3' && ptFluorideConc === 'fluorideConc2')) {
        fluorideNum = "0.25";
    }
    if ((ptAgeGroup === 'ageGroup3' && ptFluorideConc === 'fluorideConc1') || (ptAgeGroup === 'ageGroup4' && ptFluorideConc === 'fluorideConc2')) {
        fluorideNum = "0.50";
    }
    if (ptAgeGroup === 'ageGroup4' && ptFluorideConc === 'fluorideConc1') {
        fluorideNum = "1.00";
    }
    document.getElementById('textResults').innerHTML =
        `Hastanın yaşına ve içme suyundaki florür oranına dayanarak, günlük önerilen florür takviyesi:
    <br><b>${fluorideNum}mg</b>.`;
}

function doAnesCalc() {
    document.getElementById("results").style.display = "block";
    if (isBlank('idAgeNum') || isBlank('idWeightNum')) {
        document.getElementById('textMath').innerHTML = '<b class="uyari-metin">lütfen yaş ve kilo bilgilerini giriniz.</b>';
        return;
    }
    var ptAgeNum = +document.getElementById('idAgeNum').value;
    var ptWeight = +document.getElementById('idWeightNum').value;
    document.getElementById('textPtWeight').innerHTML = ptWeight;
    var ptLocal = document.getElementById('localAnesthesia').value;
    document.getElementById('textPtLocal').innerHTML = ptLocal;
    var maxDose, mgPerCarp, warning = "";
    switch (ptLocal) {
        case 'Lidokain %2 (+epinefrin)': maxDose = 4.4; mgPerCarp = 34; break;
        case 'Artikain %4 (+epinefrin)':
            maxDose = 7; mgPerCarp = 68;
            if (ptAgeNum > 0 && ptAgeNum < 4) warning += "UYARI: Artikain 4 yaşından küçük hastalarda önerilmemektedir. ";
            break;
        case 'Mepivakain %3 (epinefrinsiz)': maxDose = 4.4; mgPerCarp = 51; break;
        case 'Bupivakain %0.5 (+epinefrin)':
            maxDose = 1.3; mgPerCarp = 8.5;
            if (ptAgeNum > 0 && ptAgeNum < 12) warning += "UYARI: Bupivakain 12 yaşından küçük hastalarda önerilmemektedir. ";
            break;
    }
    if (ptAgeNum > 0 && ptAgeNum < 0.5) {
        maxDose = maxDose * 0.7;
        warning += "6 aydan küçük bebeklerde doz %30 azaltılmıştır. ";
    }
    var numMaxMg = Math.floor(ptWeight * maxDose * 10) / 10;
    var numCarpules = Math.floor(numMaxMg / mgPerCarp * 10) / 10;
    document.getElementById('textPtMaxDose').innerHTML = numMaxMg;
    document.getElementById('textPtMaxCarpules').innerHTML = numCarpules;
    var mathText = "Hesaplama: " +
        "<br>" + ptWeight + "kg * " + maxDose + "mg/kg = " + numMaxMg + "mg (maksimum doz)" +
        "<br>" + numMaxMg + "mg / " + mgPerCarp + "mg (1.7ml'lik ampul) = " + numCarpules + " ampul (maksimum ampul)" +
        (warning ? `<br><b class="uyari-metin">${warning}(${AAPD_LINK})</b>` : "");
    document.getElementById('textMath').innerHTML = mathText;
}

function doPainCalc() {
    if (isBlank('idAgeNum') || isBlank('idWeightNum')) {
        showResult('lütfen yaş ve kilo bilgilerini giriniz.', '');
        return;
    }
    var ptAgeNum = +document.getElementById('idAgeNum').value;
    var ptWeight = +document.getElementById('idWeightNum').value;
    var painMed = document.getElementById('idPainMed').value;

    function calcAce() {
        if (ptAgeNum < 12) {
            var minDose = Math.floor(ptWeight * 10);
            var maxDose = Math.floor(ptWeight * 15);
            var maxDaily = Math.floor(Math.min(ptWeight * 75, 4000));
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir ${minDose}-${maxDose}mg/doz</b> (maksimum günlük doz ${maxDaily}mg; 4000mg/24sa'i geçmemelidir).`,
                "Hesaplama:" +
                "<br>" + ptWeight + "kg * 10-15mg/kg/doz (<12 yaş için) = 4-6 saatte bir " + minDose + "-" + maxDose + "mg/doz" +
                "<br>" + ptWeight + "kg * 75mg/kg/gün = " + maxDaily + "mg/gün (maksimum, 4000mg'ı geçmemeli)");
        } else if (ptAgeNum >= 12) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir 325-650mg YADA gerektikçe günde 3-4 defa 1,000mg</b> (maksimum 4g/24sa).`,
                "Hesaplama: Yaşa bağlı hesaplanmıştır (>=12).");
        }
    }

    function calcIbu() {
        if (ptAgeNum < 12) {
            var minDose = Math.floor(ptWeight * 4);
            var maxDose = Math.floor(Math.min(ptWeight * 10, 600));
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>6-8 saatte bir gerektikçe ${minDose}-${maxDose}mg/doz</b> (maksimum tek doz 600mg).`,
                "Hesaplama: " +
                "<br>" + ptWeight + "kg * 4-10mg/kg/doz (<12 yaş için, maksimum tek doz 600mg) = 6-8 saatte bir " + minDose + "-" + maxDose + "mg/doz");
        } else if (ptAgeNum < 18) {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir gerektikçe 200-400mg</b> (maksimum günlük doz 3200mg).`,
                "Hesaplama: Yaşa bağlı hesaplanmıştır (>=12).");
        } else {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir gerektikçe 200-400mg</b> (maksimum günlük doz 3200mg)
            <br>VEYA
            <br><b>6-8 saatte bir gerektikçe 600-800mg</b> (maksimum günlük doz 3200mg).`,
                "Hesaplama: Yaşa bağlı hesaplanmıştır (>=18).");
        }
    }

    function calcNap() {
        if (ptAgeNum < 18) {
            var minDose = Math.floor(ptWeight * 5);
            var maxDose = Math.floor(ptWeight * 7);
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>8-12 saatte bir gerektikçe ${minDose}-${maxDose}mg/doz</b> (maksimum günlük doz 1,000mg).`,
                "Hesaplama: " +
                "<br>" + ptWeight + "kg * 5-7mg/kg/doz (<18 yaş için, maksimum günlük doz 1000mg) = 8-12 saatte bir " + minDose + "-" + maxDose);
        } else {
            showResult(`<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>Başlangıç dozu olarak 500mg, daha sonra 12 saatte bir 250-500mg VEYA 6-8 saatte bir 250mg</b> (maksimum 1. gün 1,250mg/gün, sonrasında 1,000mg/gün).`,
                "Hesaplama: Yaşa bağlı hesaplanmıştır (>=18).");
        }
    }

    switch (painMed) {
        case 'Parasetamol': calcAce(); break;
        case 'İbuprofen': calcIbu(); break;
        case 'Naproksen': calcNap(); break;
    }
}
