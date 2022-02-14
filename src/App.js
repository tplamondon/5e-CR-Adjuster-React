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
    </div>
  );
}

export default App;
