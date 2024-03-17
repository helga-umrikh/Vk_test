import React, { useRef } from 'react'
import { Button, Textarea, FormLayoutGroup, FormItem } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { getFact } from '../api/getFact'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'

const CatFact: React.FC = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const queryClient = useQueryClient()
    const queryKey = 'myData'

    const { data, refetch } = useQuery(
        { queryKey: [queryKey], queryFn: getFact, enabled: false },
        queryClient
    )

    const handleClick = async () => {
        await queryClient.cancelQueries({ queryKey: [queryKey], exact: true })
        await refetch()
    }

    const debouncedHandleClick = debounce(handleClick, 1000)

    if (inputRef.current && data?.fact) {
        const { fact } = data
        const words = fact.split(' ')
        const firstWordLength = words[0].length
        inputRef.current.value = fact

        inputRef.current.setSelectionRange(firstWordLength, firstWordLength)
        inputRef.current.focus()
    }

    return (
        <FormLayoutGroup mode="horizontal">
            <FormItem top="Cat Fact">
                <Textarea getRef={inputRef} value={data?.fact || ''} />
            </FormItem>
            <FormItem>
                <Button
                    appearance="accent"
                    size="l"
                    align="center"
                    onClick={debouncedHandleClick}
                >
                    Запросить факт
                </Button>
            </FormItem>
        </FormLayoutGroup>
    )
}

export default CatFact
