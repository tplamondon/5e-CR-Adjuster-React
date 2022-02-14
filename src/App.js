import React, { useRef, useState } from "react";
import "./App.css";

// "(.*?)" for finding stuff between quotes regex
// $1 for replacing with first thing that regex found (i.e when replacing text, replace $1 with the first thign regular expression picked up)

// document.getElementById\("((.*?))"\)
// $1

function App() {
  const expectedCR = useRef(null);
  const defensiveCRDiv = useRef(null);
  const hitPointsValue = useRef(null);
  const hitPoints = useRef(null);
  const ac = useRef(null);
  const offensiveCRDiv = useRef(null);
  const damagePerRound = useRef(null);
  const atkBonus = useRef(null);
  const useSave = useRef(null);
  const sizeDiv = useRef(null);
  const size = useRef(null);
  const hitdice = useRef(null);
  const diceNumber = useRef(null);
  const constitution = useRef(null);
  const resistancesDiv = useRef(null);
  const vulnerabilities = useRef(null);
  const resistances = useRef(null);
  const fliesCanDmgRange = useRef(null);
  const saveProficiencies = useRef(null);
  const errormsg = useRef(null);
  const errormsg2 = useRef(null);
  const defCR = useRef(null);
  const offCR = useRef(null);
  const avgCR = useRef(null);
  const defenceCRAvg = useRef(null);
  const offenceCRAvg = useRef(null);
  const CRAverage = useRef(null);
  const crScale = useRef(null);
  const crScaleText = useRef(null);
  const newHP = useRef(null);
  const newAC = useRef(null);
  const newDmg = useRef(null);
  const newAtkBonus = useRef(null);

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                                   Global Variables                                   //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  /*
    0, 1/8, 1/4, 1/2, 1...
    CR's are X-3 where x is array index past first 4 (index > 3)
 */
  const CRarray = [0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const CRStrarray = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
  const hpArray = [6, 35, 49, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 400, 445, 490, 535, 580, 625, 670, 715, 760, 805, 850];
  /* AC can be <=13 for CR 0 */
  const ACarray = [13, 13, 13, 13, 13, 13, 13, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19];
  /* Attack Bonus can be <=3 for CR 0 */
  const atkarray = [3, 3, 3, 3, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14];
  const dmgarray = [1, 3, 5, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 140, 158, 176, 194, 212, 230, 248, 266, 284, 302, 320];
  const profarray = [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9];
  /* Save DC can be <=13 for CR 0 */
  const savearray = [13, 13, 13, 13, 13, 13, 13, 14, 15, 15, 15, 16, 16, 16, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23];

  var minScale = 0;
  var maxScale = 33;

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                      Calculation of Defensive and Offensive CR                       //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  //based on HP and AC
  /*
Read down the Hit Points column of the Monster Statistics by Challenge Rating table until you find your monster's hit points. 
Then look across and note the challenge rating suggested for a monster with those hit points.

Now look at the Armor Class suggested for a monster of that challenge rating. If your monster's AC is at least two points higher 
or lower than that number, adjust the challenge rating suggested by its hit points up or down by 1 for every 2 points of difference.
*/
  function calcDefensiveCR(multiplier) {
    errormsg.current.innerHTML = "";
    if (ac.current.value.length == 0) {
      errormsg.current.innerHTML = "ERROR: no armour-class value set";
      return -1;
    }
    let defCR = -1;
    //get required values
    let vulnerable = vulnerabilities.checked;
    let hpMultiplier = 1;
    if (vulnerable == true) {
      hpMultiplier = 0.5;
    }
    let inputHP = hitPointsValue.current.value;
    let acValue = parseInt(ac.current.value) + parseInt(getSaveThrowACBonus()) + parseInt(getFlyACBonus());
    //display error
    if (inputHP == "???" || inputHP < 1) {
      errormsg.current.innerHTML = "ERROR: monster has valid no HP set";
      return -1;
    }
    //adjust effective HP
    inputHP = inputHP * hpMultiplier * multiplier;
    //find HP
    let index = 0;
    for (index = 0; index < hpArray.length; index++) {
      if (inputHP <= hpArray[index]) {
        defCR = CRarray[index];
        break;
      }
    }
    //check if we actually got a valid CR from HP
    if (defCR < 0) {
      //ERROR
      errormsg.current.innerHTML = "ERROR: Not a valid HP amount, please check DMG table for allowed minimum and maximum HP values";
      return -1;
    }
    //calculate proper AC
    let crAC = ACarray[index];
    //adjust by 1 def CR for every 2 points above or below (if ac > crAC, we'll get positive number)
    let difac = acValue - crAC;
    if (defCR == 0 && ac <= ACarray[0]) {
      return defCR;
    }
    let changeCR = Math.floor(difac / 2);
    defCR = getCRWithDifference(index, changeCR);
    return defCR;
  }

  /*
Read down the Damage/Round column of the Monster Statistics by Challenge Rating table until you find your monster's damage output per round. 
Then look across and note the challenge rating suggested for a monster that deals that much damage.

Now look at the attack bonus suggested for a monster of that challenge rating. If your monster's attack bonus is at least two points higher 
or lower than that number, adjust the challenge rating suggested by its damage output up or down by 1 for every 2 points of difference.

If the monster relies more on effects with saving throws than on attacks, use the monster's save DC instead of its attack bonus.

If your monster uses different attack bonuses or save DCs, use the ones that will come up the most often.
*/
  function calcOffensiveCR() {
    errormsg2.current.innerHTML = "";
    if (damagePerRound.current.value.length == 0) {
      errormsg.current.innerHTML = "ERROR: damage per round not set";
      return -1;
    }
    if (atkBonus.current.value.length == 0) {
      errormsg.current.innerHTML = "ERROR: attack bonus not set";
      return -1;
    }
    if (damagePerRound.current.value < 0 || damagePerRound.current.value > 320) {
      errormsg.current.innerHTML = "ERROR: damage must be between 0 and 320";
      return -1;
    }
    if (atkBonus.current.value < -5) {
      errormsg.current.innerHTML = "ERROR: attack bonus/save DC must be between -5 and 50";
      return -1;
    }
    let offcrVal = -1;
    let damagePerRoundValue = damagePerRound.current.value;
    let atkBonusValue = atkBonus.current.value;
    let useSaveValue = useSave.checked; //true if checked, false otherwise
    //get offensive CR from dmg
    let index = -1;
    for (index = 0; index < dmgarray.length; index++) {
      if (damagePerRoundValue <= dmgarray[index]) {
        offcrVal = CRarray[index];
        break;
      }
    }
    //check if we actually got a valid CR from dmg
    if (offcrVal < 0) {
      //ERROR
      errormsg2.current.innerHTML = "ERROR: Not a valid damage amount, please check DMG table for allowed minimum and maximum damage values";
      return -1;
    }
    //if not using saves
    if (useSaveValue == false) {
      //calculate proper atkbonus for dmg cr
      let crATK = atkarray[index];
      //adjust by 1 offensive CR for every 2 points above or below (if atkbonus > crATK, we'll get positive number)
      let difatk = atkBonusValue - crATK;
      if (offcrVal == 0 && atkBonusValue <= atkarray[0]) {
        return offcrVal;
      }
      let changeCR = Math.floor(difatk / 2);
      return offcrVal;
    }
    //if using saves
    else {
      //calculate proper save bonus
      //in this case, atkBonus = saveDC
      let crSave = savearray[index];
      //adjust by 1 offensive CR for every 2 points above or below (if saveDC > crSave, we'll get positive number)
      let difatk = atkBonusValue - crSave;
      if (offcrVal == 0 && atkBonusValue <= savearray[0]) {
        return offcrVal;
      }
      let changeCR = Math.floor(difatk / 2);
      offcrVal = getCRWithDifference(index, changeCR);
      return offcrVal;
    }
  }

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                                 Calculate Average CR                                 //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  function calcAvgCR() {
    //get expected CR
    if (expectedCR.current.value.length == 0) {
      errormsg.current.innerHTML = "ERROR: no expected CR set";
      return -1;
    }
    let expectedCRStr = expectedCR.current.value;
    //if cr string isn't in returns -1, otherwise returns index of it
    let crIndex = CRStrarray.indexOf(expectedCRStr);
    if (crIndex == -1) {
      errormsg.current.innerHTML = "ERROR: not valid expected cr";
      return -1;
    }
    //get multplier for resistances/immunities based on expected CR, will be 1 if no resistances or immunities
    let expectedCRVal = CRarray[crIndex];
    let multiplier = getMultiplierForResistances(expectedCRVal);
    //get defensive cr
    let defCRVal = calcDefensiveCR(multiplier);
    if (defCRVal >= 0 && defCRVal < 30) {
      let defCRstr = defCRVal;
      defCRstr = getCRString(defCRVal);
      defCR.current.innerHTML = defCRstr;
      defenceCRAvg.current.value = defCRstr;
    }
    //if CR was out of bounds
    else {
      errormsg.current.innerHTML = "ERROR: defensive cr ended up being less than 0 or greater than 30";
      defCR.current.innerHTML = "?";
      avgCR.current.innerHTML = "?";
      defenceCRAvg.current.value = -1;
      CRAverage.current.value = -1;
    }
    //get offensive cr
    let offCRVal = calcOffensiveCR();
    if (offCRVal >= 0 && offCRVal < 30) {
      let offCRstr = getCRString(offCRVal);
      offCR.current.innerHTML = offCRstr;
      offenceCRAvg.current.value = offCRstr;
    } else {
      errormsg2.current.innerHTML = "ERROR: offensive cr ended up being less than 0 or greater than 30";
      offCR.current.innerHTML = "?";
      avgCR.current.innerHTML = "?";
      offenceCRAvg.current.value = -1;
      CRAverage.current.value = -1;
    }

    //get average cr
    let defCRindex = lookupIndexByCR(defCRVal);
    let offCRindex = lookupIndexByCR(offCRVal);
    let avgCRindex = Math.round((defCRindex + offCRindex) / 2);
    let avgCRVal = CRarray[avgCRindex];
    let avgCRstr = getCRString(avgCRVal);
    avgCR.current.innerHTML = avgCRstr;
    CRAverage.current.value = avgCRstr;
    updateSliderLabel(avgCRindex, defCRindex, offCRindex);
  }

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                         Helper Functions for CR Calculation                          //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  /**
   *
   * @returns AC bonus based on if it flies or not
   */
  function getFlyACBonus() {
    let saveAmount = fliesCanDmgRange.checked;
    let acBonus = 0;
    if (saveAmount == true) {
      let expectedCRStr = expectedCR.current.value;
      //if cr string isn't in returns -1, otherwise returns index of it
      let crIndex = CRStrarray.indexOf(expectedCRStr);
      //get multplier for resistances/immunities based on expected CR, will be 1 if no resistances or immunities
      let expectedCR = CRarray[crIndex];
      if (expectedCR < 10) {
        acBonus = 2;
      }
    }
    return acBonus;
  }

  /**
   *
   * @returns AC bonus based on number of save proficiencies based on DMG
   */
  function getSaveThrowACBonus() {
    let saveAmount = saveProficiencies.current.value;
    if (saveAmount == "zeroToTwo") {
      return 0;
    } else if (saveAmount == "threeToFour") {
      return 2;
    } else {
      return 4;
    }
  }

  /**
   *
   * @param {*} expectedCR
   * @returns multiplier
   */
  function getMultiplierForResistances(expectedCR) {
    let resistanceType = resistances.current.value;
    if (resistanceType == "none") {
      return 1;
    } else if (resistanceType == "resistances") {
      if (expectedCR >= 1 && expectedCR <= 4) {
        return 2;
      } else if (expectedCR >= 5 && expectedCR <= 10) {
        return 1.5;
      } else if (expectedCR >= 11 && expectedCR <= 16) {
        return 1.25;
      } else {
        return 1;
      }
    } else if (resistanceType == "immunities") {
      if (expectedCR >= 1 && expectedCR <= 4) {
        return 2;
      } else if (expectedCR >= 5 && expectedCR <= 10) {
        return 2;
      } else if (expectedCR >= 11 && expectedCR <= 16) {
        return 1.5;
      } else {
        return 1.25;
      }
    } else {
      //shouldn't come here
      console.log("Error in getMultiplierForResistances(expectedCR), couldn't find resistance type");
      return -1;
    }
  }

  /**
   *
   * @param {*} cr
   * @returns CR string
   */
  function getCRString(cr) {
    let str = cr;
    if (cr == 0.125) {
      str = "1/8";
    } else if (cr == 0.25) {
      str = "1/4";
    } else if (cr == 0.5) {
      str = "1/2";
    }
    return str;
  }

  /**
   * Get's the difference between base CR and the adjustment
   * @param {*} index
   * @param {*} difference
   */
  function getCRWithDifference(index, difference) {
    let newArrayPos = index + difference;
    //if too low, just set CR for that is 0
    if (newArrayPos < 0) {
      return 0;
    } else if (newArrayPos > CRarray.length) {
      return -100;
    }
    return CRarray[index + difference];
  }

  function calcConstModifier() {
    //10 == avge, every 2 up = +1, every 2 down = -1
    let constitutionVal = constitution.current.value;
    let constmodifier = Math.floor(constitutionVal / 2 - 5);
    //log it
    //console.log("constitution modifier is: " + constmodifier);
    return constmodifier;
  }

  function lookupIndexByCR(cr) {
    let i = 0;
    for (i = 0; i < CRarray.length; i++) {
      if (cr == CRarray[i]) {
        return i;
      }
    }
    //else we didn't get anything
    console.log("Failed to lookup index of given CR");
    return -1;
  }

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                                Interactive Functions                                 //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  /**
   *
   * @returns true if all fields filled, false otherwise
   */
  function allFieldsFilled() {
    if (expectedCR.current.value.length == 0) {
      return false;
    } else if (constitution.current.value.length == 0) {
      return false;
    } else if (hitdice.current.value.length == 0) {
      return false;
    } else if (ac.current.value.length == 0) {
      return false;
    } else if (damagePerRound.current.value.length == 0) {
      return false;
    } else if (atkBonus.current.value.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  function fieldChanged(event) {
    healthchange();
    if (allFieldsFilled()) {
      calcAvgCR();
    }
  }

  function healthchange(event) {
    let sizeVar = size.current.value;
    //change dice number shown (d4, d6, d8, etc...)
    diceNumber.current.innerHTML = "d" + sizeVar;
    //validate non-empty fields before calculating health
    if (constitution.current.value.length == 0) {
      hitPoints.current.innerHTML = "???";
      //console.log("No Constitution set")
      return;
    }
    if (hitdice.current.value.length == 0) {
      hitPoints.current.innerHTML = "???";
      //console.log("No Hit dice set")
      return;
    }
    let constmodifier = calcConstModifier();
    let hitdiceamount = hitdice.current.value;
    let hp = Math.floor((sizeVar / 2 + 0.5) * hitdiceamount + constmodifier * hitdiceamount);
    hitPoints.current.innerHTML = hp;
    hitPointsValue.current.value = hp;
    return;
  }

  function updateSliderLabel(crIndex, defCRIndex, offCRIndex) {
    ///if >0, means it's bigger
    let diffDef = defCRIndex - crIndex;
    let diffOff = offCRIndex - crIndex;
    if (diffDef > 0 && diffOff <= 0) {
      maxScale = 33 - diffDef;
      minScale = 0 - diffOff;
    } else if (diffOff > 0 && diffDef <= 0) {
      maxScale = 33 - diffOff;
      minScale = 0 - diffDef;
    } else {
      maxScale = 33;
      minScale = 0;
    }
    crScale.current.min = minScale;
    crScale.current.max = maxScale;
    crScale.current.value = crIndex;
    changeSliderLabel();
  }

  function changeSliderLabel() {
    let crslider = crScale;
    let cr = CRarray[crslider.current.value];
    let crStr = cr;
    if (cr == 0.125) {
      crStr = "1/8";
    } else if (cr == 0.25) {
      crStr = "1/4";
    } else if (cr == 0.5) {
      crStr = "1/2";
    }
    crScaleText.current.innerHTML = crStr;
  }

  //--------------------------------------------------------------------------------------//
  //                                                                                      //
  //                                 Adjust CR Functions                                  //
  //                                                                                      //
  //--------------------------------------------------------------------------------------//

  /**
   *
   * @param {*} CR The CR string
   * @returns AC bonus
   */
  function getFlyACBonusVariable(CR) {
    let saveAmount = fliesCanDmgRange.checked;
    let acBonus = 0;
    if (saveAmount == true) {
      let expectedCRStr = CR;
      //if cr string isn't in returns -1, otherwise returns index of it
      let crIndex = CRStrarray.indexOf(expectedCRStr);
      //get multplier for resistances/immunities based on expected CR, will be 1 if no resistances or immunities
      let expectedCR = CRarray[crIndex];
      if (expectedCR < 10) {
        acBonus = 2;
      }
    }
    return acBonus;
  }

  function getVulnerableMultiplier() {
    let vulnerable = vulnerabilities.checked;
    let hpMultiplier = 1;
    if (vulnerable == true) {
      hpMultiplier = 0.5;
    }
    return hpMultiplier;
  }

  /**
   *
   * @param {*} hp
   * @returns index of HP amount, -1 otherwise
   */
  function getHPAmount(hp) {
    let index = 0;
    for (index = 0; index < hpArray.length; index++) {
      if (hp <= hpArray[index]) {
        return index;
      }
    }
    return -1;
  }
  function getACAmount(ac) {
    let index = 0;
    for (index = 0; index < ACarray.length; index++) {
      if (index == 0 && ac < ACarray[0]) {
        return 0;
      }
      if (ac == ACarray[index]) {
        return index;
      }
    }
    return -1;
  }

  function getDMGAmount(dmg) {
    let index = 0;
    for (index = 0; index < dmgarray.length; index++) {
      if (dmg <= dmgarray[index]) {
        return index;
      }
    }
    return -1;
  }

  function getATKBonusAmount(atkBonus) {
    let index = 0;
    for (index = 0; index < atkarray.length; index++) {
      if (index == 0 && atkBonus < atkarray[0]) {
        return 0;
      }
      if (atkBonus == atkarray[index]) {
        return index;
      }
    }
    return -1;
  }

  function getEffectiveHP(HP, cr) {
    let vulnerable = vulnerabilities.checked;
    let hpMultiplier = 1;
    if (vulnerable == true) {
      hpMultiplier = 0.5;
    }
    let multiplier = parseFloat(hpMultiplier) * parseFloat(getMultiplierForResistances(cr));
    return parseFloat(HP) * parseFloat(multiplier);
  }

  /**
   * Scaleles current CR to wanted CR.
   * Uses https://stats.stackexchange.com/questions/281162/scale-a-number-between-a-range for scaling
   */
  function adjustCR() {
    //get value to adjust to
    let newCRIndex = crScale.current.value;
    //get the CR's as strings such as "0", "1/4", ...
    let defCRStr = defenceCRAvg.current.value;
    let offCRStr = offenceCRAvg.current.value;
    let avgCRStr = CRAverage.current.value;
    //get index of old CR's
    let defCRIndex = CRStrarray.indexOf(defCRStr);
    let offCRIndex = CRStrarray.indexOf(offCRStr);
    let avgCRIndex = CRStrarray.indexOf(avgCRStr);
    //get scale amount
    let scaleIndex = newCRIndex - avgCRIndex;
    let newDefCRIndex = defCRIndex + scaleIndex;
    let newOffCRIndex = offCRIndex + scaleIndex;

    //!def CR stuff
    //get HP difference
    let oldHP = hitPointsValue.current.value;
    let expectedCRStr = expectedCR.current.value;
    //if cr string isn't in returns -1, otherwise returns index of it
    let expectedCR = CRarray[CRStrarray.indexOf(expectedCRStr)];
    let oldEffectiveHP = getEffectiveHP(oldHP, expectedCR);
    let oldHPIndex = getHPAmount(oldHP);
    //get scaling of HP between max and min values for CR
    let oldMinHP = 1;
    if (oldHPIndex > 0) {
      oldMinHP = hpArray[oldHPIndex - 1];
    }
    let oldMaxHP = hpArray[oldHPIndex];
    //algebra
    let oldEffectiveHPIndex = getHPAmount(oldEffectiveHP);
    let oldMinEffectiveHP = 1;
    if (oldEffectiveHPIndex > 0) {
      oldMinEffectiveHP = hpArray[oldEffectiveHPIndex - 1];
    }
    let oldMaxEffectiveHP = hpArray[oldEffectiveHPIndex];
    //positive means had more effective HP than it's CR justifies
    let diffOldEffectiveHP = oldEffectiveHPIndex - defCRIndex;
    //get new effectiveHP based on def cr and difference between it
    //get scaling of HP between max and min values for CR
    let newEffectiveHPMax = hpArray[newDefCRIndex + diffOldEffectiveHP];
    let newEffectiveHPMin = 1;
    if (newDefCRIndex + diffOldEffectiveHP - 1 > 0) {
      newEffectiveHPMin = hpArray[newDefCRIndex + diffOldEffectiveHP - 1] + 1;
    }
    let newEffectiveHP = ((oldEffectiveHP - oldMinEffectiveHP) / (oldMaxEffectiveHP - oldMinEffectiveHP)) * (newEffectiveHPMax - newEffectiveHPMin) + newEffectiveHPMin;
    let newHPMultiplier = getMultiplierForResistances(CRarray[newCRIndex]) * getVulnerableMultiplier();
    let newHP = Math.round(newEffectiveHP / newHPMultiplier);
    //old ac stuff
    let effectiveACChange = (getHPAmount(newEffectiveHP) - newDefCRIndex) * -2;
    //let effectiveACChange = diffOldHP * -2;
    //ac bonus based on new CR value
    let newACBonus = getFlyACBonusVariable(CRStrarray[newCRIndex]) + getSaveThrowACBonus();
    let newAC = ACarray[getHPAmount(newEffectiveHP)] + effectiveACChange - newACBonus;

    //!off CR stuff
    //get dmg difference
    let oldDmg = damagePerRound.current.value;
    //if cr string isn't in returns -1, otherwise returns index of it
    //have expectedCR = from before
    let oldDmgIndex = getDMGAmount(oldDmg);
    //get scaling of dmg between max and min values for CR
    let oldMinDmg = 0;
    if (oldDmgIndex > 0) {
      oldMinDmg = dmgarray[oldDmgIndex - 1];
    }
    let oldMaxDmg = dmgarray[oldHPIndex];
    //algebra
    //positive means had more effective dmg than it's CR justifies
    let diffOldDmg = oldDmgIndex - offCRIndex;
    //get scaling of dmg between max and min values for CR
    let newDmgMax = dmgarray[newOffCRIndex + diffOldDmg];
    let newDmgMin = 0;
    if (newOffCRIndex + diffOldDmg - 1 > 0) {
      newDmgMin = dmgarray[newOffCRIndex + diffOldDmg - 1] + 1;
    }
    let newDmg = Math.round(((oldDmg - oldMinDmg) / (oldMaxDmg - oldMinDmg)) * (newDmgMax - newDmgMin) + newDmgMin);
    //old atk bonus stuff
    let newAtk = 0;
    let effectiveAtkSaveChange = (getDMGAmount(newDmg) - newOffCRIndex) * -2;
    if (useSave.checked) {
      //save bonus based on new CR value
      newAtk = savearray[getDMGAmount(newDmg)] + effectiveAtkSaveChange;
    } else {
      //atk bonus based on new CR value
      newAtk = atkarray[getDMGAmount(newDmg)] + effectiveAtkSaveChange;
    }

    //!set up values
    newHP.current.innerHTML = newHP;
    newAC.current.innerHTML = newAC;
    newDmg.current.innerHTML = newDmg;
    newAtkBonus.current.innerHTML = newAtk;

    return;
  }

  return (
    <div className="App">
      <h1 class="textCentre">CR Adjuster</h1>
      <p class="textCentre">Please input your base monsters statistics below</p>

      <div class="padding10">
        <table class="threeSpaced">
          <tr>
            <td>Expected Challenge Rating</td>
            <td></td>
            <td>
              <td class="width33">
                <input type="text" onChange={fieldChanged} ref={expectedCR} name="expectedCR" />
              </td>
            </td>
          </tr>
        </table>
      </div>

      <div class="grid-container2 padding10">
        <div ref={defensiveCRDiv}>
          <h3>Defensive</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Hit Points</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="hidden" onChange={fieldChanged} ref={hitPointsValue} name="hitPointsValue" value="-1" />
                <span ref={hitPoints}>???</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Armour Class</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onChange={fieldChanged} ref={ac} name="ac" min="1" max="50" />
              </td>
            </tr>
          </table>
        </div>

        <div ref={offensiveCRDiv}>
          <h3>Offensive</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Damage Per Round</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onChange={fieldChanged} ref={damagePerRound} name="damagePerRound" min="0" max="320" />
              </td>
            </tr>
            <tr>
              <td class="width33">Atack Bonus/Save DC</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onChange={fieldChanged} ref={atkBonus} name="atkBonus" min="-5" max="50" />
              </td>
            </tr>
            <tr>
              <td class="width33">Uses Saves?</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onChange={fieldChanged} ref={useSave} name="useSave" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="grid-container2 padding10">
        <div ref={sizeDiv}>
          <h3>Size and Health</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Size</td>
              <td class="width34"></td>
              <td class="width33">
                <select onChange={fieldChanged} ref={size} name="size">
                  <option value="4">Tiny</option>
                  <option value="6">Small</option>
                  <option selected value="8">
                    Medium
                  </option>
                  <option value="10">Large</option>
                  <option value="12">Huge</option>
                  <option value="20">Gargantuan</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="width33">Hit Dice</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onChange={fieldChanged} ref={hitdice} name="hitdice" min="1" max="500" />
                <span ref={diceNumber}>d8</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Constitution</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onChange={fieldChanged} ref={constitution} name="constitution" min="1" max="30" />
              </td>
            </tr>
          </table>
        </div>
        <div ref={resistancesDiv}>
          <h3>Vulnerabilities and Resistances</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Vulnerabilities</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onChange={fieldChanged} ref={vulnerabilities} name="vulnerabilities" value="vulnerabilities" />
              </td>
            </tr>
            <tr>
              <td class="width33">Resistances/Immunities</td>
              <td class="width34"></td>
              <td class="width33">
                <select ref={resistances} onChange={fieldChanged} name="resistances">
                  <option selected value="none">
                    None
                  </option>
                  <option value="resistances">Resistances</option>
                  <option value="immunities">Immunities</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="width33">Flies and can deal damage at range (CR 0-9 only)</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onChange={fieldChanged} ref={fliesCanDmgRange} name="fliesCanDmgRange" value="fliesCanDmgRange" />
              </td>
            </tr>
            <tr>
              <td class="width33">Save Proficiencies</td>
              <td class="width34"></td>
              <td class="width33">
                <select ref={saveProficiencies} onChange={fieldChanged} name="saveProficiencies">
                  <option selected value="zeroToTwo">
                    0-2
                  </option>
                  <option value="threeToFour">3-4</option>
                  <option value="fiveOrMore">5+</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="padding10">
        <h3>Current CR Estimate</h3>
        <p>
          <span class="error" ref={errormsg}></span>
        </p>
        <p>
          <span class="error" ref={errormsg2}></span>
        </p>
        <p>
          The Defensive Challenge Rating of the monster is: <span ref={defCR}>?</span>
        </p>
        <p>
          The Offensive Challenge Rating of the monster is: <span ref={offCR}>?</span>
        </p>
        <p>
          The Challenge Rating of the monster is: <span ref={avgCR}>?</span>
        </p>
        <input type="hidden" ref={defenceCRAvg} value="-1" />
        <input type="hidden" ref={offenceCRAvg} value="-1" />
        <input type="hidden" ref={CRAverage} value="-1" />
      </div>

      <div class="padding10">
        <h2 class="textCentre">Adjust CR Below</h2>
        <p class="textCentre">Please ensure you've filled above out and calculated the current CR</p>
        <div class="slidecontainer">
          <input type="range" onInput={changeSliderLabel} min="0" max="33" defaultValue="0" class="slider" ref={crScale} />
          <p>
            CR: <span ref={crScaleText}>0</span>
          </p>
        </div>
        <div>
          <button type="button" onClick={adjustCR}>
            Adjust CR
          </button>
        </div>
      </div>

      <div class="padding10">
        <h3>New Values for CR</h3>
        <p>This is not perfect for adjusting, it gives a rough idea of some new stats you can use</p>
        <table class="threeSpaced" class="width50">
          <tr>
            <td>HP</td>
            <td></td>
            <td>
              <span ref={newHP}></span>
            </td>
          </tr>
          <tr>
            <td>AC</td>
            <td></td>
            <td>
              <span ref={newAC}></span>
            </td>
          </tr>
          <tr>
            <td>Damage Per Round</td>
            <td></td>
            <td>
              <span ref={newDmg}></span>
            </td>
          </tr>
          <tr>
            <td>Attack Bonus/Save DC</td>
            <td></td>
            <td>
              <span ref={newAtkBonus}></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
