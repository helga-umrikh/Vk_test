import React from 'react'
import { Button, Div, Panel, PanelHeader, Paragraph } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

const CatFact = () => {
    return (
        <div>
            <Panel>
                <PanelHeader>VK test assignment</PanelHeader>
                <Div style={{ margin: '0 auto' }}>
                    <Paragraph style={{ marginRight: '20px' }}></Paragraph>
                    <Button appearance="accent" size="s" align="center">
                        Запросить факт
                    </Button>
                </Div>
            </Panel>
        </div>
    )
}

export default CatFact
