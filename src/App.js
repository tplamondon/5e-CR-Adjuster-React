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
    </div>
  );
}

export default App;
