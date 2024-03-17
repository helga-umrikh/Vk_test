import React, { useState } from 'react'
import { Alert, Button, Div, Paragraph, ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Fact } from '../interfaces/Ifact'
import { getFact } from '../api/getFact'

const CatFact: React.FC = () => {
    const [fact, setFact] = useState<Fact>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<any>()

    const getData = async () => {
        try {
            setIsLoading(true)
            const data = await getFact()
            setIsLoading(false)
            setFact(data)
        } catch (e) {
            setIsLoading(false)
            setIsError(true)
            setErrorMessage('Произошла ошибка, перезагрузите страницу')
        }
    }

    const handleGetData = () => {
        getData()
    }

    return (
        <Div style={{ margin: '0 auto', padding: '100px' }}>
            {isLoading ? (
                <ScreenSpinner state="loading" />
            ) : isError ? (
                <Alert onClose={() => {}}>{errorMessage}</Alert>
            ) : (
                <Div>
                    <Paragraph style={{ marginRight: '20px' }}>
                        {fact && fact.fact}
                    </Paragraph>
                    <Button
                        appearance="accent"
                        size="s"
                        align="center"
                        onClick={handleGetData}
                    >
                        Запросить факт
                    </Button>
                </Div>
            )}
        </Div>
    )
}

export default CatFact
