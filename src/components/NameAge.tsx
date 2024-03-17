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
import { debounce } from 'lodash'

const NameAge: React.FC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState<number | null>(null)
    const [validationState, setValidationState] = useState<
        'default' | 'error' | 'valid' | undefined
    >()

    const getUserAgeFromName = async (name: string) => {
        try {
            const { age } = await getAge(name)
            age && setAge(age)
        } catch(e) {
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                throw new Error('An unknown error occurred')
            }
        }
    }

    const debouncedGetUserAgeFromName = debounce(
        (name) => getUserAgeFromName(name),
        3000
    )

    const validate = (name: string) => {
        const pattern = /^[a-zA-Z]+$/

        if (name !== '') {
            setValidationState(pattern.test(name) ? 'valid' : 'error')
            return
        }

        setValidationState('default')
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        validate(value)
        setName(value)
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        debouncedGetUserAgeFromName(name)
    }

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
                        onClick={handleSubmit}
                    >
                        Запросить возраст
                    </Button>
                </FormItem>
            </FormLayoutGroup>{' '}
            {age && (
                <Paragraph
                    style={{
                        padding:
                            'var(--vkui--size_form_item_padding_vertical--regular) var(--vkui--size_base_padding_horizontal--regular)',
                    }}
                >
                    {age
                        ? `Возраст пользователя: ${age}`
                        : `Возраст пользователя ${name} не определен`}
                </Paragraph>
            )}
        </div>
    )
}

export default NameAge
