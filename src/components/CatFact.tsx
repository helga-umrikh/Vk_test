import React, { useState, useRef } from 'react'
import {
    Button,
    Textarea,
    FormLayoutGroup,
    FormItem,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { getFact } from '../api/getFact'

const CatFact: React.FC = () => {
    const [fact, setFact] = useState<string>('')
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const getData = async () => {
        try {
            const { fact } = await getFact()
            setFact(fact)

            if (inputRef.current) {
                const words = fact.split(' ')
                const firstWordLength = words[0].length
                inputRef.current.value = fact

                inputRef.current.setSelectionRange(
                    firstWordLength,
                    firstWordLength
                )
                inputRef.current.focus()
            }
        } catch(e) {
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                throw new Error('An unknown error occurred')
            }
        }
    }

    return (
            <FormLayoutGroup mode="horizontal">
                <FormItem top="Cat Fact">
                    <Textarea getRef={inputRef} value={fact} />
                </FormItem>
                <FormItem>
                    <Button
                        appearance="accent"
                        size="l"
                        align="center"
                        onClick={getData}
                    >
                        Запросить факт
                    </Button>
                </FormItem>
            </FormLayoutGroup>
    )
}

export default CatFact
