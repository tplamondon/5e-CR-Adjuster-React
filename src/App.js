import React, { useRef, useState } from "react";
import "./App.css";

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
                <input type="text" onchange="fieldChanged()" ref={expectedCR} name="expectedCR" />
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
                <input type="hidden" onchange="fieldChanged()" ref={hitPointsValue} name="hit-points-value" value="-1" />
                <span ref={hitPoints}>???</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Armour Class</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" ref={ac} name="ac" min="1" max="50" />
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
                <input type="number" onchange="fieldChanged()" ref={damagePerRound} name="damagePerRound" min="0" max="320" />
              </td>
            </tr>
            <tr>
              <td class="width33">Atack Bonus/Save DC</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" ref={atkBonus} name="atkBonus" min="-5" max="50" />
              </td>
            </tr>
            <tr>
              <td class="width33">Uses Saves?</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onchange="fieldChanged()" ref={useSave} name="useSave" />
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
                <select onchange="fieldChanged()" ref={size} name="size">
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
                <input type="number" onchange="fieldChanged()" ref={hitdice} name="hitdice" min="1" max="500" />
                <span ref={diceNumber}>d8</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Constitution</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" ref={constitution} name="constitution" min="1" max="30" />
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
                <input type="checkbox" onchange="fieldChanged()" ref={vulnerabilities} name="vulnerabilities" value="vulnerabilities" />
              </td>
            </tr>
            <tr>
              <td class="width33">Resistances/Immunities</td>
              <td class="width34"></td>
              <td class="width33">
                <select ref={resistances} onchange="fieldChanged()" name="resistances">
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
                <input type="checkbox" onchange="fieldChanged()" ref={fliesCanDmgRange} name="fliesCanDmgRange" value="fliesCanDmgRange" />
              </td>
            </tr>
            <tr>
              <td class="width33">Save Proficiencies</td>
              <td class="width34"></td>
              <td class="width33">
                <select ref={saveProficiencies} onchange="fieldChanged()" name="saveProficiencies">
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
          <input type="range" oninput="changeSliderLabel()" min="0" max="33" value="0" class="slider" ref={crScale} />
          <p>
            CR: <span ref={crScaleText}>0</span>
          </p>
        </div>
        <div>
          <button type="button" onclick="adjustCR()">
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
