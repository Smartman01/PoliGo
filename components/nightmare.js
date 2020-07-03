const Nightmare = require('nightmare')
const cheerio = require('cheerio')
const vo = require('vo')

const mayors = [];

const links = [
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadLAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaecAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafqAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCab2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafLAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZAAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamjAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCauCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarrAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalEAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaX5AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiSAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqzAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaX8AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatSAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajTAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaj1AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanEAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXDAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYVAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagiAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoiAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002CLpnkQAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapEAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaplAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarRAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZ1AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZ3AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasNAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCal6AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXAAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCat8AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCataAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZkAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCankAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYPAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCah7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadrAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaewAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapXAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanJAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYTAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaetAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaRAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002CMKX4QAP'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaanAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00001h7qW6QAI'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacJAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCar4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaclAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaryAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00001h7jGCQAY'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWqAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWvAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXWAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXtAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaY1AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYnAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYoAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYvAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZ2AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZlAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCar3AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagsAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCardAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajRAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajdAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaouAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaddAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCae8AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaePAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeUAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCar8AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaf7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafBAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafhAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqjAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagNAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajsAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajwAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajxAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCak1AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCak7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakIAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaliAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalmAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaltAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamdAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCartAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamqAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=00161000016EcMGAA0'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaroAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabgAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadEAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXbAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYeAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZVAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaa3AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaivAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadtAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeSAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=00161000012k4KUAAY'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaf5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatdAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCal5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagXAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoaAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabeAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWtAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYjAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaauAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaapAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZUAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N0000232kjNQAQ'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarkAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCac2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCannAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXnAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasnAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakmAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZuAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamtAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCau1AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXeAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXwAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoLAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=00161000019khqIAAQ'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalzAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCau4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalcAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaY7AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZyAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahdAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaquAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiuAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002CLpp9QAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002GV6l1QAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaa6AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaa7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaaxAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCac4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCac5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapzAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaczAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanmAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanvAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYKAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZQAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZRAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaq0AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCageAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagvAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCah9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaq2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiZAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCairAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaorAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaq4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagUAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajpAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajrAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalZAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapjAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalwAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCan0AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCan2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWuAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanqAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadvAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaegAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamBAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamxAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYWAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCal3AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCangAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZrAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaa4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacIAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaruAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002CluejQAB'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCanjAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXKAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXaAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaY8AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCao9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYuAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYxAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagjAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagtAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasEAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahNAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCap1AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadwAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCae9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajuAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapaAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalJAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalhAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCam3AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqSAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamnAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqUAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaobAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafnAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafrAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCal2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCam0AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajaAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagfAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacgAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCap9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000P8iv7AAB'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaq6AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000L9VC4AAN'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabiAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabwAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCabzAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0014N00002CkcwfQAB'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100001Ov5XcAAJ'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCac7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarKAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCacqAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCad9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadFAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWwAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaWyAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaX0AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaX3AAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCansAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXQAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaXVAA1'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCao6AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatJAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYiAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaYpAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZoAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZsAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaZvAAL'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaggAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagoAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatLAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahUAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahXAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatNAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarJAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCahfAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCasHAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaiUAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaidAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajNAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajVAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajXAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaoxAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCadgAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCae2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaeTAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaf2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaf6AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapGAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafWAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafZAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCafaAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCapPAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCag5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarQAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCak5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCak8AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaqqAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCak9AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCal4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalMAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalbAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalgAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCalyAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCam5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamOAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCamwAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCan4AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCarAAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCan7AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaikAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCatYAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCakBAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=00161000016EAqaAAG'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaicAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaavAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCajCAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100001akOMYAA2'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCagDAAT'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCau2AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaasAAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCah5AAD'
    },
    {
        link: 'http://usmayors.org/mayor-profile/?category=0016100000KCaq9AAD'
    }
]

const stateNames = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'DistrictofColumbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
    'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'NewHampshire', 'NewJersey',
    'NewMexico', 'NewYork', 'NorthCarolina', 'NorthDakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'RhodeIsland', 'SouthCarolina', 'SouthDakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'WestVirginia', 'Wisconsin', 'Wyoming'
];

const stateObj = {
    Alabama: [], Alaska: [], Arizona: [], Arkansas: [], California: [], Colorado: [], Connecticut: [],
    Delaware: [], DistrictofColumbia: [], Florida: [], Georgia: [], Hawaii: [], Idaho: [], Illinois: [], Indiana: [], Iowa: [], Kansas: [],
    Kentucky: [], Louisiana: [], Maine: [], Maryland: [], Massachusetts: [], Michigan: [], Minnesota: [],
    Mississippi: [], Missouri: [], Montana: [], Nebraska: [], Nevada: [], NewHampshire: [], NewJersey: [],
    NewMexico: [], NewYork: [], NorthCarolina: [], NorthDakota: [], Ohio: [], Oklahoma: [], Oregon: [],
    Pennsylvania: [], RhodeIsland: [], SouthCarolina: [], SouthDakota: [], Tennessee: [], Texas: [], Utah: [],
    Vermont: [], Virginia: [], Washington: [], WestVirginia: [], Wisconsin: [], Wyoming: []
}

vo(run)(function (err, result) {
    if (err) throw err;
});

// function* run() {
//   var nightmare = Nightmare({ show: false })

//   yield nightmare
//     .viewport(800, 1600)
//     .goto('https://www.usmayors.org/mayors/meet-the-mayors')
//     .wait(5000)

//   let getData = html => {
//     const $ = cheerio.load(html);

//     mayors.push({
//       name: $('ul').find('b').text(),
//       city: $('ul').text().split($('ul').find('b').text())[1].split('P')[0],
//       image: $('ul').find('img').attr('src'),
//       website: $('ul').find('a').attr('href')
//     })

//     return mayors;
//   }

//   for (var i = 0; i < links.length; i++)
//   {
//     yield nightmare
//       .goto(links[i].link)
//       .wait('body')
//       .evaluate(() => document.querySelector('div.post-content').innerHTML)
//       .then(response => {
//         getData(response);
//       }).catch(err => {
//         console.log(err);
//       });
//   }

//   console.log(JSON.stringify(mayors, undefined, 4));

//   yield nightmare.end();
// }

function* run() {
    var nightmare = Nightmare({ show: false })

    yield nightmare
        .viewport(800, 1600)
        .goto('https://www.usmayors.org/mayors/meet-the-mayors')

    let getData = (html, state) => {
        const $ = cheerio.load(html);

        $('ul').each(function () {
            state.push({
                name: $(this).find('b').text(),
                city: $(this).text().split($(this).find('b').text())[1].split('P')[0],
                image: $(this).find('img').attr('src'),
                website: $(this).find('a').attr('href'),
                key: parseInt(Math.random() * 1500)
            })
        })

        return mayors;
    }

    for (var i = 0; i < stateNames.length; i++) {
        state = stateNames[i];

        switch (stateNames[i]) {
            case 'DistrictofColumbia':
                state = 'District of Columbia'
                break;
            case 'RhodeIsland':
                state = 'Rhode Island'
                break;
            case 'NewHampshire':
                state = 'New Hampshire'
                break;
            case 'NewMexico':
                state = 'New Mexico'
                break;
            case 'NewYork':
                state = 'New York'
                break;
            case 'NewJersey':
                state = 'New Jersey'
                break;
            case 'NorthCarolina':
                state = 'North Carolina'
                break;
            case 'NorthDakota':
                state = 'North Dakota'
                break;
            case 'SouthCarolina':
                state = 'South Carolina'
                break;
            case 'SouthDakota':
                state = 'South Dakota'
                break;
            case 'WestVirginia':
                state = 'West Virginia'
                break;
            default:
                state = stateNames[i];
                break;
        }

        yield nightmare
            .wait(3000)
            .type('input[type=text]', state)
            .wait(500)
            .type('input[type=text]', '\u000d')
            .wait(3000)
            .evaluate(() => document.querySelector('div.post-content').innerHTML)
            .then(response => {
                getData(response, stateObj[stateNames[i]]);
            }).catch(err => {
                console.log(err);
            });
    }

    console.log(JSON.stringify(stateObj, undefined, 4));

    yield nightmare.end();
}

run();

// let getMayor = (url) => {
//   nightmare
//     .goto(url)
//     .wait('body')
//     .evaluate(() => document.querySelector('div.post-content').innerHTML)
//     .end()
//     .then(response => {
//       console.log(getData(response));
//     }).catch(err => {
//       console.log(err);
//     });

//   let getData = html => {
//     const $ = cheerio.load(html);

//     mayors.push({
//       name: $('ul').find('b').text(),
//       city: $('ul').text().split($('ul').find('b').text())[1].split('P')[0],
//       image: $('ul').find('img').attr('src'),
//       website: $('ul').find('a').attr('href')
//     })

//     return mayors;
//   }
// }

// let mayorLinks = () => {
//   nightmare
//     .goto('https://www.usmayors.org/elections/election-results-2/')
//     .wait('body')
//     .evaluate(() => document.querySelector('div.fusion-text').innerHTML)
//     .end()
//     .then(response => {
//       console.log(JSON.stringify(getData(response), undefined, 4));
//     }).catch(err => {
//       console.log(err);
//     });

//     let getData = html => {
//       const $ = cheerio.load(html);

//       $('tr').each(function() {
//         item = {}

//         item['link'] = $(this).find('td').find('a').attr('href');

//         mayors.push(item);
//       })

//       return mayors;
//     }
// }

// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// var recursiveAsyncReadLine = function () {
//   rl.question('', function (answer) {
//     if (answer == 'exit') //we need some base case, for recursion
//       return rl.close(); //closing RL and returning from function.
//     getMayor(answer);
//     setTimeout(() => { }, 5000);
//     recursiveAsyncReadLine(); //Calling this function again to ask new question
//   });
// };

// recursiveAsyncReadLine();

// mayorLinks();