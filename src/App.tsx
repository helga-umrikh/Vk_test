import React from 'react'
import CatFact from './components/CatFact'
import { Panel, PanelHeader, Div } from '@vkontakte/vkui'
import NameAge from './components/NameAge'

const App: React.FC = () => {
    const style = {
        'margin': '0 auto',
        'width': '500px',
    }

    return (
        <div className="App">
            <Panel>
                <PanelHeader>VK test assignment</PanelHeader>
                <Div style={style}>
                    <CatFact />
                    <NameAge />
                </Div>
            </Panel>
        </div>
    )
}

export default App
