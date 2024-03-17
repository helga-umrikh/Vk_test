import React from 'react'
import { createRoot } from 'react-dom/client'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>
    </React.StrictMode>
)
