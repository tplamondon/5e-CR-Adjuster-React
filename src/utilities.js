import React, { useRef, useState } from "react";

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
//                         Helper Functions for CR Calculation                          //
//                                                                                      //
//--------------------------------------------------------------------------------------//

/**
 *
 * @returns AC bonus based on if it flies or not
 */
export function getFlyACBonus() {
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
export function getSaveThrowACBonus() {
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
export function getMultiplierForResistances(expectedCR) {
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
export function getCRString(cr) {
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
export function getCRWithDifference(index, difference) {
  let newArrayPos = index + difference;
  //if too low, just set CR for that is 0
  if (newArrayPos < 0) {
    return 0;
  } else if (newArrayPos > CRarray.length) {
    return -100;
  }
  return CRarray[index + difference];
}

export function calcConstModifier() {
  //10 == avge, every 2 up = +1, every 2 down = -1
  let constitutionVal = constitution.current.value;
  let constmodifier = Math.floor(constitutionVal / 2 - 5);
  //log it
  //console.log("constitution modifier is: " + constmodifier);
  return constmodifier;
}

export function lookupIndexByCR(cr) {
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
