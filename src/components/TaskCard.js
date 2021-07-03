import React from 'react'
import styled from 'styled-components'

const StyledTaskCard = styled.li`
    width: 14rem;
    height: 14rem;
    border-radius: 0.85rem;
    padding: 0.85rem;
    background-color: #e9c46a;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TaskCard = ({task}) => {

    const {focus, status} = task;

    return (
        <StyledTaskCard>
            <p>{focus}</p>
            <p>{status}</p>
        </StyledTaskCard>
    )
}

export default TaskCard
