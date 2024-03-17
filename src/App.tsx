import React from 'react'
import CatFact from './components/CatFact'
import { Panel, PanelHeader } from '@vkontakte/vkui'
import NameAge from './components/NameAge'

const App: React.FC = () => {
    return (
        <div className="App">
            <Panel>
                <PanelHeader>VK test assignment</PanelHeader>
                <CatFact />
                <NameAge />
            </Panel>
        </div>
    )
}

export default App
