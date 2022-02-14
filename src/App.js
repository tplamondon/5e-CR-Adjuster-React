import "./App.css";

function App() {
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
                <input type="text" onchange="fieldChanged()" id="expectedCR" name="expectedCR" />
              </td>
            </td>
          </tr>
        </table>
      </div>

      <div class="grid-container2 padding10">
        <div id="defensiveCRDiv">
          <h3>Defensive</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Hit Points</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="hidden" onchange="fieldChanged()" id="hit-points-value" name="hit-points-value" value="-1" />
                <span id="hit-points">???</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Armour Class</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" id="ac" name="ac" min="1" max="50" />
              </td>
            </tr>
          </table>
        </div>

        <div id="offensiveCRDiv">
          <h3>Offensive</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Damage Per Round</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" id="damagePerRound" name="damagePerRound" min="0" max="320" />
              </td>
            </tr>
            <tr>
              <td class="width33">Atack Bonus/Save DC</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" id="atkBonus" name="atkBonus" min="-5" max="50" />
              </td>
            </tr>
            <tr>
              <td class="width33">Uses Saves?</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onchange="fieldChanged()" id="useSave" name="useSave" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="grid-container2 padding10">
        <div id="sizeDiv">
          <h3>Size and Health</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Size</td>
              <td class="width34"></td>
              <td class="width33">
                <select onchange="fieldChanged()" id="size" name="size">
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
                <input type="number" onchange="fieldChanged()" id="hitdice" name="hitdice" min="1" max="500" />
                <span id="diceNumber">d8</span>
              </td>
            </tr>
            <tr>
              <td class="width33">Constitution</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="number" onchange="fieldChanged()" id="constitution" name="constitution" min="1" max="30" />
              </td>
            </tr>
          </table>
        </div>
        <div id="resistancesDiv">
          <h3>Vulnerabilities and Resistances</h3>
          <table class="threeSpaced">
            <tr>
              <td class="width33">Vulnerabilities</td>
              <td class="width34"></td>
              <td class="width33">
                <input type="checkbox" onchange="fieldChanged()" id="vulnerabilities" name="vulnerabilities" value="vulnerabilities" />
              </td>
            </tr>
            <tr>
              <td class="width33">Resistances/Immunities</td>
              <td class="width34"></td>
              <td class="width33">
                <select id="resistances" onchange="fieldChanged()" name="resistances">
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
                <input type="checkbox" onchange="fieldChanged()" id="fliesCanDmgRange" name="fliesCanDmgRange" value="fliesCanDmgRange" />
              </td>
            </tr>
            <tr>
              <td class="width33">Save Proficiencies</td>
              <td class="width34"></td>
              <td class="width33">
                <select id="saveProficiencies" onchange="fieldChanged()" name="saveProficiencies">
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
    </div>
  );
}

export default App;
