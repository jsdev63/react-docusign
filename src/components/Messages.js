import React from 'react'
import { Message } from 'semantic-ui-react'

export const Messages = ({msg}) => (msg.map((item, index) => {
        var color='', text='';
        switch (item.status) {
            case 'error' : {
                color = 'red'; text= 'Bad Request'; break;
            }
            case 'sent' : {
                color = 'blue'; text= 'Successfully was sent'; break;
            }
            case 'completed' : {
                color = 'green'; text= 'Completed successfully'; break;
            }
            case 'decline' : {
                color = 'yellow'; text= 'It was declined'; break;
            }
            default: {
                color = 'blue'; text= 'Successfully was sent';
            }
        }

        return <Message color={color} key={index}>{text}</Message>
    }
))
