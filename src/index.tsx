import React from 'react'
import { createRoot } from 'react-dom/client'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
        <ConfigProvider>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
