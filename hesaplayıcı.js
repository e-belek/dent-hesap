function doAntibioticCalc() {
    var results = document.getElementById("results"); results.style.display = "block";
    var ptAgeNum = +document.getElementById('idAgeNum').value;
    var ptWeight = +document.getElementById('idWeightNum').value;
    var antibioticMed = document.getElementById('idAntibioticMed').value;
    function calcAmox() {
        if (ptAgeNum > 0.25 && ptAgeNum < 18 && ptWeight < 40) {
            var minDoseEight = Math.ceil(Math.min(ptWeight * 20, 1500));
            var maxDoseEight = Math.ceil(Math.min(ptWeight * 40, 1500));
            var divMinDoseEight = Math.ceil(minDoseEight / 3);
            var divMaxDoseEight = Math.ceil(maxDoseEight / 3);
            var minDoseTwelve = Math.ceil(Math.min(ptWeight * 25, 1750));
            var maxDoseTwelve = Math.ceil(Math.min(ptWeight * 45, 1750));
            var divMinDoseTwelve = Math.ceil(minDoseTwelve / 2);
            var divMaxDoseTwelve = Math.ceil(maxDoseTwelve / 2);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                Toplamda <b>${minDoseEight}-${maxDoseEight}mg/gün</b> olacak şekilde, her 8 saatte bir
                <b>${divMinDoseEight}-${divMaxDoseEight}mg/doz</b>(maksimum 500mg/doz)
                <br> VEYA <br>
                Toplamda <b>${minDoseTwelve}-${maxDoseTwelve}mg/gün</b> olacak şekilde, her 12 saatte bir <b>${divMinDoseTwelve}-${divMaxDoseTwelve}mg/doz</b>
                (maksimum 875 mg/doz).`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 20-40mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük ${minDoseEight}-${maxDoseEight}mg
                    <br>${minDoseEight}-${maxDoseEight}mg/gün / 3 = 8 saatte bir ${divMinDoseEight}-${divMaxDoseEight}mg
                    <br>OR
                    <br>${ptWeight}kg * 25-45mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük  ${minDoseTwelve}-${maxDoseTwelve}mg
                    <br>${minDoseTwelve}-${maxDoseTwelve}mg/gün / 2 = 12 saatte bir ${divMinDoseTwelve}-${divMaxDoseTwelve}mg`
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18 || (ptAgeNum > 10 && ptWeight >= 40)) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 8 saatte bir <b>250-500mg</b>
                <br> VEYA <br>
                12 saatte bir <b>500-875 g</b>`;
            var mathText = 'Hesaplama: <br> Yetişkin dozu kullanılmıştır';
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcAmoxCP() {
        if (ptAgeNum > 0.25 && ptAgeNum < 18 && ptWeight <= 40) {
            var minDoseTwelve = Math.ceil(Math.min(ptWeight * 25, 1750));
            var maxDoseTwelve = Math.ceil(Math.min(ptWeight * 45, 1750));
            var divMinDoseTwelve = Math.ceil(minDoseTwelve / 2);
            var divMaxDoseTwelve = Math.ceil(maxDoseTwelve / 2);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için,
                <b>${antibioticMed}</b> kullanımı:
                <br> Toplamda <b>${minDoseTwelve}-${maxDoseTwelve}mg/gün</b> olacak şekilde, her 12 saatte bir <b>${divMinDoseTwelve}-${divMaxDoseTwelve}mg/doz</b>
                (maksimum tek doz 875 mg; maksimum günlük doz 1750 mg)<br>
                (klavulonik asit sebebiyle süspansiyon veya çiğneme tableti önerilir).`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 25-45mg/kg/gün (>3 ay ve <40kg çocuklar için) = Günlük ${minDoseTwelve}-${maxDoseTwelve}mg
                    <br>${minDoseTwelve}-${maxDoseTwelve}mg/gün / 2 = 12 saatte bir ${divMinDoseTwelve}-${divMaxDoseTwelve}mg`
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptWeight > 40 || ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında <b>${ptWeight}</b>, kg bir hasta için, <b>${antibioticMed}</b> kullanımı:
                <br> 12 saatte bir <b>500-875mg</b> (tablet önerilir).`;
            var mathText = "Hesaplama: <br> Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcAzithro() {
        if (ptAgeNum >= 0.5 && ptAgeNum < 16) {
            var minDoseOne = Math.ceil(Math.min(ptWeight * 10, 500));
            var maxDoseOne = Math.ceil(Math.min(ptWeight * 12, 500));
            var minDoseTwo = Math.ceil(Math.min(ptWeight * 5, 250));
            var maxDoseTwo = Math.ceil(Math.min(ptWeight * 6, 250));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                1.gün tek doz <b>${minDoseOne}-${maxDoseOne}mg</b>, (maksimum 500mg/gün), <br>takibinde tedavinin kalanı için (2-5 gün) boyunca günlük tek doz <b>${minDoseTwo}-${maxDoseTwo}mg</b>`;
            var mathText = `Hesaplama:
                    <br>1. gün için: ${ptWeight}kg * 10-12mg/kg/gün (>=6 ay ve <16 yaş çocuklar için) = ${minDoseOne}-${maxDoseOne}mg
                    <br>2-6. gün için: ${ptWeight}kg * 5-6mg/kg/gün (>=6 ay ve <16 yaş çocuklar için) = ${minDoseTwo}-${maxDoseTwo}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 16) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                1.gün tek doz <b>500mg</b>
                <br> takibinde tedavinin kalanı için (2-5 gün) boyunca günlük tek doz <b>250mg</b>`;
            var mathText = "Hesaplama: <br>Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcCepha() {
        if (ptAgeNum < 18) {
            var minDoseOne = Math.ceil(Math.min(ptWeight * 25, 2000));
            var maxDoseOne = Math.ceil(Math.min(ptWeight * 50, 2000));
            var minDoseTwo = Math.ceil(Math.min(ptWeight * 75, 4000));
            var maxDoseTwo = Math.ceil(Math.min(ptWeight * 100, 4000));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                    Hafif ve orta derece enfeksiyonlar için, 4-2 doza bölerek 6-12 saatte bir <b>${minDoseOne}-${maxDoseOne}mg/gün</b> (maksimum 2g/gün). <br>
                    Ciddi enfeksiyonlar için, 4-3 doza bölerek 6-8 saatte bir <b>${minDoseTwo}-${maxDoseTwo}mg/gün</b> (maksimum 4g/gün).`;
            var mathText = `Hesaplama:
                    <br>Yaş <18 ise hafif-orta enfeksiyonlarda: ${ptWeight}kg * 25-50mg/kg/gün = ${minDoseOne}-${maxDoseOne}mg/gün
                    <br>Yaş <18 ise ciddi enfeksiyonlarda: ${ptWeight}kg * 75-100mg/kg/gün (>6 ay ve <16 yaş için) = ${minDoseTwo}-${maxDoseTwo}mg/gün`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 6 saatte bir <b>250-1000mg</b>  (maksimum 4g/day).`;
            var mathText = `Hesaplama: <br>Yetişkin dozu kullanılmıştır`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcCalr() {
        if (ptAgeNum < 18) {
            var doseDay = Math.ceil(Math.min(ptWeight * 15, 1000));
            var doseSingle = Math.ceil(doseDay / 2);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                <b>${doseDay}mg/gün</b> dozlara bölünerek (<b>${doseSingle}mg/doz</b>) 12 saatte bir (maksimum 500mg/doz).`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 15mg/kg/gün = ${doseDay}mg/gün
                    <br>${doseDay}mg/gün / 2 = 12 saatte bir ${doseSingle}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 12 saatte bir <b>500mg</b>`;
            var mathText = `Hesaplama: <br>Yetişkin dozu kullanılmıştır`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcClinda() {
        if (ptAgeNum < 18) {
            var minDose = Math.ceil(Math.min(ptWeight * 10, 1350));
            var maxDose = Math.ceil(Math.min(ptWeight * 25, 1350));
            var divMinDose = Math.ceil(minDose / 3);
            var divMaxDose = Math.ceil(maxDose / 3);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                <b>${minDose}-${maxDose}mg/gün</b> dozlara bölünerek  (<b>${divMinDose}-${divMaxDose}mg/doz</b>) 8 saatte bir (maksimum tek doz 450 mg; maksimum günlük doz 1350 mg).`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 10-25mg/kg/gün (<18 yaş için>) = ${minDose}-${maxDose}mg/gün
                    <br> ${minDose}-${maxDose}mg/gün / 3 = 6 saatte bir ${divMinDose}-${divMaxDose}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 6-8 saatte bir <b>300-450mg</b> (maksimum 1.8g/gün).`;
            var mathText = `Hesaplama: <br>Yetişkin dozu kullanılmıştır`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcDoxy() {
        if (ptAgeNum > 8 && ptAgeNum < 18) {
            var eachDose = Math.ceil(Math.min(ptWeight * 2.2, 100));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> 12 saatte bir <b>${eachDose}mg/doz</b> (maksimum tek doz 100mg).`
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 2.2mg/kg/doz = ${eachDose}mg/doz`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br> <b>100-200mg/gün</b> günlük tek doz veya 2'ye bölünerek 12 saatte bir <b>100-200mg/gün</b>`;
            var mathText = `Hesaplama: <br>Yetişkin dozu kullanılmıştır`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcMetro() {
        if (ptAgeNum < 18) {
            var minDose = Math.ceil(Math.min(ptWeight * 15, 2250));
            var maxDose = Math.ceil(Math.min(ptWeight * 50, 2250));
            var divMinDose = Math.ceil(minDose / 3);
            var divMaxDose = Math.ceil(maxDose / 3);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı:
                    <br>
                    <br>Anaerobik deri ve kemik enfeksiyonları için: <b>${minDose}-${maxDose}mg/gün</b> dozlara bölünerek günde 3 defa (<b>${divMinDose}-${divMaxDose}mg/doz</b>) (maksimum doze: 2,250mg/gün)
                    <br>Nekrotizan gingivitis dahil periodontal hastalıklar için:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; Adolesan ve yetişkinler için: 10 gün boyunca amoksisilin ile kombine olarak 6-8 saatte bir 250mg
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; VEYA metronidazol tek başına 10 gün boyunca 6-8 saatte bir 250mg
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; VEYA 8 gün 8 saatte bir 500mg
                    <br>Agresif oral enfeksiyonlarda, amoksisilin ile kombine olarak kullanılabilir:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; Adolesan ve yetişkinlerde: amoksisilin (250-375mg, 3 doz/gün) ile birlikte günde 3 defa 250mg, 7-10 gün`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 15-50mg/kg/gün (çocuk/adolesanlar için) = ${minDose}-${maxDose}mg/gün
                    <br>${minDose}-${maxDose}mg/gün / 3 = 8 saatte bir ${divMinDose}-${divMaxDose}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 18) {
            var oneDose = Math.ceil(Math.min(ptWeight * 7.5, 4000));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı:
                    <br>
                    <br>Anaerobik deri ve kemik enfeksiyonları için: 6 saatte bir <b>${oneDose}mg</b> (maksimum günlük doz 4g)
                    <br>Nekrotizan gingivitis dahil periodontal hastalıklar için:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; Adolesan ve yetişkinler için: 10 gün boyunca amoksisilin ile kombine olarak 6-8 saatte bir 250mg
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; VEYA metronidazol tek başına 10 gün boyunca 6-8 saatte bir 250mg
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; VEYA 8 gün 8 saatte bir 500mg
                    <br>Agresif oral enfeksiyonlarda, amoksisilin ile kombine olarak kullanılabilir:
                    <br>&nbsp;&nbsp;&nbsp;&nbsp; Adolesan ve yetişkinlerde: amoksisilin (250-375mg, 3 doz/gün) ile birlikte günde 3 defa 250mg, 7-10 gün`;
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 7.5mg/kg/gün (yetişkinler için) = 6 saatte bir ${oneDose}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function CalcPenVK() {
        if (ptAgeNum < 18) {
            var minDose = Math.ceil(Math.min(ptWeight * 25, 2000));
            var maxDose = Math.ceil(Math.min(ptWeight * 50, 2000));
            var divMinDose = Math.ceil(minDose / 4);
            var divMaxDose = Math.ceil(maxDose / 4);
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                Toplamda <b>${minDose}-${maxDose}mg/gün</b> olacak şekilde 6 saatte bir <b>${divMinDose}-${divMaxDose}mg/doz</b>) (maksimum günlük doz 2000mg).`
            var mathText = `Hesaplama:
                    <br>${ptWeight}kg * 25-50mg/kg/gün (çocuk/adolesanlar için) = ${minDose}-${maxDose}mg/gün
                    <br>${minDose}-${maxDose}mg/gün / 4 = 6 saatte bir  ${divMinDose}-${divMaxDose}mg`;
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum > 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}</b> kg bir hasta için
                <b>${antibioticMed}</b> kullanımı: <br>
                6-8 saatte bir <b>250-500mg</b>`
            var mathText = `Hesaplama: <br>Yetişkin dozu kullanılmıştır`;
            document.getElementById('textMath').innerHTML = mathText;
        } else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
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
    var results = document.getElementById("results"); results.style.display = "block";
    var ptType = document.getElementById('idPtType').value;
    var ptWeight = +document.getElementById('idWeightNum').value;
    var ptOral = document.getElementById('idOral').value;
    var ptAllergy = document.getElementById('idAllergy').value;
    function calcAdult() {
        if (ptType === 'adult' && ptOral === 'Yes' && ptAllergy === 'No') {
            document.getElementById('textResults').innerHTML = "Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Amoksisilin (2g oral)</b>";
            var mathText = "Hesaplama: Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;

        }
        else if (ptType === 'adult' && ptOral === 'No' && ptAllergy === 'No') {
            document.getElementById('textResults').innerHTML = "Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Ampisilin (2g IM/IV), Sefazolin (1g IM/IV), veya Seftriakson (1g IM/IV)</b>";
            var mathText = "Hesaplama: Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;

        }
        else if (ptType === 'adult' && ptOral === 'Yes' && ptAllergy === 'Yes') {
            document.getElementById('textResults').innerHTML = "Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefaleksin (2g oral), Azitromisin (500mg oral), Klaritromisin (500mg oral), veya Doksisiklin (100mg oral)</b>";
            var mathText = "Hesaplama: Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;

        }
        else if (ptType === 'adult' && ptOral === 'No' && ptAllergy === 'Yes') {
            document.getElementById('textResults').innerHTML = "Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefazolin (1g IM/IV) veya Seftriakson (1g IM/IV)</b>";
            var mathText = "Hesaplama: Yetişkin dozu kullanılmıştır";
            document.getElementById('textMath').innerHTML = mathText;

        }
        else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }

    function calcChild() {
        if (ptType === 'child' && ptOral === 'Yes' && ptAllergy === 'No') {
            var ptDose = Math.min(ptWeight * 50, 2000); //mg;
            var ptDoseText = Math.ceil(ptDose);
            document.getElementById('textResults').innerHTML = `Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Amoksisilin (${ptDoseText}mg oral)</b>`;
            var mathText = `Hesaplama:
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseText}mg (yetişkin dozuna kadar), 2g)`;
            document.getElementById('textMath').innerHTML = mathText;
        }
        else if (ptType === 'child' && ptOral === 'No' && ptAllergy === 'No') {
            var ptDoseAmp = Math.min(ptWeight * 50, 2000); //mg;
            var ptDoseAmpText = Math.ceil(ptDoseAmp);
            var ptDoseCef = Math.min(ptWeight * 50, 1000); //mg;
            var ptDoseCefText = Math.ceil(ptDoseCef);
            document.getElementById('textResults').innerHTML = `Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Ampisilin (${ptDoseAmpText}mg IM/IV), Sefazolin (${ptDoseCefText}mg IM/IV), veya Seftriakson (${ptDoseCefText}g IM/IV)</b>`;
            var mathText = `Hesaplama:
                <br>
                <br>Ampisilin için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseAmpText}mg (yetişkin dozuna kadar, 2g)
                <br>
                <br>Sefazolin ve Seftriakson için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseCefText}mg (yetişkin dozuna kadar, 1g)`;
            document.getElementById('textMath').innerHTML = mathText;
        }
        else if (ptType === 'child' && ptOral === 'Yes' && ptAllergy === 'Yes') {
            var ptDoseCep = Math.min(ptWeight * 50, 2000);
            var ptDoseCepText = Math.ceil(ptDoseCep);
            var ptDoseAzi = Math.min(ptWeight * 15, 500);
            var ptDoseAziText = Math.ceil(ptDoseAzi);
            var ptDoseDox = Math.min(ptWeight * 2.2, 100);
            var ptDoseDoxText = Math.ceil(ptDoseDox);
            document.getElementById('textResults').innerHTML = `Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefaleksin (${ptDoseCepText}mg oral), Azitromisin (${ptDoseAziText}mg oral), Klaritromisin (${ptDoseAziText}mg oral), veya Doksisiklin (${ptDoseDoxText}mg oral)</b>`;
            var mathText = `Hesaplama:
                <br>
                <br>Sefaleksin için,
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseCepText}mg (yetişkin dozuna kadar, 2g)
                <br>
                <br>Azitromisin ve Klaritromisin için,
                <br>${ptWeight}kg * 15mg/kg = ${ptDoseAziText}mg (yetişkin dozuna kadar, 500mg);
                <br>
                <br>Doksisiklin için,
                <br>${ptWeight}kg * 15mg/kg = ${ptDoseDoxText}mg (yetişkin dozuna kadar, 100mg)`;
            document.getElementById('textMath').innerHTML = mathText;
        }
        else if (ptType === 'child' && ptOral === 'No' && ptAllergy === 'Yes') {
            var ptDose = Math.min(ptWeight * 50, 1000); //mg;
            var ptDoseText = Math.ceil(ptDose);
            document.getElementById('textResults').innerHTML = `Verilen bilgilere dayanarak önerilen antibiyotik profilaksi rejimi: <br> Dental işlemlerden 30-60 dk önce <b>Sefazolin (${ptDoseText}mg IM/IV) veya Seftriakson (${ptDoseText}mg IM/IV)</b>`;
            var mathText = `Hesaplama:
                <br>${ptWeight}kg * 50mg/kg = ${ptDoseText}mg (yetişkin dozuna kadar, 1g)`;
            document.getElementById('textMath').innerHTML = mathText;
        }
        else {
            document.getElementById('textResults').innerHTML = "Bilgi yok.";
            var mathText = "";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }

    switch (ptType) {
        case 'adult': calcAdult(); break;
        case 'child': calcChild(); break;
    }
}

function doFlorCalc() {
    var results = document.getElementById("results"); results.style.display = "block";
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
    var results = document.getElementById("results"); results.style.display = "block";
    var ptWeight = +document.getElementById('idWeightNum').value;
    document.getElementById('textPtWeight').innerHTML = ptWeight;
    var ptLocal = document.getElementById('localAnesthesia').value;
    document.getElementById('textPtLocal').innerHTML = ptLocal;
    var maxDose;
    var mgPerCarp;
    switch (ptLocal) {
        case 'Lidokain 20mg/ml': maxDose = 3; mgPerCarp = 40; break;
        case 'Artikain 40mg/ml': maxDose = 7; mgPerCarp = 80; break;
        case 'Mepivakain 30mg/ml': maxDose = 3; mgPerCarp = 60; break;
    }
    document.getElementById('textPtMaxDose').innerHTML = Math.floor(ptWeight * maxDose * 10) / 10;
    document.getElementById('textPtMaxCarpules').innerHTML = Math.floor(ptWeight * maxDose / mgPerCarp * 10) / 10;
    var numCarpules = Math.floor(ptWeight * maxDose / mgPerCarp * 10) / 10;
    var numMaxMg = Math.floor(ptWeight * maxDose * 10) / 10;
    var mathText = "Hesaplama: " +
        "<br>" + ptWeight + "kg * " + maxDose + "mg/kg = " + numMaxMg + "mg (maksimum doz)" +
        "<br>" + numMaxMg + "mg * 1 ampul/" + mgPerCarp + "mg = " + numCarpules + " ampul (maksimum ampul)";
    document.getElementById('textMath').innerHTML = mathText;
}

function doPainCalc() {
    var results = document.getElementById("results"); results.style.display = "block";
        var ptAgeNum = +document.getElementById('idAgeNum').value;
        var ptWeight = +document.getElementById('idWeightNum').value;
        var painMed = document.getElementById('idPainMed').value;
    var minDose;
    var maxDose;
    function calcAce(){
        if (ptAgeNum < 12) {
            minDose = Math.floor(Math.min(ptWeight * 10, 325));
            maxDose = Math.floor(Math.min(ptWeight * 15, 650));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir ${minDose}-${maxDose}mg/doz</b> (maksimum 4g/24sa'i geçmeyecek şekilde 75mg/kg/gün).`;
            var mathText = "Hesaplama:"+
            "<br>"+ptWeight+"kg * 10-15mg/kg/doz (<12 yaş için) = 4-6 saatte bir " +minDose+"-"+maxDose+"mg/doz";
            document.getElementById('textMath').innerHTML = mathText;
        } else if (ptAgeNum >= 12) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir 325-650mg YADA gerekrikçe günde 3-4 defa 1,000mg 3-4</b> (maksimum 4g/24sa).`;
            var mathText = "Hesaplama: Yaşa bağlı hesaplanmıştır (>=12).";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcIbu(){
        if (ptAgeNum < 12 && ptWeight < 50) {
            minDose = Math.floor(Math.min(ptWeight * 4, 200));
            maxDose = Math.floor(Math.min(ptWeight * 10, 400));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>6-8 saatte bir gerektikçe ${minDose}-${maxDose}mg/doz</b> (maksimum tek doz 400mg; maksimum doz 40mg/kg/24sa).`;
            var mathText = "Hesaplama: "+
            "<br>"+ptWeight+"kg * 4-10mg/kg/doz (<50kg çocuklar için) = 6-8 saatte bir "+minDose+"-"+maxDose+"mg/doz";
            document.getElementById('textMath').innerHTML = mathText;
        }
        if (ptAgeNum < 12 && ptWeight>= 50) {
            document.getElementById('textResults').innerHTML = `Hastanın yaşına ve kilosuna uygun veri yoktur. <b>(${ptAgeNum}</b> <b>${ptWeight}kg)</b>.`;
            var mathText = " ";
            document.getElementById('textMath').innerHTML = mathText;
        }
        if (ptAgeNum >= 12 && ptAgeNum < 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>4-6 saatte bir gerektikçe 200-400mg</b> (maksimum 1.2g/24sa).`;
            var mathText = "Hesaplama: Yaşa bağlı hesaplanmıştır.(>=12).";
            document.getElementById('textMath').innerHTML = mathText;
        }
        if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b><b>4-6 saatte bir gerektikçe 200-400mg</b> (maksimum 1.2g/24sa)
            <br>VEYA
            <br><b>6-8 saatte bir gerektikçe 600-800mg</b> (maksimum 1.2g/gün - 3.2g/gün).`;
            var mathText = "Hesaplama: Yaşa bağlı hesaplanmıştır.(>=18).";
            document.getElementById('textMath').innerHTML = mathText;
        }
    }
    function calcNap(){
        if (ptAgeNum < 18 && ptWeight< 60) {
            minDose = Math.floor(Math.min(ptWeight* 5, 250));
            maxDose = Math.floor(Math.min(ptWeight* 6, 375));
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>12 saatte bir gerektikçe ${minDose}-${maxDose}mg/doz</b> (maksimum doz 1,000mg/gün).`;
            var mathText = "Hesaplama: "+
            "<br>"+ptWeight+"kg * 5-6mg/kg/doz (<60kg çocuk/adolesanlar için) = 12 saatte bir "+minDose+"-"+maxDose;
            document.getElementById('textMath').innerHTML = mathText;
        }
        if (ptAgeNum < 18 && ptWeight>= 60) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>12 saatte bir gerektikçe 250-375mg</b> (maksimum doz 1,000mg/gün).`;
            var mathText = "Hesaplama: Yaşa (<18) ve kiloya (>60kg) bağlı hesaplanmıştır.";
            document.getElementById('textMath').innerHTML = mathText;
        }
        if (ptAgeNum >= 18) {
            document.getElementById('textResults').innerHTML = `<b>${ptAgeNum}</b> yaşında ve <b>${ptWeight}kg</b>, bir hasta için <b>${painMed}</b> kullanımı:
            <br><b>Başlangıç dozu olarak 500mg, daha sonra 12 saatte bir 250-500mg VEYA 6-8 saatte bir 250mg</b> (maksimum 1. gün 1,250mg/gün, sonrasında 1,000mg/gün).`;
            var mathText = "Hesaplama: Yaşa bağlı hesaplanmıştır.(>=18).";
            document.getElementById('textMath').innerHTML = mathText;

        }
    }
    switch (painMed) {
        case 'Parasetamol': calcAce(); break;
        case 'İbuprofen': calcIbu(); break;
        case 'Naproksen': calcNap(); break;
        }
}
