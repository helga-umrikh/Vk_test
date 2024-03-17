import React from 'react'
import {
    Button,
    Div,
    FormItem,
    FormLayoutGroup,
    Input,
    Paragraph,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

const NameAge: React.FC = () => {
    return (
        <Div style={{ margin: '0 auto' }}>
            <FormLayoutGroup mode="horizontal">
                <FormItem htmlFor="name" top="Имя">
                    <Input id="name" style={{ marginBottom: '10px' }} />
                </FormItem>
                <FormItem htmlFor="submit_button">
                    <Button id="submit_button" size="l">
                        Запросить возраст
                    </Button>
                </FormItem>
            </FormLayoutGroup>
            <Paragraph
                style={{
                    padding:
                        'var(--vkui--size_form_item_padding_vertical--regular) var(--vkui--size_base_padding_horizontal--regular)',
                }}
            >
                Возраст Александра: 178 лет
            </Paragraph>
        </Div>
    )
}

export default NameAge
