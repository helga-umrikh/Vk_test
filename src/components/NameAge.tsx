import React, { useState } from 'react'
import {
    Button,
    FormItem,
    FormLayoutGroup,
    Input,
    Paragraph,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { getAge } from '../api/getAge'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'

const NameAge: React.FC = () => {
    const queryClient = useQueryClient()
    const queryKey = 'myData'

    const [name, setName] = useState('')
    const [validationState, setValidationState] = useState<
        'default' | 'error' | 'valid' | undefined
    >()

    const { data, refetch } = useQuery(
        { queryKey: [queryKey], queryFn: () => getAge(name), enabled: false },
        queryClient
    )

    const validate = (name: string) => {
        const pattern = /^[a-zA-Z]+$/

        if (name !== '') {
            setValidationState(pattern.test(name) ? 'valid' : 'error')
            return
        }

        setValidationState('default')
    }

    const fetchData = async () => {
        await queryClient.cancelQueries({ queryKey: [queryKey], exact: true })
        await refetch()
    }


    const debouncedFetchData = debounce(fetchData, 3000);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        validate(value)
        setName(value)

        if(!name || validationState === 'error') {
            debouncedFetchData();
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        await queryClient.cancelQueries({ queryKey: [queryKey], exact: true })
        await refetch()
    }

    const debouncedHandleSubmit = debounce(handleSubmit,
        1000
    )

    return (
        <div>
            <FormLayoutGroup mode="horizontal">
                <FormItem htmlFor="name" top="Имя">
                    <Input
                        id="name"
                        style={{ marginBottom: '10px' }}
                        onChange={handleOnChange}
                        value={name}
                        placeholder="Введите имя латиницей"
                        required={true}
                        status={validationState}
                    />
                </FormItem>
                <FormItem htmlFor="submit_button">
                    <Button
                        id="submit_button"
                        disabled={!name || validationState === 'error'}
                        size="l"
                        type="submit"
                        onClick={debouncedHandleSubmit}
                    >
                        Запросить возраст
                    </Button>
                </FormItem>
            </FormLayoutGroup>{' '}
            {data?.age && (
                <Paragraph
                    style={{
                        padding:
                            'var(--vkui--size_form_item_padding_vertical--regular) var(--vkui--size_base_padding_horizontal--regular)',
                    }}
                >
                    {data.age
                        ? `Возраст пользователя: ${data.age}`
                        : `Возраст пользователя ${name} не определен`}
                </Paragraph>
            )}
        </div>
    )
}

export default NameAge
