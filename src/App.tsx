import React from 'react';
import Content from './Components/Content/Content';
import WorkspaceLayouts from './Components/Layouts/WorkspaceLayouts';

class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
      <WorkspaceLayouts>
        <Content/>
      </WorkspaceLayouts>
    </div>
    );
  }
}

export default App;
